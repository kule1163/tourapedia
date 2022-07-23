import { httpAuth } from "../httpCommon/httpCommon";

export class AuthServices {
  register = (formData: FormData) => {
    return httpAuth.post("/", formData);
  };
  login = (formData: FormData) => {
    return httpAuth.post("/login", formData);
  };
  edit = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpAuth.patch("/edit", formData, config);
  };
  getMe = (token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpAuth.get("/me");
  };
  changePassword = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpAuth.patch("/change-password", formData, config);
  };

  forgetPassword = (formData: FormData) => {
    return httpAuth.post("/forget-password", formData);
  };

  resetPassword = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpAuth.patch("/reset-password", formData, config);
  };
}
