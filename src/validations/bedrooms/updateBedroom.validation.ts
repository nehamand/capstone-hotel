import * as yup from "yup"

const updateBedroomSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        number: yup.string(),
        floor: yup.string(),
        capacity: yup.number(),
        availability: yup.boolean(),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default updateBedroomSchema
