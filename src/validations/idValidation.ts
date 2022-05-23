import * as yup from "yup"

const idSchema = {
  schema: {
    params: {
      yupSchema: yup.object().shape({
        id: yup.string().length(36, "This Id is not a uuid"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default idSchema
