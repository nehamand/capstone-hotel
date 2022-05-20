import * as yup from "yup"

const loginSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        cpf: yup.string().required("CPF is required!"),
        password: yup.string().required("Password is required!"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default loginSchema
