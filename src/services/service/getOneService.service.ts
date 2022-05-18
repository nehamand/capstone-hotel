import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import HiredServices from "../../models/HiredServices";

const getOneHiredService = async (id: string) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);

  const hiredService = await hiredServiceRepository.findOne({ where: { id } });

  if (!hiredService) {
    throw new AppError("Hired Service not found", 400);
  }

  return hiredService
};

export default getOneHiredService;
