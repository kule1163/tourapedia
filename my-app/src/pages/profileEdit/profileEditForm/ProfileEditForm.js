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
const hooks_1 = require("../../../app/hooks");
const fa_1 = require("react-icons/fa");
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const FormValidation_1 = require("./FormValidation");
const NestedInput_1 = __importDefault(require("../../../components/handleFormInput/nestedInput/NestedInput"));
const material_1 = require("@mui/material");
const asyncThunks_1 = require("../../../features/auth/asyncThunks");
const InputError_1 = __importDefault(require("../../../components/handleFormInput/inputError/InputError"));
const ProfileEditForm = ({ submit }) => {
    var _a, _b, _c, _d, _e, _f;
    const dispatch = (0, hooks_1.useAppDispatch)();
    const user = (0, hooks_1.useAppSelector)((state) => state.auth.user);
    const editStatus = (0, hooks_1.useAppSelector)((state) => state.auth.editStatus);
    const methods = (0, react_hook_form_1.useForm)({ resolver: (0, yup_1.yupResolver)(FormValidation_1.schema) });
    const newPhoto = methods.watch("file");
    const onSubmit = (data) => {
        const { file, firstname, lastname } = data;
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("profilePhoto", file[0]);
        dispatch((0, asyncThunks_1.editProfile)(formData));
        if (submit) {
            submit();
        }
        methods.reset();
    };
    (0, react_1.useEffect)(() => {
        if (user) {
            methods.setValue("firstname", user.firstname);
            methods.setValue("lastname", user.lastname);
        }
    }, [user]);
    return (<>
      {user && (<>
          <div className="sign-box">
            {newPhoto && newPhoto.length > 0 ? (<img className="profile-photo" src={URL.createObjectURL(newPhoto[0])}/>) : user.profilePhoto ? (<img className="profile-photo" src={`http://localhost:5000/uploads/profilePhotos/${user.profilePhoto}`}/>) : (<fa_1.FaUserCircle style={{ width: 40, height: 40 }}/>)}
          </div>
          <react_hook_form_1.FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="form">
              <div className="input-box">
                <input data-testid="file" type="file" {...methods.register("file")}/>
                <InputError_1.default errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.message}/>
              </div>
              <div className="half-box">
                <div className="input-box">
                  <NestedInput_1.default label="First Name" name="firstname" type="text" errorMessage={(_d = (_c = methods.formState.errors) === null || _c === void 0 ? void 0 : _c.firstname) === null || _d === void 0 ? void 0 : _d.message}/>
                </div>
                <div className="input-box">
                  <NestedInput_1.default errorMessage={(_f = (_e = methods.formState.errors) === null || _e === void 0 ? void 0 : _e.lastname) === null || _f === void 0 ? void 0 : _f.message} label="Last Name" name="lastname" type="text"/>
                </div>
              </div>
              <material_1.Button variant="contained" type="submit" fullWidth color="primary">
                edit
              </material_1.Button>
            </form>
          </react_hook_form_1.FormProvider>
        </>)}
    </>);
};
exports.default = ProfileEditForm;
