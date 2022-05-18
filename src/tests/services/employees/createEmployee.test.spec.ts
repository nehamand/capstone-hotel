import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import request from "supertest"
import app from "../../../app"
import createEmployeeService from "../../../services/employees/createEmployee.service"

describe("GET /users/me", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Should return users", async () => {
    const response = await request(app)
      .post("/employees")
      .send({ name: "Luiz", cpf: "123456789", password: "12345" })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("admin")
  })
})
