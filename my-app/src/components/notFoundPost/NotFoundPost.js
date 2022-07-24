"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./styles.scss");
const NotFoundPost = ({ text }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="notfoundpost-container">
      <material_1.Typography className="text">{text}</material_1.Typography>
      <material_1.Button onClick={() => navigate(-1)} color="primary">
        go back
      </material_1.Button>
    </div>);
};
exports.default = NotFoundPost;
