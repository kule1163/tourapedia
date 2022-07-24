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
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const fa_1 = require("react-icons/fa");
require("./styles.scss");
const NestedInput_1 = __importDefault(require("../../../components/handleFormInput/nestedInput/NestedInput"));
const react_router_dom_1 = require("react-router-dom");
const yup_1 = require("@hookform/resolvers/yup");
const FormValidation_1 = require("./FormValidation");
const hooks_1 = require("../../../app/hooks");
const asyncThunks_1 = require("../../../features/auth/asyncThunks");
const Spinner_1 = __importDefault(require("../../../components/spinner/Spinner"));
const authSlice_1 = require("../../../features/auth/authSlice");
const Register = ({ login }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const status = (0, hooks_1.useAppSelector)((state) => state.auth.status);
    const methods = (0, react_hook_form_1.useForm)({ resolver: (0, yup_1.yupResolver)(FormValidation_1.schema) });
    const message = (0, hooks_1.useAppSelector)((state) => state.auth.message);
    const profilePhoto = methods.watch("file");
    (0, react_1.useEffect)(() => {
        dispatch((0, authSlice_1.resetAuth)());
    }, []);
    const onSubmit = (data) => {
        const { firstname, lastname, email, password, password2, file } = data;
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePhoto", file[0]);
        if (password !== password2) {
            console.log("password doesnt match");
        }
        else {
            dispatch((0, asyncThunks_1.register)({ formData, navigate }));
            methods.reset();
        }
        if (login) {
            login();
        }
    };
    return (<div className="max">
      <div className="log-reg-container">
        <div className="log-reg-box">
          <div className="sign-box">
            {profilePhoto && profilePhoto.length > 0 ? (<img className="profile-photo" src={URL.createObjectURL(profilePhoto[0])}/>) : (<fa_1.FaUserCircle style={{ width: 40, height: 40 }}/>)}
            <material_1.Typography>Sign Up</material_1.Typography>
          </div>
          <react_hook_form_1.FormProvider {...methods}>
            <form data-testid="form" className="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="input-box">
                <input type="file" {...methods.register("file")}/>
              </div>
              <div className="half-box">
                <div className="input-box">
                  <NestedInput_1.default label="First Name" name="firstname" type="text" errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.firstname) === null || _b === void 0 ? void 0 : _b.message}/>
                </div>
                <div className="input-box">
                  <NestedInput_1.default label="Last Name" name="lastname" type="text" errorMessage={(_d = (_c = methods.formState.errors) === null || _c === void 0 ? void 0 : _c.lastname) === null || _d === void 0 ? void 0 : _d.message}/>
                </div>
              </div>
              <div className="input-box">
                <NestedInput_1.default label="Email" name="email" type="text" errorMessage={(_f = (_e = methods.formState.errors) === null || _e === void 0 ? void 0 : _e.email) === null || _f === void 0 ? void 0 : _f.message}/>
              </div>
              <div className="input-box">
                <NestedInput_1.default label="Password" name="password" type="password" errorMessage={(_h = (_g = methods.formState.errors) === null || _g === void 0 ? void 0 : _g.password) === null || _h === void 0 ? void 0 : _h.message}/>
              </div>
              <div className="input-box">
                <NestedInput_1.default label="Password Confirm" name="password2" type="password" errorMessage={(_k = (_j = methods.formState.errors) === null || _j === void 0 ? void 0 : _j.password2) === null || _k === void 0 ? void 0 : _k.message}/>
              </div>

              <material_1.Button variant="contained" type="submit" fullWidth color="primary">
                {status === "pending" ? (<Spinner_1.default color="red" size={30}/>) : ("register")}
              </material_1.Button>
              {status === "failed" && (<div className="info-box">
                  <material_1.Typography>*</material_1.Typography>
                  <material_1.Typography>{message}</material_1.Typography>
                </div>)}
            </form>
          </react_hook_form_1.FormProvider>
          <div className="footer">
            <material_1.Typography onClick={() => navigate("/login")} className="text">
              Already have an account ? Sign In
            </material_1.Typography>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = Register;
