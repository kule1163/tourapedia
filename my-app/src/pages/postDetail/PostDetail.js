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
require("./styles.scss");
const SinglePostDetail_1 = __importDefault(require("../../components/pages/postDetail/singlePostDetail/SinglePostDetail"));
const RelatedPosts_1 = __importDefault(require("../../components/pages/postDetail/relatedPosts/RelatedPosts"));
const hooks_1 = require("../../app/hooks");
const asyncThunks_1 = require("../../features/posts/asyncThunks");
const react_router_dom_1 = require("react-router-dom");
const Comments_1 = __importDefault(require("../../components/pages/postDetail/singlePostDetail/comments/Comments"));
const NotFoundPost_1 = __importDefault(require("../../components/notFoundPost/NotFoundPost"));
const Spinner_1 = __importDefault(require("../../components/spinner/Spinner"));
const PostDetail = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const post = (0, hooks_1.useAppSelector)((state) => state.posts.singlePost);
    const singlePostStatus = (0, hooks_1.useAppSelector)((state) => state.posts.singlePostStatus);
    (0, react_1.useEffect)(() => {
        if (id) {
            dispatch((0, asyncThunks_1.getSinglePost)(id));
        }
    }, [id]);
    return (<div style={{ minHeight: "100vh", position: "relative" }}>
      {singlePostStatus === "pending" && (<div className="spinner-box">
          <Spinner_1.default />
        </div>)}
      {singlePostStatus === "succeeded" && (<div key={post._id} className="post-detail-container">
          <div className="post-detail-box">
            <SinglePostDetail_1.default post={post}/>
            <RelatedPosts_1.default />
          </div>

          <Comments_1.default />
        </div>)}
      {singlePostStatus === "failed" && (<div style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
            }}>
          <NotFoundPost_1.default text="no post find"/>
        </div>)}
    </div>);
};
exports.default = PostDetail;
