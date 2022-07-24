"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const ai_1 = require("react-icons/ai");
const fa_1 = require("react-icons/fa");
const NestedInput_1 = __importDefault(require("../../../../components/handleFormInput/nestedInput/NestedInput"));
const react_router_dom_1 = require("react-router-dom");
const yup_1 = require("@hookform/resolvers/yup");
const Formvalidation_1 = require("./Formvalidation");
const hooks_1 = require("../../../../app/hooks");
const asyncThunks_1 = require("../../../../features/auth/asyncThunks");
const Spinner_1 = __importDefault(require("../../../../components/spinner/Spinner"));
const LoginForm = ({ login }) => {
    var _a, _b, _c, _d;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const status = (0, hooks_1.useAppSelector)((state) => state.auth.status);
    const methods = (0, react_hook_form_1.useForm)({ resolver: (0, yup_1.yupResolver)(Formvalidation_1.schema) });
    const message = (0, hooks_1.useAppSelector)((state) => state.auth.message);
    const onSubmit = (data) => {
        const { email, password } = data;
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        if (!email || !password) {
            console.log("please enter all");
        }
        else {
            dispatch((0, asyncThunks_1.authLogin)({ formData, navigate }));
            methods.reset();
        }
        if (login) {
            login();
        }
    };
    return (<>
      <div className="sign-box">
        <fa_1.FaUserCircle />
        <material_1.Typography>Sign In</material_1.Typography>
      </div>
      <react_hook_form_1.FormProvider {...methods}>
        <form data-testid="form" className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="input-box">
            <NestedInput_1.default errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.message} label="Email" type="email" name="email"/>
          </div>
          <div className="input-box">
            <NestedInput_1.default errorMessage={(_d = (_c = methods.formState.errors) === null || _c === void 0 ? void 0 : _c.password) === null || _d === void 0 ? void 0 : _d.message} label="Password" name="password" type="password"/>
          </div>
          {status === "failed" && (<div className="info-box">
              <material_1.Typography>*</material_1.Typography>
              <material_1.Typography>{message}</material_1.Typography>
            </div>)}
          <material_1.Button variant="contained" type="submit" fullWidth color="primary">
            {status === "pending" ? <Spinner_1.default color="red" size={30}/> : "LOGIN"}
          </material_1.Button>
        </form>
      </react_hook_form_1.FormProvider>
      <material_1.Button variant="contained" fullWidth color="error">
        <ai_1.AiOutlineGoogle /> GOOGLE SIGN IN
      </material_1.Button>
      <div className="footer">
        <material_1.Typography onClick={() => navigate("/register")} className="text">
          Don't have an account ? Sign Up
        </material_1.Typography>
      </div>
    </>);
};
exports.default = LoginForm;
