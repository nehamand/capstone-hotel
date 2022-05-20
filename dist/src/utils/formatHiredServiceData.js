"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatHiredServiceData = ({ hiredService, }) => {
    const formatedHiredService = {
        id: hiredService.id,
        paid: hiredService.paid,
        start_date: hiredService.start_date,
        end_date: hiredService.end_date,
        bedroom_number: hiredService.bedroom_number,
        total_price: hiredService.total_price,
        created_at: hiredService.created_at,
        updated_at: hiredService.updated_at,
        status: true,
        client: {
            id: hiredService.client.id,
            name: hiredService.client.name,
            cpf: hiredService.client.cpf,
            status: hiredService.client.status,
        },
        service: {
            id: hiredService.service.id,
            name: hiredService.service.name,
            price: hiredService.service.price,
            description: hiredService.service.description,
            status: hiredService.service.status,
        },
    };
    return formatedHiredService;
};
exports.default = formatHiredServiceData;
