import Bedroom from "../../models/Bedrooms";
import { AppDataSource } from "./../../data-source";

const listBedroomsService = async () => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedrooms = await bedroomRepository.find();

  const filteredBedroooms = bedrooms.map((bedroom) => {
    return {
      id: bedroom.id,
      number: bedroom.number,
      floor: bedroom.floor,
      capacity: bedroom.capacity,
      created_at: bedroom.created_at,
      updated_at: bedroom.updated_at,
      status: bedroom.status,
      clients: bedroom.clients.map((client) => {
        return {
          id: client.id,
          name: client.name,
          cpf: client.cpf,
          cellphone: client.cellphone,
          status: client.status,
        };
      }),
    };
  });

  return filteredBedroooms;
};

export default listBedroomsService;
