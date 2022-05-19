import Client from "../models/Clients";

interface Props {
  client: Client;
}

const formatClientData = ({ client }: Props) => {
  const formatedClient = {
    id: client.id,
    name: client.name,
    cpf: client.cpf,
    birthDate: client.birthDate,
    cellphone: client.cellphone,
    created_at: client.created_at,
    updated_at: client.updated_at,
    status: client.status,
    bedroom: {
      id: client.bedroom.id,
      number: client.bedroom.number,
      floor: client.bedroom.floor,
      capacity: client.bedroom.capacity,
      availability: client.bedroom.availability,
      status: client.bedroom.status,
    },
  };

  return formatedClient;
};

export default formatClientData;
