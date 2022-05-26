import { AppDataSource } from "../../data-source";
import Client from "../../models/Clients";
import formatGetClientData from "../../utils/formatGetClientData";

const listClient = async (status:string) =>{
    const clientRepository = AppDataSource.getRepository(Client);
    
    // const clients = await clientRepository.find();

    const clients = await clientRepository
      .createQueryBuilder("clients")
      .leftJoinAndSelect("clients.hiredServices", "hired_services")
      .leftJoinAndSelect("clients.bedroom", "bedrooms")
      .where(`clients.status = ${status}`)
      .getMany();

      console.log(clients)

    const statusClients  = clients.filter(client => client.status.toString() === status)

    const fomatedClients = statusClients.map(client => formatGetClientData({client}))

    return fomatedClients;
} 

export default listClient;