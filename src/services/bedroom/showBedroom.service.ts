import AppError from '../../errors/AppError';
import Bedroom from '../../models/Bedrooms';
import { AppDataSource } from './../../data-source';

const showBedroomService = async (id: number) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedroom = await bedroomRepository.findOne({ where: { id } });

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404);
  }

  return bedroom;
};

export default showBedroomService