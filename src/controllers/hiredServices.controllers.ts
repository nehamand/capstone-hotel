import { Request, Response } from "express";

import changeHiredStatusService from "../services/hiredServices/changeStatusHiredService.service";
import createHiredService from "../services/hiredServices/createHiredService.service";
import getAllHiredServices from "../services/hiredServices/getAllHIredServices.service";
import getOneHiredService from "../services/service/getOneService.service";
import updateHiredService from "../services/hiredServices/updateHiredService.service";

export default class HiredServicesControllers {
  static store = async (req: Request, res: Response) => {
    const data = req.body;

    const hiredService = await createHiredService(data);
    return res.status(201).json(hiredService);
  };
  static show = async (req: Request, res: Response) => {
    const id = req.params.id;
    const hiredService = await getOneHiredService(Number(id));
    return res.status(200).json(hiredService);
  };
  static index = async (req: Request, res: Response) => {
    const status = req.query.status || "true";
    const hiredService = await getAllHiredServices(status as string);
    return res.status(200).json(hiredService);
  };
  static update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const hiredService = await updateHiredService(Number(id), data);
    return res.status(201).json(hiredService);
  };
  static delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const hiredService = await changeHiredStatusService(Number(id));
    return res.status(200).json(hiredService);
  };
}
