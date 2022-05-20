import { AppDataSource } from "./../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("POST /bedrooms", () => {
  let connection: DataSource;
  let token: string;
  let testBedroom = {
    number: 5,
    floor: 6,
    capacity: 5,
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    let testEmployee = {
      name: "Marioto",
      cpf: "12345678998",
      password: "123456",
      admin: true,
    };

    await request(app).post("/employees").send(testEmployee);

    const responseLogin = await request(app)
      .post("/sessions")
      .send({ cpf: testEmployee.cpf, password: testEmployee.password });

    token = responseLogin.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Shold be create a new bedroom", async () => {
    const response = await request(app).post("/bedrooms").set({Authorization: `Bearer ${token}`}).send(testBedroom);

    expect(response.status).toEqual(201);
    expect(response.body.id).toBeDefined();
    expect(response.body).toEqual(
      expect.objectContaining({
        number: testBedroom.number,
        floor: testBedroom.floor,
        capacity: testBedroom.capacity,
        status: true,
      })
    );
  });
});
