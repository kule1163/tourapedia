"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const InputError = ({ errorMessage }) => {
    return (<>
      {errorMessage && (<material_1.Typography className="error-text">
          <span className="dash">*</span>
          {errorMessage}
        </material_1.Typography>)}
    </>);
};
exports.default = InputError;
