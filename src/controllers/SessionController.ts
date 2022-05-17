import {Request, Response} from "express"
import {sessionService} from "../services/sessions/sessions.service"

export default class SessionController {
  static async store(request: Request, response: Response) {
    const {cpf, password} = request.body

    const authenticatedUser = sessionService({cpf, password})

    return response.json(authenticatedUser)
  }
}
