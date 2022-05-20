import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import { sessionService } from "../../services/sessions/sessions.service";
import request from "supertest";
import app from "../../app";

describe("Testing success cases in the route /services", () => {
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

  test("Should be able to create a new service", async () => {
    const service = {
      name: "Hospedagem Simples",
      price: 200,
      description: "Hospedagem simple com café da manha",
    };

    const response = await request(app)
      .post("/services")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(service);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined()
    expect(response.body).toEqual(expect.objectContaining({
        name: service.name,
        price: service.price,
        description: service.description
    }))
  });
  test("Should not be possible to create a new service without admin permission", async () => {

    const employee = {
      name: "Alexandre",
      cpf: "12345678911",
      password: "123456",
      status: true,
      admin: false,
    };

    await createEmployeeService(employee);

    const login = {
      cpf: employee.cpf,
      password: employee.password,
    };

    const res = await sessionService(login);

    const service = {
      name: "Hospedagem Simples",
      price: 200,
      description: "Hospedagem simple com café da manha",
    };

    const response = await request(app)
      .post("/services")
      .set({
        Authorization: `Bearer ${res.token}`,
      })
      .send(service);

      expect(response.status).toBe(401);
      expect(response.body.message).toBeDefined()
  });
});
