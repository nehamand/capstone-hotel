import AppError from "../../errors/AppError"
import Bedroom from "../../models/Bedrooms"
import {AppDataSource} from "./../../data-source"

interface BedroomUpdate {
  capacity: number
  availability: boolean
}

const updateBedroomService = async (id: number, data: BedroomUpdate) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedroom = await bedroomRepository.findOne({ where: { id } });

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404);
  }

  const updatedBedroom = await bedroomRepository.save({
    ...data,
    id,
  });

  return {
    message: "Bedroom updated",
    updatedBedroom,
  };
};

export default updateBedroomService
