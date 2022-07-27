"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.handleSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserAuth",
    },
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CommentModel",
    },
}, {
    timestamps: true,
});
