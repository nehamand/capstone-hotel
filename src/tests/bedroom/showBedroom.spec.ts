import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../app";

describe("GET /bedrooms/:id", () => {
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

  test("Shold be get a bedroom", async () => {
    const response = await request(app)
      .get(`/bedrooms/${bedroom.id}`)
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body).toEqual(
      expect.objectContaining(bedroom)
    );
  });
});
