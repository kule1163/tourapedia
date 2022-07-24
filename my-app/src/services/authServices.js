"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const httpCommon_1 = require("../httpCommon/httpCommon");
class AuthServices {
    constructor() {
        this.register = (formData) => {
            return httpCommon_1.httpAuth.post("/", formData);
        };
        this.login = (formData) => {
            return httpCommon_1.httpAuth.post("/login", formData);
        };
        this.edit = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpAuth.patch("/edit", formData, config);
        };
        this.getMe = (token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpAuth.get("/me");
        };
        this.changePassword = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpAuth.patch("/change-password", formData, config);
        };
        this.forgetPassword = (formData) => {
            return httpCommon_1.httpAuth.post("/forget-password", formData);
        };
        this.resetPassword = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpAuth.patch("/reset-password", formData, config);
        };
    }
}
exports.AuthServices = AuthServices;
