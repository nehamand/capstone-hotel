import * as yup from "yup"

const createHiredServiceSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        serviceId: yup.number().required("Service Id is required"),
        clientId: yup.string().required("Client is required"),
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
