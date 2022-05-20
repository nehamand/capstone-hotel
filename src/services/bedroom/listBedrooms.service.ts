import Bedroom from "../../models/Bedrooms";
import formatGetBedroomData from "../../utils/formatGetBedroomData";
import { AppDataSource } from "./../../data-source";

const listBedroomsService = async () => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedrooms = await bedroomRepository.find();

  const filteredBedroooms = bedrooms.map((bedroom) => formatGetBedroomData({bedroom}));

  return filteredBedroooms;
};

export default listBedroomsService;
