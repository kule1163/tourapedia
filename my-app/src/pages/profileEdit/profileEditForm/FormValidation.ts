import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

export const schema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  file: yup.mixed().test("fileType", "Unsupported File Format", (value) => {
    if (value.length > 0) {
      return SUPPORTED_FORMATS.includes(value[0].type);
    } else {
      return true;
    }
  }),
});
