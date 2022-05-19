import AppError from '../../errors/AppError';
import Bedroom from '../../models/Bedrooms';
import formatGetBedroomData from '../../utils/formatGetBedroomData';
import { AppDataSource } from './../../data-source';

const showBedroomService = async (id: number) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom);

  const bedroom = await bedroomRepository.findOne({ where: { id } });

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404);
  }

  const formatedBedroom = formatGetBedroomData({bedroom})

  return formatedBedroom;
};

export default showBedroomService