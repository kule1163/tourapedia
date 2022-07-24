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
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const material_2 = require("@mui/material");
const hooks_1 = require("../../../../../../app/hooks");
const commentSlice_1 = require("../../../../../../features/comment/commentSlice");
const CommentForm_1 = __importDefault(require("../commentForm/CommentForm"));
const defaultImage_jpg_1 = __importDefault(require("../../../../../../assets/defaultImage.jpg"));
require("./styles.scss");
const HandleLike_1 = __importDefault(require("../../../../../handleLike/HandleLike"));
const Spinner_1 = __importDefault(require("../../../../../spinner/Spinner"));
const SingleComment = ({ comment }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const createStatus = (0, hooks_1.useAppSelector)((state) => state.comment.createStatus);
    const currentReply = (0, hooks_1.useAppSelector)((state) => state.comment.currentReply);
    return (<div onClick={() => dispatch((0, commentSlice_1.setCurrentReply)(comment._id))} className="single-comment-container">
      <img src={comment.writer.profilePhoto
            ? `http://localhost:5000/uploads/profilePhotos/${comment.writer.profilePhoto}`
            : defaultImage_jpg_1.default}/>
      <div className="content-container">
        <div className="box">
          <material_1.Typography className="name">
            {comment.writer.firstname} {comment.writer.lastname}
          </material_1.Typography>
        </div>
        <material_1.Typography>{comment.content}</material_1.Typography>
        <div className="box">
          <material_2.Button onClick={() => {
            dispatch((0, commentSlice_1.setReply)(comment._id));
        }}>
            reply
          </material_2.Button>
          <div className="like-box">
            <HandleLike_1.default commentId={comment._id} item={comment}/>
          </div>
        </div>
        {currentReply === comment._id && createStatus === "pending" && (<div className="spinner-box-2">
            <Spinner_1.default size={30}/>
          </div>)}

        {comment.reply && <CommentForm_1.default commentId={comment._id}/>}
      </div>
    </div>);
};
exports.default = (0, react_1.memo)(SingleComment);
