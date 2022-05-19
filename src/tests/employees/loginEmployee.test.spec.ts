import { DataSource } from "typeorm"
import request from "supertest"

import { AppDataSource } from "../../data-source"
import app from "../../app"
import createEmployeeService from "../../services/employees/createEmployee.service"

describe("POST /sessions", () => {
  let connection: DataSource
  const cpf = "123321"
  const password = "1234"

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
    const employee = {
      name: "John Doe",
      cpf,
      password,
      admin: false,
      status: true,
    }

    await createEmployeeService(employee)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Should can login", async () => {
    const response = await request(app)
      .post(`/sessions`)
      .send({ cpf, password })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
  })

  test("Shoudn't login with wrong cpf", async () => {
    const response = await request(app)
      .post(`/sessions`)
      .send({ cpf: "1111111", password })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("message")
  })

  test("Shoudn't login with wrong password", async () => {
    const response = await request(app)
      .post(`/sessions`)
      .send({ cpf, password: "wrongcode" })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message")
  })
})
