import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import HiredServices from "../../models/HiredServices";

const changeHiredStatusService = async (id: number) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);

  const hiredService = await hiredServiceRepository.findOne({ where: { id } });

  if (!hiredService) {
    throw new AppError("Hired Service not found", 400);
  }

  const status = false;

  await hiredServiceRepository.save({
    status,
    id,
  });

  return { message: "Hired service disabled", status };
};

export default changeHiredStatusService
