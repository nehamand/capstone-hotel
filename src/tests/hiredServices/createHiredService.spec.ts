import { AppDataSource } from './../../data-source'
import { DataSource } from 'typeorm'
import app from '../../app'
import request from 'supertest'

describe('POST /hiredservices', () => {
  let connection: DataSource
  let token: string
  let testHiredSevice = {
    serviceId: 1,
    clientId: '6871647a-d117-4609-9988-7c0f3d8b8693',
    start_date: '2022-05-19',
    end_date: '2022-05-20',
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

    let testEmployee = {
      name: 'Fulano',
      cpf: '00000000000',
      password: '12345678',
      admin: true,
    }

    await request(app).post('/employees').send(testEmployee)

    const responseLogin = await request(app)
      .post('/sessions')
      .send({ cpf: testEmployee.cpf, password: testEmployee.password })

    token = responseLogin.body.token

    let testBedroom = {
      number: '1',
      floor: '1',
      capacity: 2,
      availability: true,
    }

    await request(app)
      .post('/bedrooms')
      .set({ Authorization: `Bearer ${token}` })
      .send(testBedroom)

    let testClient = {
      name: "fulano cliente",
      birthDate: "11-11-1111",
      cpf: "11111111111",
      cellphone: "33333333333",
      bedroomId: "1"
    }

    const responseClient = await request(app)
      .post('/clients')
      .set({ Authorization: `Bearer ${token}` })
      .send(testClient)

    testHiredSevice.clientId = responseClient.body.id

    let testService = {
      name: 'Café da manha',
      price: 12.99,
      description:
        'Todos os dias café da manha disponivel do periodo das 07:00 ás 10:00 AM',
    }

    const responseService = await request(app)
      .post('/services')
      .set({ Authorization: `Bearer ${token}` })
      .send(testService)

    testHiredSevice.serviceId = responseService.body.id

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('Should be able to create a new hired service', async () => {
    const response = await request(app)
      .post('/hiredservices')
      .set({ Authorization: `Bearer ${token}` })
      .send(testHiredSevice)

    expect(response.status).toEqual(201)
    expect(response.body.id).toBeDefined()
    expect(response.body).toHaveProperty("created_at")
    
  })
})

describe('Errors tests on POST /hiredservices', () => {
  let connection: DataSource
  let adminToken: string
  let nonAdminToken: string
  let testHiredSevice = {
    serviceId: 1,
    clientId: '6871647a-d117-4609-9988-7c0f3d8b8693',
    start_date: '2022-05-19',
    end_date: '2022-05-20',
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

    let testNonAdminEmployee = {
      name: 'Fulano non admin',
      cpf: '00000000000',
      password: '12345678',
      admin: false,
    }

    let testAdminEmployee = {
      name: 'Fulano admin',
      cpf: '00000000001',
      password: '12345678',
      admin: true,
    }

    await request(app).post('/employees').send(testNonAdminEmployee)

    await request(app).post('/employees').send(testAdminEmployee)

    const responseNonAdminLogin = await request(app).post('/sessions').send({
      cpf: testNonAdminEmployee.cpf,
      password: testNonAdminEmployee.password,
    })

    const responseAdminLogin = await request(app).post('/sessions').send({
      cpf: testAdminEmployee.cpf,
      password: testAdminEmployee.password,
    })

    nonAdminToken = responseNonAdminLogin.body.token
    adminToken = responseAdminLogin.body.token

  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('Should not be able to create a hired service without admin permission', async () => {
    const response = await request(app)
      .post('/hiredservices')
      .set({ Authorization: `Bearer ${nonAdminToken}` })
      .send(testHiredSevice)
      
    expect(response.status).toEqual(401)
    expect(response.body.message).toBeDefined()
  })

  test('Should not be able to create a bedroom with invalid data', async () => {
    const response = await request(app)
      .post('/hiredservices')
      .set({ Authorization: `Bearer ${adminToken}` })
      .send({ ...testHiredSevice, serviceId: true, end_date: false })

    expect(response.status).toEqual(400)
    expect(response.body.errors.body).toBeDefined()
  })
  
})
