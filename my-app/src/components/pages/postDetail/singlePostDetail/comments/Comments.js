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
const hooks_1 = require("../../../../../app/hooks");
const asyncThunks_1 = require("../../../../../features/comment/asyncThunks");
const react_router_dom_1 = require("react-router-dom");
const SingleComment_1 = __importDefault(require("./singleComment/SingleComment"));
const ReplyComment_1 = __importDefault(require("./replyComment/ReplyComment"));
const CommentForm_1 = __importDefault(require("./commentForm/CommentForm"));
require("./styles.scss");
const Spinner_1 = __importDefault(require("../../../../spinner/Spinner"));
const Comments = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const comments = (0, hooks_1.useAppSelector)((state) => state.comment.entities);
    const status = (0, hooks_1.useAppSelector)((state) => state.comment.status);
    const createStatus = (0, hooks_1.useAppSelector)((state) => state.comment.createStatus);
    const currentReply = (0, hooks_1.useAppSelector)((state) => state.comment.currentReply);
    const { id } = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(() => {
        if (id) {
            dispatch((0, asyncThunks_1.getComments)(id));
        }
    }, [id]);
    return (<div className="comments-container">
      <div style={{
            display: currentReply === null && createStatus === "pending"
                ? "none"
                : "block",
        }}>
        <CommentForm_1.default />
      </div>
      {currentReply === null && createStatus === "pending" && (<div className="spinner-box-2">
          <Spinner_1.default size={30}/>
        </div>)}
      {status === "succeeded" && (<>
          <div>
            {comments &&
                id &&
                comments.map((item) => !item.responseTo && (<>
                      <div>
                        <SingleComment_1.default comment={item}/>
                        <div style={{ paddingLeft: 60 }}>
                          <ReplyComment_1.default comments={comments} postId={id} parentCommentId={item._id}/>
                        </div>
                      </div>
                    </>))}
          </div>
        </>)}
    </div>);
};
exports.default = (0, react_1.memo)(Comments);
