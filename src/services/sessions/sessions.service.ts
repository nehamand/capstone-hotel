import {compare} from "bcryptjs"
import {sign} from "jsonwebtoken"
import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"

interface Request {
  cpf: string
  password: string
}

interface Response {
  token: string
  employee: Employee
}

export const sessionService = async ({
  cpf,
  password,
}: Request): Promise<Response> => {
  const employeeRepository = AppDataSource.getRepository(Employee)

  const employee = await employeeRepository.findOne({
    where: {cpf},
  })

  if (!employee) {
    throw new AppError("Incorrect cpf/password", 404)
  }

  const passwordMatch = await compare(password, employee.password)

  if (!passwordMatch) {
    throw new AppError("Incorrect cpf/password")
  }

  const token = sign({}, process.env.SECRET_KEY || "default", {
    subject: employee.id,
    expiresIn: "3d",
  })

  return {
    employee,
    token,
  }
}
