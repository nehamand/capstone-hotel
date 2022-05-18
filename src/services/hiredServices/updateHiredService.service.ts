import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import HiredServices from "../../models/HiredServices";

interface UpdateProps {
  clientdId?: string
  servicesId?: string;
  start_date?: Date;
  end_date?: Date;
  cellphone?: string;
  paid?: boolean;
  total_price?: number;
  status?: boolean;
}

const updateHiredService = async (id: string, data: UpdateProps) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices);

  const hiredService = await hiredServiceRepository.findOne({ where: { id } });

  if (!hiredService) {
    throw new AppError("Hired Service not found", 400);
  }

  const updatedHiredService = await hiredServiceRepository.save({
    ...data,
    id
  });

  return { message: "Hired service updated", updatedHiredService };
};

export default updateHiredService;
