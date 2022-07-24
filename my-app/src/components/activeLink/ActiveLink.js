"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const ActiveLink = (_a) => {
    var { children, to } = _a, props = __rest(_a, ["children", "to"]);
    let resolved = (0, react_router_dom_1.useResolvedPath)(to);
    let match = (0, react_router_dom_1.useMatch)({ path: resolved.pathname, end: true });
    return (<div>
      <react_router_dom_1.Link style={{ textDecoration: "none", color: match ? "#f44336" : "white" }} to={to} {...props}>
        {children}
      </react_router_dom_1.Link>
      {/* {match && " (active)"} */}
    </div>);
};
exports.default = ActiveLink;
