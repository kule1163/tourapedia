import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../app/store";
import { AuthServices } from "../../services/authServices";

interface NavigateProps {
  formData: FormData;
  navigate: NavigateFunction;
}

const authServices = new AuthServices();

export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, navigate }: NavigateProps, thunkAPI) => {
    try {
      const res = await authServices.register(formData);

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/edit",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await authServices.edit(formData, token);
        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ formData, navigate }: NavigateProps, thunkAPI) => {
    try {
      const res = await authServices.login(formData);

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/");

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (navigate: NavigateFunction, thunkAPI) => {
    try {
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",

  async ({ formData, navigate }: NavigateProps, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await authServices.changePassword(formData, token);

        navigate("/");

        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await authServices.forgetPassword(formData);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface ResetPasswordProps extends NavigateProps {
  resetToken: string;
}

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ formData, navigate, resetToken }: ResetPasswordProps, thunkAPI) => {
    try {
      /* const token = (thunkAPI.getState() as RootState).auth.resetToken; */

      const res = await authServices.resetPassword(formData, resetToken);

      navigate("/");

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const token = (thunkAPI.getState() as RootState).auth.user?.token;

    if (token) {
      const res = await authServices.getMe(token);

      return res.data;
    }
  } catch (error) {}
});
