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
const hooks_1 = require("../../../../app/hooks");
const asyncThunks_1 = require("../../../../features/posts/asyncThunks");
const postsSlice_1 = require("../../../../features/posts/postsSlice");
const SinglePost_1 = __importDefault(require("../../../singlePost/SinglePost"));
require("./styles.scss");
const RelatedPosts = () => {
    const post = (0, hooks_1.useAppSelector)((state) => state.posts.singlePost);
    const relatedPosts = (0, hooks_1.useAppSelector)((state) => state.posts.entities);
    const postStatus = (0, hooks_1.useAppSelector)((state) => state.posts.status);
    const dispatch = (0, hooks_1.useAppDispatch)();
    (0, react_1.useEffect)(() => {
        if (post) {
            const formData = new FormData();
            post.tags.forEach((tag) => formData.append("tags[]", tag));
            dispatch((0, asyncThunks_1.getRelatedPosts)({ formData, id: post._id }));
        }
    }, [post]);
    (0, react_1.useEffect)(() => {
        if (postStatus === "succeeded") {
            dispatch((0, postsSlice_1.resetPost)());
        }
    }, [postStatus]);
    return (<div className="related-post-container">
      <div className="header-container">
        <div className="line"></div>
        <material_1.Typography className="header-text">RELATED TOURS</material_1.Typography>
        <div className="line"></div>
      </div>
      <div className="related-post-box">
        {relatedPosts.map((item) => (<SinglePost_1.default key={item._id} post={item}/>))}
      </div>
    </div>);
};
exports.default = RelatedPosts;
