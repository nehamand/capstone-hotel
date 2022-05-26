import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Client from "../../models/Clients"

const deleteClient = async (id: string) => {
  const clientRepository = AppDataSource.getRepository(Client)

  const client = await clientRepository.findOne({where: {id}})

  if (!client) {
    throw new AppError("client not found", 404)
  }

  const status = false

  const inative = await clientRepository.save({
    ...client,
    status,
  })

  return {message: "Client Disabled", service: {name: inative.name, status}}
}

export default deleteClient
