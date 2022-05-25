import AppError from '../../errors/AppError';
import Client from '../../models/Clients';
import { AppDataSource } from './../../data-source';

const clientsSearchCPF = async (cpf: string) => {
    if(!cpf){
        throw new AppError("CPF is required", 400)
    }

    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOne({where: {cpf}})

    if(!client){
        throw new AppError("Client not found", 404)
    }

    return client
}

export default clientsSearchCPF