import * as yup from "yup"

const updateEmployeeSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        cpf: yup.string(),
        password: yup.string(),
        admin: yup.boolean(),
        status: yup.boolean(),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default updateEmployeeSchema
