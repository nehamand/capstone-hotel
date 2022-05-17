import { AppDataSource } from "../../data-source"
import Employee from "../../models/Employees"

const getAllEmployees = async () => {
  const employeesRepository = AppDataSource.getRepository(Employee)
  const employees = await employeesRepository.find()

  const employeesToShow = employees.map((employee) => {
    return {
      id: employee.id,
      name: employee.name,
      cpf: employee.cpf,
      admin: employee.admin,
      status: employee.status,
      created_at: employee.created_at,
      updated_at: employee.updated_at,
    }
  })
  return employeesToShow
}

export default getAllEmployees
