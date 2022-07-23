import * as yup from "yup";

export const schema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  newPassword2: yup
    .string()
    .required("Password confirm is required")
    .oneOf([yup.ref("newPassword")], "Password does not match"),
});
