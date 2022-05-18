import {AppDataSource} from "../../data-source"
import AppError from "../../errors/AppError"
import Service from "../../models/Services"

const changeStatusService = async (id: string) => {
  const serviceRepository = AppDataSource.getRepository(Service)

  const service = await serviceRepository.findOne({where: {id}})

  if (!service) {
    throw new AppError("Service not found", 400)
  }

  const status = false

  const inative = await serviceRepository.save({
    ...service,
    status,
  })

  return {message: "Service Disabled", service: {name: inative.name, status}}
}

export default changeStatusService
