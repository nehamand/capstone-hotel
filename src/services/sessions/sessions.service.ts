import {compare} from "bcryptjs"
import {sign} from "jsonwebtoken"
import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Employee from "../../models/Employees"
import formatEmployeeToShow from "../../utils/formatEmployeeToShow"

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
}: Request) => {
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

  const token = sign(
    {isAdmin: employee.admin},
    process.env.SECRET_KEY || "default",
    {
      subject: employee.id,
      expiresIn: "3d",
    }
  )

  const employeeToShow = formatEmployeeToShow(employee)

  return {
    employee: employeeToShow,
    token,
  }
}
