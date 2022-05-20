import * as yup from "yup"

const createServiceSchema = {
  schema: {
    body: {
      yupSchema: yup.object().shape({
        name: yup.string().required("Name is Required"),
        description: yup.string().required("Description is required!"),
        price: yup.number().required("Price is required!"),
      }),
      validateOptions: {
        abortEarly: false,
      },
    },
  },
}
export default createServiceSchema
