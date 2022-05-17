import { Request, Response } from "express"

import createEmployeeService from "../../services/employees/createEmployee.service"

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

    return newUser
  }
  static async index(req: Request, res: Response) {}
  static async show(req: Request, res: Response) {}
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}

export default employeeControllers
