import { AppDataSource } from './../../data-source'
import { DataSource } from 'typeorm'
import app from '../../app'
import request from 'supertest'

describe('PATCH /pay/:id', () => {
  let connection: DataSource
  let token: string
  let hiredService: any
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
      name: 'fulano cliente',
      birthDate: '11-11-1111',
      cpf: '11111111111',
      cellphone: '33333333333',
      bedroomId: '1',
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

    const { body } = await request(app)
      .post('/hiredservices')
      .set({ Authorization: `Bearer ${token}` })
      .send(testHiredSevice)

    hiredService = body
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test('Should be able to pay a hired service', async () => {
    const response = await request(app)
      .patch(`/hiredservices/pay/${hiredService.id}`)
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Paid Hired service')
  })
})

// describe('Errors tests on PATCH /pay/:id', () => {
//   let connection: DataSource
//   let adminToken: string
//   let nonAdminToken: string
//   let hiredService: any
//   let testHiredSevice = {
//     serviceId: 1,
//     clientId: '6871647a-d117-4609-9988-7c0f3d8b8693',
//     start_date: '2022-05-19',
//     end_date: '2022-05-20',
//   }
//   beforeAll(async () => {
//     await AppDataSource.initialize()
//       .then((res) => (connection = res))
//       .catch((err) => {
//         console.error('Error during Data Source initialization', err)
//       })

//     let testNonAdminEmployee = {
//       name: 'Fulano non admin',
//       cpf: '00000000000',
//       password: '12345678',
//       admin: false,
//     }

//     let testAdminEmployee = {
//       name: 'Fulano admin',
//       cpf: '00000000001',
//       password: '12345678',
//       admin: true,
//     }

//     await request(app).post('/employees').send(testNonAdminEmployee)

//     await request(app).post('/employees').send(testAdminEmployee)

//     const responseNonAdminLogin = await request(app).post('/sessions').send({
//       cpf: testNonAdminEmployee.cpf,
//       password: testNonAdminEmployee.password,
//     })

//     const responseAdminLogin = await request(app).post('/sessions').send({
//       cpf: testAdminEmployee.cpf,
//       password: testAdminEmployee.password,
//     })

//     nonAdminToken = responseNonAdminLogin.body.token
//     adminToken = responseAdminLogin.body.token

//     let testBedroom = {
//       number: '1',
//       floor: '1',
//       capacity: 2,
//       availability: true,
//     }

//     await request(app)
//       .post('/bedrooms')
//       .set({ Authorization: `Bearer ${adminToken}` })
//       .send(testBedroom)

//     let testClient = {
//       name: 'fulano cliente',
//       birthDate: '11-11-1111',
//       cpf: '11111111111',
//       cellphone: '33333333333',
//       bedroomId: '1',
//     }

//     const responseClient = await request(app)
//       .post('/clients')
//       .set({ Authorization: `Bearer ${adminToken}` })
//       .send(testClient)

//     testHiredSevice.clientId = responseClient.body.id

//     let testService = {
//       name: 'Café da manha',
//       price: 12.99,
//       description:
//         'Todos os dias café da manha disponivel do periodo das 07:00 ás 10:00 AM',
//     }

//     const responseService = await request(app)
//       .post('/services')
//       .set({ Authorization: `Bearer ${adminToken}` })
//       .send(testService)

//     testHiredSevice.serviceId = responseService.body.id

//     const { body } = await request(app)
//       .post('/hiredservices')
//       .set({ Authorization: `Bearer ${adminToken}` })
//       .send(testHiredSevice)

//     hiredService = body
//   })

//   afterAll(async () => {
//     await connection.destroy()
//   })

//   test('Should not be able to pay hired service without admin permission', async () => {
//     const response = await request(app)
//       .patch(`/hiredservices/pay/${hiredService.id}`)
//       .set({ Authorization: `Bearer ${nonAdminToken}` })

//     expect(response.status).toEqual(401)
//     expect(response.body.message).toBeDefined()
//   })
// })
