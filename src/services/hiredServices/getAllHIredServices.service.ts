import { AppDataSource } from "../../data-source";
import HiredServices from "../../models/HiredServices";

const getAllHiredServices = async (status: string) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);

  const hiredServices = await hiredServiceRepository.find();

  const activeServices = hiredServices.filter(
    (hiredService) => hiredService.status.toString() === status
  );

  return activeServices;
};

export default getAllHiredServices;
