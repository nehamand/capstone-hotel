import {Request, Response} from "express"

import createClient from "../services/clients/clientsCreate.service";
import deleteClient from "../services/clients/clientsDelete.service";
import clientsJoinBedrrom from "../services/clients/clientsJoinBedrrom.service";
import listClient from "../services/clients/clientsList.service";
import listOneClient from "../services/clients/clientsListOne.service";
import updateClient from "../services/clients/clientsUpdate.service";

export default class ClientsController {
  static store = async (req: Request, res: Response) => {
    const { name, birthDate, cpf, cellphone, bedroomId } = req.body;
    const newClient = await createClient({
      name,
      birthDate,
      cpf,
      cellphone,
      bedroomId,
    });
    return res.status(201).json(newClient);
  };
  static index = async (req: Request, res: Response) => {
    const { id } = req.params;
    const client = await listOneClient(id);
    return res.status(200).json(client);
  };
  static show = async (req: Request, res: Response) => {
    const status = req.query.status || "true";
    const client = await listClient(status as string);
    return res.status(200).json(client);
  };
  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, birthDate, cpf, cellphone } = req.body;
    const client = await updateClient(id, {
      name,
      birthDate,
      cpf,
      cellphone,
    });
    return res.status(201).json(client);
  };
  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const client = await deleteClient(id);
    return res.status(200).json(client);
  };

  static joinBedroom = async (req: Request, res: Response) => {
    const {id} = req.params
    const {bedroomId} = req.body

    const clientJoined = await clientsJoinBedrrom({id, bedroomId})

    return res.json(clientJoined)
  }
}
