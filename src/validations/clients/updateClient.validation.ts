import * as yup from "yup"

const updateClientSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        birthDate: yup.date(),
        cpf: yup
          .string()
          .matches(/^\d+$/, "The field should have digits only")
          .length(11, "Cpf must contain 11 digits"),
        cellphone: yup
          .string()
          .matches(/^\d+$/, "The field should have digits only")
          .length(11, "Cellphone must contain 11 digits"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default updateClientSchema
