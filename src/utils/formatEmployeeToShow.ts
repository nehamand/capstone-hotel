import Employee from "../models/Employees"

const formatEmployeeToShow = (employee: Employee) => {
  const employeeToShow = {
    id: employee.id,
    name: employee.name,
    cpf: employee.cpf,
    admin: employee.admin,
    status: employee.status,
    created_at: employee.created_at,
    updated_at: employee.updated_at,
  }

  return employeeToShow
}

export default formatEmployeeToShow
