import { DataSource } from "typeorm"
import { AppDataSource } from "../../data-source"
import request from "supertest"
import app from "../../app"
import { sessionService } from "../../services/sessions/sessions.service"
import createEmployeeService from "../../services/employees/createEmployee.service"

describe("GET /employees", () => {
  let connection: DataSource
  let token = ""

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
    const employee = {
      name: "Luiz",
      cpf: "123321",
      password: "1234",
      admin: false,
      status: true,
    }

    await createEmployeeService(employee)

    const response = await sessionService({ cpf: "123321", password: "1234" })

    token = response.token
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Should create a new employee", async () => {
    const response = await request(app)
      .get("/employees")
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ cpf: "123321" })])
    )
  })
})
