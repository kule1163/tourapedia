"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("@hookform/resolvers/yup");
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const FormValidation_1 = require("./FormValidation");
const NestedInput_1 = __importDefault(require("../../components/handleFormInput/nestedInput/NestedInput"));
const material_1 = require("@mui/material");
const hooks_1 = require("../../app/hooks");
const asyncThunks_1 = require("../../features/auth/asyncThunks");
const react_router_dom_1 = require("react-router-dom");
const Spinner_1 = __importDefault(require("../../components/spinner/Spinner"));
const ResetPassword = ({ submit }) => {
    var _a, _b, _c, _d;
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { resetToken } = (0, react_router_dom_1.useParams)();
    const user = (0, hooks_1.useAppSelector)((state) => state.auth.user);
    const forgetStatus = (0, hooks_1.useAppSelector)((state) => state.auth.forgetStatus);
    const methods = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(FormValidation_1.schema),
    });
    const onSubmit = (data) => {
        const { newPassword, newPassword2 } = data;
        const formData = new FormData();
        formData.append("newPassword", newPassword);
        if (newPassword === newPassword2 && resetToken) {
            dispatch((0, asyncThunks_1.resetPassword)({ formData, navigate, resetToken }));
            methods.reset();
            if (submit) {
                submit();
            }
        }
    };
    return (<>
      <div className="max">
        <div className="log-reg-container">
          <div className="log-reg-box">
            <react_hook_form_1.FormProvider {...methods}>
              <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="input-box">
                  <NestedInput_1.default label="New Password" name="newPassword" type="password" errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.newPassword) === null || _b === void 0 ? void 0 : _b.message}/>
                </div>
                <div className="input-box">
                  <NestedInput_1.default label="Confirm Password" name="newPassword2" type="password" errorMessage={(_d = (_c = methods.formState.errors) === null || _c === void 0 ? void 0 : _c.newPassword2) === null || _d === void 0 ? void 0 : _d.message}/>
                </div>
                <material_1.Button type="submit" variant="contained" color="primary" fullWidth>
                  {forgetStatus === "pending" ? (<Spinner_1.default color="red" size={30}/>) : ("submit")}
                </material_1.Button>
              </form>
            </react_hook_form_1.FormProvider>
          </div>
        </div>
      </div>
    </>);
};
exports.default = ResetPassword;
