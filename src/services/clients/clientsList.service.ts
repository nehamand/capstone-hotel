import { AppDataSource } from "../../data-source";
import Client from "../../models/Clients";

const listClient = async (status:string) =>{
    const clientRepository = AppDataSource.getRepository(Client);
    const clients = await clientRepository.find();
    const statusClients  = clients.filter(client => client.status.toString() === status)
    return statusClients;
} 

export default listClient;