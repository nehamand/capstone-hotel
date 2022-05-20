import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import createEmployeeService from "../../services/employees/createEmployee.service";
import createBedroomService from "../../services/bedroom/createBedroom.service";
import createClient from "../../services/clients/clientsCreate.service";
import { sessionService } from "../../services/sessions/sessions.service";
import request from "supertest";
import app from "../../app";

describe("Testing success cases in the route /clients", () => {
  let connection: DataSource;
  let token = "";
  let id = "";

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

    await createBedroomService({number: "1", floor: "1", capacity: 2, availability: true})

    const clients = {
        name: "bryan",
        birthDate: new Date("1111-11-11"),
        cpf: "11111111111",
        cellphone: "33333333333",
        bedroomId: 1
        };
        
    const response = await createClient(clients)
    id = response.id
    
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Must update customer data", async () => {
    
    const clients = {
        name: "bryanUpdtade",
        cpf: "22222222222",
        cellphone: "44444444444",
        };

    const response = await request(app)
      .patch(`/clients/${id}`)
      .set({Authorization: `Bearer ${token}`})
      .send(clients)
      expect(response.statusCode).toBe(201);
  });

  test("Must not update client data without access token", async () => {
    
    const clients = {
        name: "bryanUpdtade",
        cpf: "22222222222",
        cellphone: "44444444444",
        };

    const response = await request(app)
      .patch(`/clients/${id}`)
      .send(clients)
      expect(response.statusCode).toBe(401);
  });

});