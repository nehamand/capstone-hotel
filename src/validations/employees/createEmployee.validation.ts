import * as yup from "yup"

const createEmployeeSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("Name is Required"),
        cpf: yup.string().required("CPF is required!"),
        password: yup.string().required("Password is required!"),
        admin: yup.boolean(),
        status: yup.boolean(),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default createEmployeeSchema
