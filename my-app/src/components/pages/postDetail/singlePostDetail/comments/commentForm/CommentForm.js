"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const yup_1 = require("@hookform/resolvers/yup");
const FormValidation_1 = require("./FormValidation");
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../../../../../../app/hooks");
const asyncThunks_1 = require("../../../../../../features/comment/asyncThunks");
const commentSlice_1 = require("../../../../../../features/comment/commentSlice");
require("./styles.scss");
const defaultImage_jpg_1 = __importDefault(require("../../../../../../assets/defaultImage.jpg"));
const CommentForm = ({ commentId, submit }) => {
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const user = (0, hooks_1.useAppSelector)((state) => state.auth.user);
    console.log(user);
    const methods = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(FormValidation_1.schema),
    });
    const onSubmit = (data) => {
        const { content } = data;
        const formData = new FormData();
        if (id) {
            if (commentId) {
                formData.append("comment", content);
                formData.append("postId", id);
                formData.append("responseTo", commentId);
                dispatch((0, commentSlice_1.hideReply)(commentId));
            }
            else {
                formData.append("comment", content);
                formData.append("postId", id);
            }
            dispatch((0, asyncThunks_1.createComment)(formData));
        }
        if (submit) {
            submit();
        }
    };
    return (<div className="comment-form-container">
      <>
        <img src={(user === null || user === void 0 ? void 0 : user.profilePhoto)
            ? `http://localhost:5000/uploads/profilePhotos/${user === null || user === void 0 ? void 0 : user.profilePhoto}`
            : defaultImage_jpg_1.default}/>
        <react_hook_form_1.FormProvider {...methods}>
          <form className="form-container" onSubmit={methods.handleSubmit(onSubmit)}>
            <material_1.TextField fullWidth autoFocus variant="standard" placeholder="add comment ..." type="text" {...methods.register("content")}/>
            <div className="button-container">
              <material_1.Button>Cancel</material_1.Button>
              <material_1.Button data-testid="submit" onClick={() => !commentId && dispatch((0, commentSlice_1.setCurrentReply)(null))} type="submit">
                Submit
              </material_1.Button>
            </div>
          </form>
        </react_hook_form_1.FormProvider>
      </>
    </div>);
};
exports.default = CommentForm;
