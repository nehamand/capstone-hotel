import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import HiredServices from "../../models/HiredServices";
import formatHiredServiceData from "../../utils/formatHiredServiceData";

const getOneHiredService = async (id: number) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);

  const hiredService = await hiredServiceRepository
    .createQueryBuilder("hired_service")
    .innerJoinAndSelect("hired_service.service", "services")
    .innerJoinAndSelect("hired_service.client", "clients")
    .where(`hired_service.id = ${id}`)
    .getOne();

  if(!hiredService){
    throw new AppError("Hired Service not found", 404)
  }

  const hiredServiceFormated = formatHiredServiceData({ hiredService })

  return hiredServiceFormated;
};

export default getOneHiredService;
