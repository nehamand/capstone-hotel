import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"
import formatEmployeeToShow from "../../utils/formatEmployeeToShow"

const getOneEmployeeService = async (id: string) => {
  const employeeRepository = AppDataSource.getRepository(Employee)
  const employee = await employeeRepository.findOne({where: {id}})

  if (!employee) {
    throw new AppError("Employee not found.", 404)
  }

  const employeeToShow = formatEmployeeToShow(employee)

  return employeeToShow
}

export default getOneEmployeeService
