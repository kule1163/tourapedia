import * as yup from "yup";

/* const FILE_SIZE = 1024 * 1024; */

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  tags: yup
    .string()
    .required()
    .matches(
      /^[aA-zZ0-9,]+$/,
      "dont use expration or white space, seperate by comma: tag1,tag2,tag3"
    ),
  category: yup.string().required(),
  file: yup.mixed().test("fileType", "Unsupported File Format", (value) => {
    if (value.length > 0) {
      return SUPPORTED_FORMATS.includes(value[0].type);
    } else {
      return true;
    }
  }),
});
