import * as yup from "yup"

const createBedroomSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        number: yup.string().required("Bedroom number is required!"),
        floor: yup.string().required("Bedroom floor is required!"),
        capacity: yup.number().required("Bedroom capacity is required!"),
        availability: yup
          .boolean()
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default createBedroomSchema
