"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeServices = void 0;
const httpCommon_1 = require("../httpCommon/httpCommon");
class LikeServices {
    constructor() {
        this.getLikes = (formData) => {
            return httpCommon_1.httpLike.post("/getLikes", formData);
        };
        this.upLike = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpLike.post("/upLike", formData, config);
        };
        this.unLike = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpLike.post("/unLike", formData, config);
        };
        this.getDislikes = (formData) => {
            return httpCommon_1.httpLike.post("/getDislikes", formData);
        };
        this.upDislike = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpLike.post("/upDislike", formData, config);
        };
        this.unDislike = (formData, token) => {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            return httpCommon_1.httpLike.post("/unDislike", formData, config);
        };
    }
}
exports.LikeServices = LikeServices;
