import * as yup from "yup"

const updateClientSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        birthDate: yup.date(),
        cpf: yup.string(),
        cellphone: yup.string(),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default updateClientSchema
