import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import createBedroomService from "../../services/bedroom/createBedroom.service";
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
    await createBedroomService({number: "1", floor: "1", capacity: 2, availability: true})
    const res = await sessionService({cpf: employee.cpf, password: employee.password});
    token = res.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should be able to create a new clients", async () => {
    
    const clients = {
      name: "bryan",
      birthDate: "11-11-1111",
      cpf: "11111111111",
      cellphone: "33333333333",
      bedroomId: "1"
      };

    const response = await request(app)
      .post("/clients")
      .set({Authorization: `Bearer ${token}`})
      .send(clients);
      expect(response.statusCode).toBe(201);
  });

  test("Shouldn't be able to create a new customer without a bedroom", async () => {
    
    const clients = {
      name: "bryan",
      birthDate: "11-11-1111",
      cpf: "11111111111",
      cellphone: "33333333333",
      bedroomId: "0"
      };

    const response = await request(app)
      .post("/clients")
      .set({Authorization: `Bearer ${token}`})
      .send(clients);
      expect(response.statusCode).toBe(404);
  });

});


    