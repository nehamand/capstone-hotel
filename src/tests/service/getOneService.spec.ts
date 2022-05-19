import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import { sessionService } from "../../services/sessions/sessions.service";
import request from "supertest";
import app from "../../app";
import createService from "../../services/service/createService.service";

describe("GET BY ID - /services", () => {
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

  test("Should be able to list one service", async () => {
    const service = {
      name: "Hospedagem Simples",
      price: 200,
      description: "Hospedagem simple com café da manha",
    };

    const serviceCreated = await createService(service);

    const response = await request(app)
      .get(`/services/${serviceCreated.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: service.name,
        price: service.price,
        description: service.description,
      })
    );
  });
  test("TESTE PARA DAR ERRO", async () => {


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

    const serviceCreated = await createService(service);

    const response = await request(app)
      .get(`/services/${serviceCreated.id}`)
      .set({
        Authorization: `Bearer ${res.token}`,
      });

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty("message")
  });

  test("Shouldn't be possible to return one service without admin permission", async () => {


    const employee = {
      name: "Alexandre",
      cpf: "12345678918",
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

    const service = {
      name: "Hospedagem Simples",
      price: 200,
      description: "Hospedagem simple com café da manha",
    };

    await createService(service);

    const response = await request(app)
      .get(`/services/8`)
      .set({
        Authorization: `Bearer ${res.token}`,
      });

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty("message")
  });
});
