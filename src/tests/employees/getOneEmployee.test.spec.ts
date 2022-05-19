import { DataSource } from "typeorm"
import request from "supertest"

import { AppDataSource } from "../../data-source"
import app from "../../app"
import { sessionService } from "../../services/sessions/sessions.service"
import createEmployeeService from "../../services/employees/createEmployee.service"

describe("GET /employees/:id", () => {
  let connection: DataSource
  let token = ""
  let id = ""

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
    const employee = {
      name: "John Doe",
      cpf: "123321",
      password: "1234",
      admin: false,
      status: true,
    }

    await createEmployeeService(employee)

    const response = await sessionService({ cpf: "123321", password: "1234" })

    token = response.token
    id = response.employee.id
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Should get one employee", async () => {
    const response = await request(app)
      .get(`/employees/${id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("name")
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "John Doe",
      })
    )
  })

  test("Shouldn't find an employee with wrong id", async () => {
    const response = await request(app)
      .get(`/employees/f7b183ad-1c85-406c-b2d3-53a7363ea57q`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })
})
