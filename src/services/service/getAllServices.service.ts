import { AppDataSource } from "../../data-source";
import Service from "../../models/Services";

const getAllServices = async (status: string) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const services = await serviceRepository.find();

  const activeServices = services.filter(
    (service) => service.status.toString() === status
  );

  return activeServices;
};

export default getAllServices;
