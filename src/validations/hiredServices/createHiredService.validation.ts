import * as yup from "yup"

const createHiredServiceSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        serviceId: yup.number().required("Service Id is required"),
        cpf: yup.string().required("Client CPF is required").length(11),
        start_date: yup.date().required("Start date is required!"),
        end_date: yup.date().required("End date is required!"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default createHiredServiceSchema
