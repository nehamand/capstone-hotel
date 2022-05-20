import AppError from "../../errors/AppError";
import Bedroom from "../../models/Bedrooms";
import Client from "../../models/Clients";
import formatCreateClientData from "../../utils/formatCreateClientData";
import { AppDataSource } from "./../../data-source";
interface Props {
  id: string;
  bedroomId: number;
}

const clientsJoinBedrrom = async ({ id, bedroomId }: Props) => {
  if (!bedroomId) {
    throw new AppError("Bedroom is required", 400);
  }

  const clientsRepository = AppDataSource.getRepository(Client);
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const client = await clientsRepository.findOne({ where: { id } });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const bedroom = await bedroomRepository.findOne({ where: { id: bedroomId } });

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404);
  }

  if (bedroom.clients.length >= bedroom.capacity) {
    throw new AppError("This bedroom is already full", 400);
  }

  if(bedroom.clients.find(client => client.id === id)){
      throw new AppError("This client is already on this bedroom", 400)
  }

  bedroom.availability = false;

  client.bedroom = bedroom;

  await bedroomRepository.save(bedroom);

  const clientSaved = await clientsRepository.save(client);

  const formatedClient = formatCreateClientData({client: clientSaved})

  return formatedClient;
};

export default clientsJoinBedrrom;
