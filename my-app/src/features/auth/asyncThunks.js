"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.resetPassword = exports.forgetPassword = exports.changePassword = exports.logout = exports.authLogin = exports.editProfile = exports.register = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authServices_1 = require("../../services/authServices");
const authServices = new authServices_1.AuthServices();
exports.register = (0, toolkit_1.createAsyncThunk)("auth/register", ({ formData, navigate }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield authServices.register(formData);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.editProfile = (0, toolkit_1.createAsyncThunk)("auth/edit", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = thunkAPI.getState().auth.user) === null || _a === void 0 ? void 0 : _a.token;
        if (token) {
            const res = yield authServices.edit(formData, token);
            return res.data;
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.authLogin = (0, toolkit_1.createAsyncThunk)("auth/login", ({ formData, navigate }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield authServices.login(formData);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        return res.data;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.logout = (0, toolkit_1.createAsyncThunk)("auth/logout", (navigate, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        localStorage.removeItem("user");
        navigate("/login");
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
}));
exports.changePassword = (0, toolkit_1.createAsyncThunk)("auth/changePassword", ({ formData, navigate }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = thunkAPI.getState().auth.user) === null || _b === void 0 ? void 0 : _b.token;
        if (token) {
            const res = yield authServices.changePassword(formData, token);
            navigate("/");
            return res.data;
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.forgetPassword = (0, toolkit_1.createAsyncThunk)("auth/forgetPassword", (formData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield authServices.forgetPassword(formData);
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}));
exports.resetPassword = (0, toolkit_1.createAsyncThunk)("auth/resetPassword", ({ formData, navigate, resetToken }, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* const token = (thunkAPI.getState() as RootState).auth.resetToken; */
        const res = yield authServices.resetPassword(formData, resetToken);
        navigate("/");
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}));
exports.getMe = (0, toolkit_1.createAsyncThunk)("auth/getMe", (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const token = (_c = thunkAPI.getState().auth.user) === null || _c === void 0 ? void 0 : _c.token;
        if (token) {
            const res = yield authServices.getMe(token);
            return res.data;
        }
    }
    catch (error) { }
}));
