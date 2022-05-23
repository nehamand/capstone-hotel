import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"
import formatEmployeeToShow from "../../utils/formatEmployeeToShow"

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
  const cpfExists = await employeeRepository.findOne({where: {cpf}})

  if (cpfExists) {
    throw new AppError("Employee with this cpf already exists.", 409)
  }

  const newEmployee = new Employee()
  newEmployee.name = name
  newEmployee.cpf = cpf
  newEmployee.password = bcrypt.hashSync(password, 10)
  newEmployee.admin = admin
  newEmployee.status = status

  employeeRepository.create(newEmployee)
  await employeeRepository.save(newEmployee)

  const employeeToShow = formatEmployeeToShow(newEmployee)
  return employeeToShow
}

export default createEmployeeService
