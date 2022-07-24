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
const yup_1 = require("@hookform/resolvers/yup");
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const FormValidation_1 = require("./FormValidation");
const NestedInput_1 = __importDefault(require("../../../../components/handleFormInput/nestedInput/NestedInput"));
const material_1 = require("@mui/material");
const asyncThunks_1 = require("../../../../features/auth/asyncThunks");
const hooks_1 = require("../../../../app/hooks");
const authSlice_1 = require("../../../../features/auth/authSlice");
require("./styles.scss");
const Spinner_1 = __importDefault(require("../../../../components/spinner/Spinner"));
const ForgetPasswordForm = ({ submit }) => {
    var _a, _b;
    const dispatch = (0, hooks_1.useAppDispatch)();
    const forgetStatus = (0, hooks_1.useAppSelector)((state) => state.auth.forgetStatus);
    const methods = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(FormValidation_1.schema),
    });
    const onSubmit = (data) => {
        const { email } = data;
        const formData = new FormData();
        formData.append("email", email);
        if (email) {
            dispatch((0, asyncThunks_1.forgetPassword)(formData));
            methods.reset();
            if (submit) {
                submit();
            }
        }
    };
    (0, react_1.useEffect)(() => {
        dispatch((0, authSlice_1.setForgetStatus)("idle"));
    }, []);
    return (<>
      {forgetStatus === "succeeded" ? (<div className="forget-password-form-container">
          <div className="info-box">
            <material_1.Typography className="text">
              Please check your email. We send a reset link to reset your
              password
            </material_1.Typography>
          </div>
        </div>) : (<react_hook_form_1.FormProvider {...methods}>
          <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="input-box">
              <NestedInput_1.default label="Email" name="email" type="text" errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.message}/>
            </div>

            <material_1.Button type="submit" variant="contained" color="primary" fullWidth>
              {forgetStatus === "pending" ? (<Spinner_1.default color="red" size={30}/>) : ("submit")}
            </material_1.Button>
          </form>
        </react_hook_form_1.FormProvider>)}
    </>);
};
exports.default = ForgetPasswordForm;
