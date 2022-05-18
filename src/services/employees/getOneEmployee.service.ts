import { AppDataSource } from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"

const getOneEmployeeService = async (id: string) => {
  const employeeRepository = AppDataSource.getRepository(Employee)
  const employee = await employeeRepository.findOne({ where: { id } })

  if (!employee) {
    throw new AppError("Employee not found.", 400)
  }

  const employeeToShow = {
    id: employee.id,
    name: employee.name,
    cpf: employee.cpf,
    admin: employee.admin,
    status: employee.admin,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
  }

  return employeeToShow
}

export default getOneEmployeeService
