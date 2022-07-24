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
const hooks_1 = require("../../../../../../app/hooks");
const commentSlice_1 = require("../../../../../../features/comment/commentSlice");
const SingleComment_1 = __importDefault(require("../singleComment/SingleComment"));
const io_1 = require("react-icons/io");
const io_2 = require("react-icons/io");
require("./styles.scss");
const ReplyComment = ({ comments, parentCommentId, postId, }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const [countChildren, setCountChildren] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        let childComment = 0;
        comments.map((item) => {
            item.responseTo === parentCommentId && childComment++;
        });
        setCountChildren(childComment);
    }, [parentCommentId, comments]);
    return (<div className="reply-comment-container">
      {comments && parentCommentId && (<>
          <>
            {comments.map((item) => item.responseTo === parentCommentId && (<>
                    <>
                      {countChildren > 0 && (<div className="children-box" onClick={() => dispatch((0, commentSlice_1.setChildComments)(parentCommentId))}>
                          <div className="icon-box">
                            {item.childComments ? (<io_2.IoMdArrowDropup />) : (<io_1.IoMdArrowDropdown />)}
                          </div>
                          <material_1.Typography> comments {countChildren}</material_1.Typography>
                        </div>)}
                    </>
                    <div>
                      {item.childComments && (<>
                          <div>
                            <SingleComment_1.default comment={item}/>
                            <ReplyComment comments={comments} postId={postId} parentCommentId={item._id}/>
                          </div>
                        </>)}
                    </div>
                  </>))}
          </>
        </>)}
    </div>);
};
exports.default = (0, react_1.memo)(ReplyComment);
