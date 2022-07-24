"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_hook_form_1 = require("react-hook-form");
require("./styles.scss");
const InputError_1 = __importDefault(require("../inputError/InputError"));
const NestedInput = ({ label, name, type, errorMessage }) => {
    const { register } = (0, react_hook_form_1.useFormContext)();
    return (<div className=".nested-input-container">
      <material_1.TextField data-testid={name} size="small" label={label} {...register(name)} variant="outlined" type={type} fullWidth error={errorMessage ? true : false}/>
      {errorMessage && <InputError_1.default errorMessage={errorMessage}/>}
    </div>);
};
exports.default = NestedInput;
