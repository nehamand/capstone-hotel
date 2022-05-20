import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import { sessionService } from "../../services/sessions/sessions.service";
import request from "supertest";
import app from "../../app";

describe("Testing success cases in the route /clients", () => {
  let connection: DataSource;
  let token = "";

  beforeAll(async () => {

    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    const employee = {
      name: "bryan",
      cpf: "12345678910",
      password: "12345678",
      status: true,
      admin: true,
    };

    await createEmployeeService(employee);
    const res = await sessionService({cpf: employee.cpf, password: employee.password});
    token = res.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should list all clients", async () => {
    const response = await request(app)
      .get("/clients")
      .set({Authorization: `Bearer ${token}`})
      expect(response.statusCode).toBe(200);
  });

  test("Should not list all clients without token authorization", async () => {
    const response = await request(app)
      .get("/clients")
      expect(response.statusCode).toBe(401);
  });

});


    