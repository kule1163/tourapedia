"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const yup_1 = require("@hookform/resolvers/yup");
const react_hook_form_1 = require("react-hook-form");
const hooks_1 = require("../../../app/hooks");
const react_router_dom_1 = require("react-router-dom");
const asyncThunks_1 = require("../../../features/posts/asyncThunks");
const NestedInput_1 = __importDefault(require("../../../components/handleFormInput/nestedInput/NestedInput"));
const material_1 = require("@mui/material");
const categories_1 = require("../../../utils/pages/filteredPost/categories");
const material_2 = require("@mui/material");
const FormValidation_1 = require("./FormValidation");
const InputError_1 = __importDefault(require("../../../components/handleFormInput/inputError/InputError"));
const AddTourForm = ({ addPost, currentPost, editPost }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    console.log(currentPost);
    const methods = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(FormValidation_1.schema),
    });
    const onSubmit = (data) => {
        const { category, description, file, tags, title } = data;
        const formData = new FormData();
        formData.append("category", category);
        formData.append("description", description);
        formData.append("title", title);
        formData.append("postImage", file[0]);
        tags.split(",").forEach((tag) => formData.append("tags[]", tag));
        if (currentPost) {
            dispatch((0, asyncThunks_1.updatePost)({ formData, id: currentPost._id, navigate }));
            methods.reset();
            if (editPost) {
                editPost();
            }
        }
        else {
            dispatch((0, asyncThunks_1.createPost)({ formData, navigate }));
            methods.reset();
            if (addPost) {
                addPost();
            }
        }
    };
    return (<div className="log-reg-container">
      <div className="log-reg-box">
        <div className="sign-box">
          <material_2.Typography>{currentPost ? "Update Tour" : "Add Tour"}</material_2.Typography>
        </div>
        <react_hook_form_1.FormProvider {...methods}>
          <form method="POST" encType="multipart/form-data" data-testid="form" className="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="input-box">
              <NestedInput_1.default errorMessage={(_b = (_a = methods.formState.errors) === null || _a === void 0 ? void 0 : _a.title) === null || _b === void 0 ? void 0 : _b.message} label="Enter Title" type="text" name="title"/>
            </div>
            <div className="input-box">
              <NestedInput_1.default errorMessage={(_d = (_c = methods.formState.errors) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.message} label="Enter Tags" type="text" name="tags"/>
            </div>
            <div className="input-box">
              <react_hook_form_1.Controller control={methods.control} name="category" defaultValue="" render={({ field: { onChange, onBlur, value, ref } }) => (<material_2.FormControl>
                    <material_1.InputLabel id="demo-select-small">Category</material_1.InputLabel>
                    <material_1.Select data-testid="category" labelId="demo-select-small" id="demo-select-small" value={value} label="category" onChange={onChange}>
                      {categories_1.categories.map((item) => (<material_1.MenuItem key={item.id} value={item.value}>
                          <material_2.Typography>{item.label}</material_2.Typography>
                        </material_1.MenuItem>))}
                    </material_1.Select>
                  </material_2.FormControl>)}/>
              <InputError_1.default errorMessage={(_f = (_e = methods.formState.errors) === null || _e === void 0 ? void 0 : _e.category) === null || _f === void 0 ? void 0 : _f.message}/>
            </div>
            <div className="input-box">
              <material_2.TextareaAutosize data-testid="description" className="text-area" placeholder="Enter Description" minRows={5} {...methods.register("description")}/>
              <InputError_1.default errorMessage={(_h = (_g = methods.formState.errors) === null || _g === void 0 ? void 0 : _g.description) === null || _h === void 0 ? void 0 : _h.message}/>
            </div>
            <div className="input-box">
              <input data-testid="file" type="file" {...methods.register("file")}/>
              <InputError_1.default errorMessage={(_k = (_j = methods.formState.errors) === null || _j === void 0 ? void 0 : _j.file) === null || _k === void 0 ? void 0 : _k.message}/>
            </div>
            <material_2.Button variant="contained" type="submit" fullWidth color="primary">
              {currentPost ? "Update Tour" : "Add Tour"}
            </material_2.Button>
          </form>
        </react_hook_form_1.FormProvider>
      </div>
    </div>);
};
exports.default = AddTourForm;
