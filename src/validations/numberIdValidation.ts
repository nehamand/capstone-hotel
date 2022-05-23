import * as yup from "yup"

const numberIdSchema = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.number(),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default numberIdSchema
