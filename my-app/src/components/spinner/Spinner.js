"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ClipLoader_1 = __importDefault(require("react-spinners/ClipLoader"));
const Spinner = ({ color, size }) => {
    return (<ClipLoader_1.default data-testid="spinner" color={color ? color : "blue"} size={size ? size : 150}/>);
};
exports.default = Spinner;
