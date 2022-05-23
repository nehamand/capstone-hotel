import * as yup from "yup"

const createClientSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("Name is Required"),
        birthDate: yup.date().required("Birth date is required"),
        cpf: yup
          .string()
          .required("CPF is required!")
          .matches(/^\d+$/, "The field should have digits only")
          .length(11, "Cpf must contain 11 digits"),
        cellphone: yup
          .string()
          .matches(/^\d+$/, "The field should have digits only")
          .length(11, "Cellphone must contain 11 digits"),
        bedroomId: yup.string().required("Bedroom Id is required!"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default createClientSchema
