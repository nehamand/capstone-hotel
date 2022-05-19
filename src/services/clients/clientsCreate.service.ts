import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Bedroom from "../../models/Bedrooms";
import Client from "../../models/Clients";

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

  const newClient = new Client();
  newClient.name = data.name;
  newClient.birthDate = data.birthDate;
  newClient.cpf = data.cpf;
  newClient.cellphone = data.cellphone;
  newClient.bedroom = bedroom

  clientRepository.create(newClient);

  await clientRepository.save(newClient);

  return newClient;
};

export default createClient;
