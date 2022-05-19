import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import { sessionService } from "../../services/sessions/sessions.service";
import request from "supertest";
import app from "../../app";
import createService from "../../services/service/createService.service";

describe("UPDATE - /services", () => {
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

  test("Should be able to update one service", async () => {
    const service = {
      name: "Hospedagem Simples",
      price: 200,
      description: "Hospedagem simple com café da manha",
    };

    const serviceCreated = await createService(service);

    const response = await request(app)
      .patch(`/services/${serviceCreated.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      }).send({name: "Hospedagem Premium"})
      
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined()
    expect(response.body.updatedService.updated_at).toBeDefined()
  });

  test("TESTE PARA DAR ERRO NO UPDATE", async () => {
    const employee = {
      name: "Alexandre",
      cpf: "12345678916",
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

    const serviceCreated = await createService(service);

    const response = await request(app)
      .patch(`/services/${serviceCreated.id}`)
      .set({
        Authorization: `Bearer ${res.token}`,
      }).send({name: "Hospedagem Premium"})

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty("message")
  })
});
