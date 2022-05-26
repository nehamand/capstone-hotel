import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Bedroom from "../../models/Bedrooms";
import Client from "../../models/Clients";
import HiredServices from "../../models/HiredServices";
import Service from "../../models/Services";
import formatHiredServiceData from "../../utils/formatHiredServiceData";

interface createProps {
  cpf: string;
  serviceId: number;
  start_date: string;
  end_date: string;
  bedroom_number?: string;
  status?: boolean;
}

const createHiredService = async (data: createProps) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);

  const serviceRepository = AppDataSource.getRepository(Service);
  const service = await serviceRepository.findOne({
    where: { id: data.serviceId },
  });

  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOne({
    where: { cpf: data.cpf },
  });

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  const bedroomRepository = AppDataSource.getRepository(Bedroom)
  const bedroom = await bedroomRepository.find()

  const findBedroom = bedroom.find(bedroom => bedroom.clients.find(bedClient => bedClient.id === client.id))

  if(!findBedroom){
    throw new AppError("Client bedrooms not exists", 404)
  }

  data.bedroom_number = findBedroom.number

  let startDate = new Date(data.start_date).getTime() / 1000;
  let endDate = new Date(data.end_date).getTime() / 1000;

  let timeDifference = endDate - startDate;

  
  let dayDifference = timeDifference / 86400;
  
  if(dayDifference <= 0){
    throw new AppError("The date difference must be at least 1 day", 400);
  }

  let total_price = service.price * dayDifference;
  total_price = Number(total_price.toFixed(2))

  const hiredService = hiredServiceRepository.create({
    ...data,
    service,
    client,
    total_price,
  });

  await hiredServiceRepository.save(hiredService);
  
  const formatedHiredService = formatHiredServiceData({hiredService})

  return formatedHiredService;
};

export default createHiredService;
