import Bedroom from "../../models/Bedrooms";
import formatGetBedroomData from "../../utils/formatGetBedroomData";
import { AppDataSource } from "./../../data-source";

const listBedroomsService = async (status: string) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedrooms = await bedroomRepository.find();

  const filteredBedrooms = bedrooms.filter(
    (bedroom) => bedroom.status.toString() === status
  );

  const formatedBedroooms = filteredBedrooms.map((bedroom) =>
    formatGetBedroomData({ bedroom })
  );

  return formatedBedroooms;
};

export default listBedroomsService;
