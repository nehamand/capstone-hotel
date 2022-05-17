import { AppDataSource } from "../../data-source";
import Service from "../../models/Services";

const getAllServices = async () => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const services = await serviceRepository.find();

  return services;
};

export default getAllServices;
