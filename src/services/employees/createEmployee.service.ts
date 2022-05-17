import { AppDataSource } from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"

import bcrypt from "bcrypt"

interface ICreateEmployee {
  name: string
  cpf: string
  password: string
  admin: boolean
  status: boolean
}

const createEmployeeService = async ({
  name,
  cpf,
  password,
  admin = false,
  status = true,
}: ICreateEmployee) => {
  const employeeRepository = AppDataSource.getRepository(Employee)
  const cpfExists = await employeeRepository.findOne({ where: { cpf } })

  if (cpfExists) {
    throw new AppError("Employee with this cpf already exists.", 400)
  }

  if (!name) {
    throw new AppError("Employee need a name.", 400)
  }

  if (!cpf) {
    throw new AppError("Employee need a password.", 400)
  }

  if (!cpf) {
    throw new AppError("Employee need a cpf.", 400)
  }

  const newEmployee = new Employee()
  newEmployee.name = name
  newEmployee.cpf = cpf
  newEmployee.password = bcrypt.hashSync(password, 10)
  newEmployee.admin = admin
  newEmployee.created_at = new Date()
  newEmployee.updated_at = new Date()
  newEmployee.status = status

  employeeRepository.create(newEmployee)
  await employeeRepository.save(newEmployee)

  return newEmployee
}

export default createEmployeeService
