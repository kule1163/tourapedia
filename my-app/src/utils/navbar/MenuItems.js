"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItems = exports.byUserMenuItems = void 0;
const uuid_1 = require("uuid");
exports.byUserMenuItems = [
    { id: (0, uuid_1.v4)(), item: "home", url: "/" },
    { id: (0, uuid_1.v4)(), item: "add tour", url: "/add-tour" },
    { id: (0, uuid_1.v4)(), item: "dashboard", url: "/dashboard" },
    { id: (0, uuid_1.v4)(), item: "edit", url: "/edit" },
];
exports.menuItems = [
    { id: (0, uuid_1.v4)(), item: "home", url: "/" },
    { id: (0, uuid_1.v4)(), item: "login", url: "/login" },
    { id: (0, uuid_1.v4)(), item: "register", url: "/register" },
];
