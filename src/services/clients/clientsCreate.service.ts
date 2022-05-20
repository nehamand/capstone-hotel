import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Bedroom from "../../models/Bedrooms";
import Client from "../../models/Clients";
import formatClientData from "../../utils/formatCreateClientData";

interface ClientProps {
  name: string;
  birthDate: Date;
  cpf: string;
  cellphone: string;
  bedroomId: number;
}

const createClient = async (data: ClientProps) => {
  const clientRepository = AppDataSource.getRepository(Client);

  if(!data.bedroomId){
    throw new AppError("Bedroom id is required", 400)
  }

  const bedroomRepository = AppDataSource.getRepository(Bedroom)
  const bedroom = await bedroomRepository.findOne({where: {id: data.bedroomId}})

  if(!bedroom){
    throw new AppError("Bedroom not found", 404)
  }

  if (bedroom.clients.length >= bedroom.capacity) {
    throw new AppError("This bedroom is already full", 400);
  }

  bedroom.availability = false

  const newClient = new Client();
  newClient.name = data.name;
  newClient.birthDate = data.birthDate;
  newClient.cpf = data.cpf;
  newClient.cellphone = data.cellphone;
  newClient.bedroom = bedroom

  await bedroomRepository.save(bedroom)

  clientRepository.create(newClient);

  const client = await clientRepository.save(newClient);

  const fomatedClient = formatClientData({client})

  return fomatedClient;
};

export default createClient
