import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  authLogin,
  logout,
  editProfile,
  getMe,
  forgetPassword,
  resetPassword,
  changePassword,
} from "./asyncThunks";
import { UserProps } from "./types";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "{}")
  : null;

export interface AuthState {
  status: "idle" | "pending" | "succeeded" | "failed";
  editStatus: "idle" | "pending" | "succeeded" | "failed";
  forgetStatus: "idle" | "pending" | "succeeded" | "failed";
  changeStatus: "idle" | "pending" | "succeeded" | "failed";
  user: UserProps | null;
  message: any;
  isLogin: boolean;
  edit: boolean;
  resetToken: string;
}

export const initialState: AuthState = {
  status: "idle",
  editStatus: "idle",
  forgetStatus: "idle",
  changeStatus: "idle",
  user: null,
  message: "",
  isLogin: false,
  edit: false,
  resetToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.status = "idle";
      state.message = "";
    },
    setEdit: (state, action: PayloadAction<boolean>) => {
      state.edit = action.payload;
    },
    setForgetStatus: (
      state,
      action: PayloadAction<"idle" | "pending" | "succeeded" | "failed">
    ) => {
      state.forgetStatus = action.payload;
    },
    setChangeStatus: (
      state,
      action: PayloadAction<"idle" | "pending" | "succeeded" | "failed">
    ) => {
      state.changeStatus = action.payload;
    },
    setResetToken: (state) => {
      state.resetToken = "";
    },
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(register.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<UserProps>) => {
        state.status = "succeeded";
        state.isLogin = true;
        state.user = action.payload;
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.payload);

      state.status = "failed";
      state.message = action.payload;
    });
    //login
    builder.addCase(authLogin.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isLogin = true;
      state.user = action.payload;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //logout
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "succeeded";
      state.isLogin = false;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
      state.message = action.payload;
    });
    //edit
    builder.addCase(editProfile.pending, (state) => {
      state.editStatus = "pending";
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.editStatus = "succeeded";
      if (action.payload) {
        state.user = {
          ...action.payload.editedUser,
          token: action.payload.token,
        };
      }
    });
    builder.addCase(editProfile.rejected, (state, action) => {
      state.editStatus = "failed";
      state.message = action.payload;
    });
    //change password
    builder.addCase(changePassword.pending, (state) => {
      state.changeStatus = "pending";
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.changeStatus = "succeeded";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.changeStatus = "failed";
      state.message = action.payload;
    });
    //reset password
    builder.addCase(forgetPassword.pending, (state) => {
      state.forgetStatus = "pending";
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.forgetStatus = "succeeded";
      state.resetToken = action.payload;
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.forgetStatus = "failed";
      state.message = action.payload;
    });
    //reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.forgetStatus = "pending";
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.forgetStatus = "succeeded";
      state.resetToken = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.forgetStatus = "failed";
      state.resetToken = "";
      state.message = action.payload;
    });
  },
});

export const {
  resetAuth,
  setEdit,
  setForgetStatus,
  setChangeStatus,
  setResetToken,
} = authSlice.actions;

export default authSlice.reducer;
