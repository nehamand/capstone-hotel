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
    const response = await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${token}` })
      .send(testBedroom);

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

describe("Errors tests on POST /bedrooms", () => {
  let connection: DataSource;
  let adminToken: string;
  let nonAdminToken: string;
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

    let testNonAdminEmployee = {
      name: "Marioto",
      cpf: "12345678998",
      password: "123456",
      admin: false,
    };

    let testAdminEmployee = {
      name: "MariotoAdmin",
      cpf: "12345678999",
      password: "123456",
      admin: true,
    };

    await request(app).post("/employees").send(testNonAdminEmployee);

    await request(app).post("/employees").send(testAdminEmployee);

    const responseNonAdminLogin = await request(app).post("/sessions").send({
      cpf: testNonAdminEmployee.cpf,
      password: testNonAdminEmployee.password,
    });

    const responseAdminLogin = await request(app).post("/sessions").send({
      cpf: testAdminEmployee.cpf,
      password: testAdminEmployee.password,
    });

    nonAdminToken = responseNonAdminLogin.body.token;
    adminToken = responseAdminLogin.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Shold be not create a bedroom without admin permission", async () => {
    const response = await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${nonAdminToken}` })
      .send(testBedroom);

    expect(response.status).toEqual(401);
    expect(response.body.message).toBeDefined();
  });

  test("Shold be not create a bedroom with same number", async () => {
    await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(testBedroom);

    const response = await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(testBedroom);

    expect(response.status).toEqual(409);
    expect(response.body.message).toBeDefined();
  });

  test("Shold be not create a bedroom with invalid data", async () => {
    const response = await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({ ...testBedroom, number: true, floor: false });

    expect(response.status).toEqual(400);
    expect(response.body.errors.body).toBeDefined();
  });
});
