import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Service from "../../models/Services"

interface UpdateProps {
  name: string
  price: number
  description: string
  status: boolean
}

const updateService = async (id: number, data: UpdateProps) => {
  const serviceRepository = AppDataSource.getRepository(Service)

  const service = await serviceRepository.findOne({where: {id}})

  if (!service) {
    throw new AppError("Service not found", 400)
  }

  const updatedService = await serviceRepository.save({
    ...data,
    id,
  })

  return {message: "Service updated", updatedService}
}

export default updateService
