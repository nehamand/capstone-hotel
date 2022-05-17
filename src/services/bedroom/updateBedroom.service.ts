import AppError from "../../errors/AppError";
import Bedroom from "../../models/Bedrooms";
import { AppDataSource } from "./../../data-source";

interface BedroomUpdate {
  id: string;
  capacity: number;
  availability: boolean;
}

const updateBedroomService = async ({
  id,
  capacity,
  availability,
}: BedroomUpdate) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedroom = await bedroomRepository.findOne({ where: { id } });

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404);
  }

  capacity && (bedroom.capacity = capacity)
  availability != null && (bedroom.availability = availability)
  bedroom.updated_at = new Date()

  const updatedBedroom = await bedroomRepository.save(bedroom)

  return updatedBedroom
};

export default updateBedroomService;
