import AppError from "../../errors/AppError"
import Bedroom from "../../models/Bedrooms"
import {AppDataSource} from "../../data-source"

const disableBedroomService = async (id: number) => {
  const bedroomRepository = AppDataSource.getRepository(Bedroom)

  const bedroom = await bedroomRepository.findOne({where: {id}})

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404)
  }

  bedroom.status = false

  const bedroomDisabled = await bedroomRepository.save(bedroom)

  return {
    message: "Bedroom disabled",
    bedroom: {
      status: bedroomDisabled.status,
      number: bedroomDisabled.number,
    },
  }
}

export default disableBedroomService
