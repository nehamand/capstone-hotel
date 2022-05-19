import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import { sessionService } from "../../services/sessions/sessions.service";
import request from "supertest";
import app from "../../app";
import createService from "../../services/service/createService.service";

describe("GET - /services", () => {
  let connection: DataSource;
  let token = "";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
    const employee = {
      name: "Alexandre",
      cpf: "12345678910",
      password: "123456",
      status: true,
      admin: true,
    };

    await createEmployeeService(employee);

    const login = {
      cpf: employee.cpf,
      password: employee.password,
    };

    const res = await sessionService(login);

    token = res.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to list all the services", async () => {
    const service = {
      name: "Hospedagem Simples",
      price: 200,
      description: "Hospedagem simple com café da manha",
    };

    await createService(service);

    const response = await request(app)
      .get("/services")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: service.name,
          price: service.price,
          description: service.description,
        }),
      ])
    );
  });
});
