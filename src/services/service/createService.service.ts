import { AppDataSource } from "../../data-source";
import Service from "../../models/Services";

interface ServiceProps {
  id?: number;
  name: string;
  price: number;
  description: string;
}

const createService = async (data: ServiceProps) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const newService = new Service();
  newService.name = data.name;
  newService.price = data.price;
  newService.description = data.description;

  serviceRepository.create(newService);
  await serviceRepository.save(newService);

  return newService;
};

export default createService;
