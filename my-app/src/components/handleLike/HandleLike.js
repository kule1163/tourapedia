"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../app/hooks");
const material_1 = require("@mui/material");
const ai_1 = require("react-icons/ai");
const ai_2 = require("react-icons/ai");
const ai_3 = require("react-icons/ai");
const ai_4 = require("react-icons/ai");
const asyncThunks_1 = require("../../features/like/asyncThunks");
require("./styles.scss");
const HandleLike = ({ item, commentId, postId, }) => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const user = (0, hooks_1.useAppSelector)((state) => state.auth.user);
    const likeStatus = (0, hooks_1.useAppSelector)((state) => state.posts.likeStatus);
    const handleLike = () => {
        const formData = new FormData();
        if (postId)
            formData.append("postId", postId);
        if (commentId)
            formData.append("commentId", commentId);
        if (user) {
            if (item.likes.includes(user._id)) {
                dispatch((0, asyncThunks_1.unLike)(formData));
            }
            else {
                dispatch((0, asyncThunks_1.upLike)(formData));
            }
        }
    };
    const handleDislike = () => {
        const formData = new FormData();
        if (postId)
            formData.append("postId", postId);
        if (commentId)
            formData.append("commentId", commentId);
        if (user) {
            if (item.dislikes.includes(user._id)) {
                dispatch((0, asyncThunks_1.unDislike)(formData));
            }
            else {
                dispatch((0, asyncThunks_1.upDislike)(formData));
            }
        }
    };
    return (<>
      {user && (<div className="like-container">
          <div className="like-box">
            <div data-testId="like" style={{
                pointerEvents: likeStatus === "pending" ? "none" : "auto",
            }} onClick={() => handleLike()}>
              {item.likes.includes(user._id) ? (<div data-testId="fill-like">
                  <ai_1.AiFillLike cursor="pointer"/>
                </div>) : (<div data-testId="outline-like">
                  <ai_2.AiOutlineLike cursor="pointer"/>
                </div>)}
            </div>
            <material_1.Typography data-testId="like-count">
              {item.likes.length}
            </material_1.Typography>
          </div>
          <div className="like-box">
            <div data-testId="dislike" style={{
                pointerEvents: likeStatus === "pending" ? "none" : "auto",
            }} onClick={() => handleDislike()}>
              {item.dislikes.includes(user._id) ? (<div data-testId="fill-dislike">
                  <ai_3.AiFillDislike cursor="pointer"/>
                </div>) : (<div data-testId="outline-dislike">
                  <ai_4.AiOutlineDislike cursor="pointer"/>
                </div>)}
            </div>
            <material_1.Typography data-testId="dislike-count">
              {item.dislikes.length}
            </material_1.Typography>
          </div>
        </div>)}
    </>);
};
exports.default = HandleLike;
