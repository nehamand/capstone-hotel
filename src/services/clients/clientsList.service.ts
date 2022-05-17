import { AppDataSource } from "../../data-source";
import Client from "../../models/Clients";

const listClient = async () =>{
    const clientRepository = AppDataSource.getRepository(Client);
    const clients = await clientRepository.find();
    return clients;
} 

export default listClient;