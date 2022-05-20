import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("PATCH /bedrooms/:id", () => {
  let connection: DataSource;
  let token: string;
  let bedroom: any;

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

    let testBedroom = {
      id: 0,
      number: "5",
      floor: "6",
      capacity: 5,
    };

    await request(app).post("/employees").send(testEmployee);

    const responseLogin = await request(app)
      .post("/sessions")
      .send({ cpf: testEmployee.cpf, password: testEmployee.password });

    token = responseLogin.body.token;

    bedroom = await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${token}` })
      .send(testBedroom);

    bedroom = bedroom.body;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Shold be update a bedroom", async () => {
    bedroom.capacity = 3;
    bedroom.availability = false;

    const response = await request(app)
      .patch(`/bedrooms/${bedroom.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ capacity: bedroom.capacity, availability: bedroom.availability });

    expect(response.status).toEqual(200);
    expect(response.body.updatedBedroom).toEqual(
      expect.objectContaining({
        availability: bedroom.availability,
        capacity: bedroom.capacity,
      })
    );
  });
});

describe("Errors tests on PATCH /bedrooms/:id", () => {
  let connection: DataSource;
  let token: string;
  let bedroom: any;

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
      admin: false,
    };

    let testBedroom = {
      id: 0,
      number: "5",
      floor: "6",
      capacity: 5,
    };

    await request(app).post("/employees").send(testEmployee);

    const responseLogin = await request(app)
      .post("/sessions")
      .send({ cpf: testEmployee.cpf, password: testEmployee.password });

    token = responseLogin.body.token;

    bedroom = await request(app)
      .post("/bedrooms")
      .set({ Authorization: `Bearer ${token}` })
      .send(testBedroom);

    bedroom = bedroom.body;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Shold be not update a bedroom without admin permission", async () => {
    const response = await request(app)
      .patch(`/bedrooms/${bedroom.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({});

    expect(response.status).toEqual(401);
    expect(response.body.message).toBeDefined()
  })

  test("Shold be not update a bedroom with invalid data", async () => {
    const response = await request(app)
      .patch(`/bedrooms/${bedroom.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send({capacity: "a", availability: "b"});

    expect(response.status).toEqual(400);
    expect(response.body.errors.body).toBeDefined();
  });
});
