import { AppDataSource } from "../../data-source";
import HiredServices from "../../models/HiredServices";
import formatHiredServiceData from "../../utils/formatHiredServiceData";

const getAllHiredServices = async (status: string) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices); 

  const hiredArray = await hiredServiceRepository
    .createQueryBuilder("hired_service")
    .innerJoinAndSelect("hired_service.service", "services")
    .innerJoinAndSelect("hired_service.client", "clients")
    .where(`hired_service.status = ${status}`)
    .getMany();

  const hiredSrevices = hiredArray.map((hiredService) => formatHiredServiceData({hiredService}))

  return hiredSrevices;
};

export default getAllHiredServices;
