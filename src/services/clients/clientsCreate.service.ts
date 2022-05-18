import {AppDataSource} from "../../data-source"
import Client from "../../models/Clients"

interface ClientProps {
  name: string
  birthDate: Date
  cpf: string
  cellphone: string
  bedroom_id: Client
}

const createClient = async (data: ClientProps) => {
  const clientRepository = AppDataSource.getRepository(Client)

  const newClient = new Client()
  newClient.name = data.name
  newClient.birthDate = data.birthDate
  newClient.cpf = data.cpf
  newClient.cellphone = data.cellphone
  newClient.bedroom = data.bedroom_id
  clientRepository.create(newClient)
  await clientRepository.save(newClient)
  return newClient
}

export default createClient
