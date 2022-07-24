"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setResetToken = exports.setChangeStatus = exports.setForgetStatus = exports.setEdit = exports.resetAuth = exports.authSlice = exports.initialState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const asyncThunks_1 = require("./asyncThunks");
const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
exports.initialState = {
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
exports.authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState: exports.initialState,
    reducers: {
        resetAuth: (state) => {
            state.status = "idle";
            state.message = "";
        },
        setEdit: (state, action) => {
            state.edit = action.payload;
        },
        setForgetStatus: (state, action) => {
            state.forgetStatus = action.payload;
        },
        setChangeStatus: (state, action) => {
            state.changeStatus = action.payload;
        },
        setResetToken: (state) => {
            state.resetToken = "";
        },
    },
    extraReducers: (builder) => {
        //register
        builder.addCase(asyncThunks_1.register.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_1.register.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.isLogin = true;
            state.user = action.payload;
        });
        builder.addCase(asyncThunks_1.register.rejected, (state, action) => {
            console.log(action.payload);
            state.status = "failed";
            state.message = action.payload;
        });
        //login
        builder.addCase(asyncThunks_1.authLogin.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_1.authLogin.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.isLogin = true;
            state.user = action.payload;
        });
        builder.addCase(asyncThunks_1.authLogin.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //logout
        builder.addCase(asyncThunks_1.logout.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncThunks_1.logout.fulfilled, (state) => {
            state.status = "succeeded";
            state.isLogin = false;
            state.user = null;
        });
        builder.addCase(asyncThunks_1.logout.rejected, (state, action) => {
            state.status = "failed";
            state.message = action.payload;
        });
        //edit
        builder.addCase(asyncThunks_1.editProfile.pending, (state) => {
            state.editStatus = "pending";
        });
        builder.addCase(asyncThunks_1.editProfile.fulfilled, (state, action) => {
            state.editStatus = "succeeded";
            if (action.payload) {
                state.user = Object.assign(Object.assign({}, action.payload.editedUser), { token: action.payload.token });
            }
        });
        builder.addCase(asyncThunks_1.editProfile.rejected, (state, action) => {
            state.editStatus = "failed";
            state.message = action.payload;
        });
        //change password
        builder.addCase(asyncThunks_1.changePassword.pending, (state) => {
            state.changeStatus = "pending";
        });
        builder.addCase(asyncThunks_1.changePassword.fulfilled, (state, action) => {
            state.changeStatus = "succeeded";
        });
        builder.addCase(asyncThunks_1.changePassword.rejected, (state, action) => {
            state.changeStatus = "failed";
            state.message = action.payload;
        });
        //reset password
        builder.addCase(asyncThunks_1.forgetPassword.pending, (state) => {
            state.forgetStatus = "pending";
        });
        builder.addCase(asyncThunks_1.forgetPassword.fulfilled, (state, action) => {
            state.forgetStatus = "succeeded";
            state.resetToken = action.payload;
        });
        builder.addCase(asyncThunks_1.forgetPassword.rejected, (state, action) => {
            state.forgetStatus = "failed";
            state.message = action.payload;
        });
        //reset password
        builder.addCase(asyncThunks_1.resetPassword.pending, (state) => {
            state.forgetStatus = "pending";
        });
        builder.addCase(asyncThunks_1.resetPassword.fulfilled, (state, action) => {
            state.forgetStatus = "succeeded";
            state.resetToken = "";
        });
        builder.addCase(asyncThunks_1.resetPassword.rejected, (state, action) => {
            state.forgetStatus = "failed";
            state.resetToken = "";
            state.message = action.payload;
        });
    },
});
_a = exports.authSlice.actions, exports.resetAuth = _a.resetAuth, exports.setEdit = _a.setEdit, exports.setForgetStatus = _a.setForgetStatus, exports.setChangeStatus = _a.setChangeStatus, exports.setResetToken = _a.setResetToken;
exports.default = exports.authSlice.reducer;
