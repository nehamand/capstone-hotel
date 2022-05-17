import Bedroom from '../../models/Bedrooms';
import { AppDataSource } from './../../data-source';

const listBedroomsService = async () => {
    const bedroomRepository = AppDataSource.getRepository(Bedroom)

    const bedrooms = bedroomRepository.find()

    return bedrooms
}

export default listBedroomsService