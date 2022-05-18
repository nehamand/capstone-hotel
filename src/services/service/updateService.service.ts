import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Service from "../../models/Services";

interface UpdateProps {
  name: string;
  price: number;
  description: string;
  status: boolean
}

const updateService = async (id: string, data: UpdateProps) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const service = await serviceRepository.findOne({ where: { id } });

  if (!service) {
    throw new AppError("Service not found", 400);
  }

  const updatedService = await serviceRepository.save({
    ...service,
    name: data.name ? data.name : service.name,
    price: data.price ? data.price : service.price,
    description: data.description ? data.description : service.description,
    status: data.status ? data.status : service.status,
    updated_at: new Date()
  });
  

  return updatedService;
};

export default updateService;
