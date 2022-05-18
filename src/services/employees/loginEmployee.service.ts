// import { AppDataSource } from "../../data-source"
// import AppError from "../../errors/AppError"
// import Employee from "../../models/Employees"

// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"

// const loginEmployeeService = async (cpf: string, password: string) => {
//   const employeesRepository = AppDataSource.getRepository(Employee)
//   const employee = await employeesRepository.findOne({ where: { cpf } })

//   if (!employee) {
//     throw new AppError("Cpf or password incorrect.", 400)
//   }

//   const passwordMatch = bcrypt.compareSync(password, employee.password)

//   if (!passwordMatch) {
//     throw new AppError("Cpf or password incorrect.", 400)
//   }
// }

// export default loginEmployeeService
