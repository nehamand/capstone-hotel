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
  admin,
  status,
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
  newEmployee.status = status

  employeeRepository.create(newEmployee)
  await employeeRepository.save(newEmployee)

  const employeeToShow = {
    id: newEmployee.id,
    name: newEmployee.name,
    cpf: newEmployee.cpf,
    admin: newEmployee.admin,
    status: newEmployee.status,
    created_at: newEmployee.created_at,
    updated_at: newEmployee.updated_at,
  }

  return employeeToShow
}

export default createEmployeeService
