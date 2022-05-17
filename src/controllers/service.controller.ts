import { Request, Response } from "express";
import changeStatusService from "../services/service/changeStatus.service";
import createService from "../services/service/createService.service";
import getAllServices from "../services/service/getAllServices.service";
import getOneService from "../services/service/getOneService.service";
import updateService from "../services/service/updateService.service";

class ServiceController {
  static async create(req: Request, res: Response) {
    const { name, description, price } = req.body;

    const newService = await createService({ name, description, price });

    return res.status(201).json(newService);
  }

  static async index(req: Request, res: Response) {
    const services = await getAllServices();

    return res.status(200).json(services);
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const service = await getOneService(id);

    return res.status(200).json(service);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const updatedService = await updateService(id, {
      name,
      price,
      description,
    });

    return res.status(200).json(updatedService);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    
    const changeService = await changeStatusService(id);

    return res.status(200).json(changeService);
  }
}

export default ServiceController;
