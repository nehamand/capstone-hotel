import { DataSource } from "typeorm"
import { AppDataSource } from "../../data-source"
import request from "supertest"
import app from "../../app"

describe("POST /employees", () => {
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

  test("Should create a new employee", async () => {
    const response = await request(app)
      .post("/employees")
      .send({ name: "John Doe", cpf: "123456789", password: "12345" })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("admin")
  })
})
