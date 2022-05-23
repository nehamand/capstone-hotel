import * as yup from "yup"

const loginSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        cpf: yup
          .string()
          .required("CPF is required!")
          .matches(/^\d+$/, "The field should have digits only")
          .length(11, "Cellphone must contain 11 digits"),
        password: yup.string().required("Password is required!"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default loginSchema
