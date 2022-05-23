import {AppDataSource} from "../../data-source"
import Employee from "../../models/Employees"
import formatEmployeeToShow from "../../utils/formatEmployeeToShow"

const getAllEmployees = async (status: string) => {
  const employeesRepository = AppDataSource.getRepository(Employee)
  const employees = await employeesRepository.find()

  const employeesToShow = employees.map((employee) => {
    const employeeToShow = formatEmployeeToShow(employee)
    return employeeToShow
  })

  const employeesActive = employeesToShow.filter(
    (employee) => employee.status.toString() === status
  )
  return employeesActive
}

export default getAllEmployees
