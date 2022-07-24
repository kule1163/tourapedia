"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
require("./styles.scss");
const hooks_1 = require("../../../app/hooks");
const authSlice_1 = require("../../../features/auth/authSlice");
const ForgetPasswordForm_1 = __importDefault(require("./forgetPasswordForm/ForgetPasswordForm"));
const LoginForm_1 = __importDefault(require("./LoginForm/LoginForm"));
const Login = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [formToggle, setFormToggle] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        dispatch((0, authSlice_1.resetAuth)());
    }, []);
    return (<div data-testid="login-form" className="max">
      <div className="log-reg-container">
        <div className="log-reg-box">
          {formToggle ? <ForgetPasswordForm_1.default /> : <LoginForm_1.default />}

          <material_1.Button onClick={() => {
            dispatch((0, authSlice_1.setChangeStatus)("idle"));
            setFormToggle((prev) => !prev);
        }} color="error">
            {formToggle ? "sign in" : "forget password?"}
          </material_1.Button>
        </div>
      </div>
    </div>);
};
exports.default = Login;
