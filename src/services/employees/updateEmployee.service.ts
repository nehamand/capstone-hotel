import { AppDataSource } from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"

import bcrypt from "bcrypt"

interface UpdateProps {
  name?: string
  password?: string
  admin?: boolean
  status?: boolean
}

const updateEmployeeService = async (id: string, data: UpdateProps) => {
  const employeeRepository = AppDataSource.getRepository(Employee)
  const employee = await employeeRepository.findOne({ where: { id } })

  if (!employee) {
    throw new AppError("Employee not found.", 400)
  }

  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10)
  }

  const employeeToShow = await employeeRepository.save({
    ...data,
    id,
  })

  return employeeToShow
}

export default updateEmployeeService
