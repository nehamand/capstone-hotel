import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Client from "../../models/Clients";
import HiredServices from "../../models/HiredServices";
import Service from "../../models/Services";

interface createProps {
  clientsId: string;
  servicesId: string;
  start_date?: Date;
  end_date: Date;
  paid?: boolean;
  status?: boolean;
}

const createHiredService = async (data: createProps) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);
  const clientRepository = AppDataSource.getRepository(Client)
  const serviceRepository = AppDataSource.getRepository(Service)

  const client = await clientRepository.findOne({ where: { id: data.clientsId } });

  if (!client) {
    throw new AppError("Client not found", 400);
  }

  const service = await serviceRepository.findOne({where: { id: data.servicesId }})

  if (!service) {
    throw new AppError("Service not found", 400)
  }

  const hiredService = hiredServiceRepository.create({ 
   ...data
   
  })
  
  await hiredServiceRepository.save(hiredService);
  return { message: "Hired service created", hiredService };
};

export default createHiredService;
