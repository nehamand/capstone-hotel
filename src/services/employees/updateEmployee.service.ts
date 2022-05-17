import { AppDataSource } from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"

import bcrypt from "bcrypt"

const updateEmployeeService = async (
  id: string,
  name: string,
  password: string,
  admin: boolean,
  status: boolean
) => {
  const employeeRepository = AppDataSource.getRepository(Employee)
  const employee = await employeeRepository.findOne({ where: { id } })

  if (!employee) {
    throw new AppError("Employee not found.", 400)
  }

  if (!name) {
    name = employee.name
  }

  if (!admin) {
    admin = employee.admin
  }

  if (!status) {
    status = employee.status
  }

  const employeeUpdated = {
    id,
    name,
    cpf: employee.cpf,
    password: password ? bcrypt.hashSync(password, 10) : employee.password,
    admin,
    status,
    updated_at: new Date(),
  }

  await employeeRepository.update(employee, employeeUpdated)

  const employeeToShow = {
    id,
    name,
    cpf: employee.cpf,
    admin,
    status,
    created_at: employee.created_at,
    updated_at: new Date(),
  }

  return employeeToShow
}

export default updateEmployeeService
