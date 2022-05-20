import * as yup from "yup"

const createBedroomSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        number: yup.number().required("Bedroom number is required!"),
        floor: yup.number().required("Bedroom floor is required!"),
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
