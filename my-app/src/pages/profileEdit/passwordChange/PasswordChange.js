"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("@hookform/resolvers/yup");
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const hooks_1 = require("../../../app/hooks");
const NestedInput_1 = __importDefault(require("../../../components/handleFormInput/nestedInput/NestedInput"));
const asyncThunks_1 = require("../../../features/auth/asyncThunks");
const FormValidation_1 = require("./FormValidation");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const PasswordChange = ({ submit }) => {
    var _a, _b, _c, _d, _e, _f;
    const dispatch = (0, hooks_1.useAppDispatch)();
    const changeStatus = (0, hooks_1.useAppSelector)((state) => state.auth.changeStatus);
    const methods = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(FormValidation_1.schema),
    });
    const navigate = (0, react_router_dom_1.useNavigate)();
    const onSubmit = (data) => {
        const { newPassword, newPassword2, oldPassword } = data;
        const formData = new FormData();
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        if (newPassword === newPassword2) {
            dispatch((0, asyncThunks_1.changePassword)({ formData, navigate }));
            methods.reset();
            if (submit) {
                submit();
            }
        }
    };
    return (<react_hook_form_1.FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="input-box">
          <NestedInput_1.default label="Old Password" name="oldPassword" type="password" errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.oldPassword) === null || _b === void 0 ? void 0 : _b.message}/>
        </div>
        <div className="input-box">
          <NestedInput_1.default label="New Password" name="newPassword" type="password" errorMessage={(_d = (_c = methods.formState.errors) === null || _c === void 0 ? void 0 : _c.newPassword) === null || _d === void 0 ? void 0 : _d.message}/>
        </div>
        <div className="input-box">
          <NestedInput_1.default label="Confirm Password" name="newPassword2" type="password" errorMessage={(_f = (_e = methods.formState.errors) === null || _e === void 0 ? void 0 : _e.newPassword2) === null || _f === void 0 ? void 0 : _f.message}/>
        </div>
        <material_1.Button type="submit" variant="contained" color="primary" fullWidth>
          change password
        </material_1.Button>
      </form>
    </react_hook_form_1.FormProvider>);
};
exports.default = PasswordChange;
