import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Service from "../../models/Services";

const getOneService = async (id: number) => {
  const serviceRepository = AppDataSource.getRepository(Service);

  const service = await serviceRepository.findOne({ where: { id } });

  if (!service) {
    throw new AppError("Service not found", 400);
  }

  return service;
};

export default getOneService;
