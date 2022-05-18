import { string } from "yup";
import AppError from "../../errors/AppError";
import Bedroom from "../../models/Bedrooms";
import { AppDataSource } from "./../../data-source";

interface BedroomCreate {
  number: string;
  floor: string;
  capacity: number;
  availability: boolean;
}

const createBedroomService = async ({
  number,
  floor,
  capacity,
  availability,
}: BedroomCreate) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedrooms = await bedroomRepository.find();

  const bedroomAlreadyExists = bedrooms.find(bedroom => bedroom.number === number)

  if(bedroomAlreadyExists){
      throw new AppError("This bedroom already exists", 409)
  }

  const bedroom = new Bedroom()
  bedroom.number = number
  bedroom.floor = floor
  bedroom.capacity = capacity
  bedroom.availability = availability

  bedroomRepository.create(bedroom)
  await bedroomRepository.save(bedroom)

  return bedroom
};

export default createBedroomService;
