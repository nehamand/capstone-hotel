import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Client from "../../models/Clients";
import HiredServices from "../../models/HiredServices";
import Service from "../../models/Services";

interface createProps {
  clientId?: string;
  serviceId?: number;
  start_date: string;
  end_date: string;
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
    where: { id: data.clientId },
  });

  if (!service) {
    throw new AppError("Service not found", 404);
  }

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  console.log(new Date(data.start_date))

  let startDate = new Date(data.start_date).getTime() / 1000;
  let endDate = new Date(data.end_date).getTime() / 1000;

  let timeDifference = endDate - startDate;

  let dayDifference = timeDifference / 86400;

  let total_price = service.price * dayDifference;
  total_price = Number(total_price.toFixed(2))

  const hiredService = hiredServiceRepository.create({
    ...data,
    service,
    client,
    total_price,
  });

  await hiredServiceRepository.save(hiredService);
  return { message: "Hired service created", hiredService };
};

export default createHiredService;
