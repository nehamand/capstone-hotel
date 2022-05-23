import * as yup from "yup"

const updateEmployeeSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        cpf: yup
          .string()
          .length(11, "Cpf must have 11 digits")
          .matches(/^\d+$/, "The field should have digits only"),
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
