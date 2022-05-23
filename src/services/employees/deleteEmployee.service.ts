import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"

const deleteEmployeeService = async (id: string) => {
  const employeesRepository = AppDataSource.getRepository(Employee)

  const employee = await employeesRepository.findOne({where: {id}})

  if (!employee) {
    throw new AppError("Employee not found.", 404)
  }

  employee.status = false

  await employeesRepository.update(employee, employee)
  await employeesRepository.save(employee)

  return {name: employee.name, status: employee.status}
}

export default deleteEmployeeService
