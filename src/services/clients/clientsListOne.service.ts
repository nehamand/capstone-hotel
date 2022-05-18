import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Client from "../../models/Clients";

const listOneClient = async (id:string) =>{
    
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOne({where:{id}});

    if (!client) {
        throw new AppError("client not found", 400);
      }

    return client;
} 

export default listOneClient;