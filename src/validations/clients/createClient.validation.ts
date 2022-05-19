import * as yup from "yup"

const createClientSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("Name is Required"),
        birthDate: yup.string().required("Birth date is required"),
        cpf: yup.string().required("CPF is required!"),
        cellphone: yup.string().required("Cellphone is required!"),
        bedroomId: yup.string().required("Bedroom Id is required!"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default createClientSchema
