import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Bedroom from "../../models/Bedrooms"
import HiredServices from "../../models/HiredServices"

const updateHiredService = async (id: number) => {
  const hiredServiceRepository = AppDataSource.getRepository(HiredServices)

  const hiredService = await hiredServiceRepository.findOne({where: {id}})

  if (!hiredService) {
    throw new AppError("Hired Service not found", 404)
  }

  if (hiredService.paid) {
    throw new AppError("This Hired Service has already been paid", 409)
  }

  const bedroomRepostiroy = AppDataSource.getRepository(Bedroom)
  const bedroom = await bedroomRepostiroy.findOne({
    where: {number: hiredService.bedroom_number},
  })

  if (!bedroom) {
    throw new AppError("Bedroom not found", 404)
  }

  bedroom.availability = true
  bedroom.clients = []

  await bedroomRepostiroy.save(bedroom)

  hiredService.paid = true
  hiredService.status = false

  const updatedHiredService = await hiredServiceRepository.save({
    ...hiredService,
    id,
  })

  return {message: "Paid Hired service", updatedHiredService}
}

export default updateHiredService
