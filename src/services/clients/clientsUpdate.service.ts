import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Client from "../../models/Clients";

interface UpdateProps {
    name: string;
    birthDate: Date;
    cpf: string;
    cellphone: string;
}

const updateClient = async (id: string, data:UpdateProps) => {
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOne({where:{id}});

    console.log(client)

    if (!client) {
        throw new AppError("client not found", 400);
      }

      const updatedClients = await clientRepository.save({
        ...client,
        name: data.name ? data.name : client.name,
        birthDate: data.birthDate ? data.birthDate : client.birthDate,
        cpf: data.cpf ? data.cpf : client.cpf,
        cellphone: data.cellphone ? data.cellphone : client.cellphone,
        updated_at: new Date()
      });
    
      return updatedClients;
}

export default updateClient;