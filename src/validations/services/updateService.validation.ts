import * as yup from "yup"

const updateServiceSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string(),
        description: yup.string(),
        price: yup.number(),
        status: yup.boolean(),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default updateServiceSchema
