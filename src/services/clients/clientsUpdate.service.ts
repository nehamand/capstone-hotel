import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Client from "../../models/Clients";

interface UpdateProps {
  name: string;
  birthDate: Date;
  cpf: string;
  cellphone?: string;
  status?: boolean;
}

const updateClient = async (id: string, data: UpdateProps) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOne({ where: { id } });

  if (!client) {
    throw new AppError("client not found", 404);
  }

  data.cellphone = data.cellphone ? data.cellphone : client.cellphone;

  const updatedClients = await clientRepository.save({
    ...data,
    id,
  });

  return updatedClients;
};

export default updateClient;
