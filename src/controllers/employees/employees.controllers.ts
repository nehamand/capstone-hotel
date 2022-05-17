import { Request, Response } from "express"

import createEmployeeService from "../../services/employees/createEmployee.service"
import deleteEmployeeService from "../../services/employees/deleteEmployee.service"
import getAllEmployees from "../../services/employees/getAllEmployees.service"
import getOneEmployeeService from "../../services/employees/getOneEmployee.service"
import updateEmployeeService from "../../services/employees/updateEmployee.service"

class employeeControllers {
  static async store(req: Request, res: Response) {
    const { name, cpf, password, admin, status } = req.body

    const newUser = await createEmployeeService({
      name,
      cpf,
      password,
      admin,
      status,
    })

    return res.status(201).json(newUser)
  }
  static async index(req: Request, res: Response) {
    const employees = await getAllEmployees()

    return res.status(200).json(employees)
  }
  static async show(req: Request, res: Response) {
    const { id } = req.params

    const employee = await getOneEmployeeService(id)

    return res.status(200).json(employee)
  }
  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, password, admin, status } = req.body

    const employeeUpdated = await updateEmployeeService(
      id,
      name,
      password,
      admin,
      status
    )

    return res
      .status(201)
      .json({ message: "Employee updated", employee: employeeUpdated })
  }
  static async delete(req: Request, res: Response) {
    const { id } = req.params
    const employeeRes = await deleteEmployeeService(id)

    return res.status(201).json({
      message: "Employee deactivated",
      status: employeeRes,
    })
  }
}

export default employeeControllers
