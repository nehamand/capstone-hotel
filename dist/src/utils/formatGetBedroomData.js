"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatGetBedroomData = ({ bedroom }) => {
    const formatedBedroom = {
        id: bedroom.id,
        number: bedroom.number,
        floor: bedroom.floor,
        capacity: bedroom.capacity,
        availability: bedroom.availability,
        created_at: bedroom.created_at,
        updated_at: bedroom.updated_at,
        status: bedroom.status,
        clients: bedroom.clients.map((client) => {
            return {
                id: client.id,
                name: client.name,
                cpf: client.cpf,
                cellphone: client.cellphone,
                status: client.status,
            };
        }),
    };
    return formatedBedroom;
};
exports.default = formatGetBedroomData;
