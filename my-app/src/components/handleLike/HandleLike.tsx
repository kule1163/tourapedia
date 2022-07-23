import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Typography } from "@mui/material";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import {
  unDislike,
  unLike,
  upDislike,
  upLike,
} from "../../features/like/asyncThunks";
import "./styles.scss";

interface GenericProps {
  _id: string;
  likes: string[];
  dislikes: string[];
}

interface HandleLikeProps<T> {
  item: T;
  postId?: string;
  commentId?: string;
}

const HandleLike = <T extends GenericProps>({
  item,
  commentId,
  postId,
}: HandleLikeProps<T>) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const likeStatus = useAppSelector((state) => state.posts.likeStatus);

  const handleLike = () => {
    const formData = new FormData();

    if (postId) formData.append("postId", postId);
    if (commentId) formData.append("commentId", commentId);

    if (user) {
      if (item.likes.includes(user._id)) {
        dispatch(unLike(formData));
      } else {
        dispatch(upLike(formData));
      }
    }
  };

  const handleDislike = () => {
    const formData = new FormData();

    if (postId) formData.append("postId", postId);
    if (commentId) formData.append("commentId", commentId);

    if (user) {
      if (item.dislikes.includes(user._id)) {
        dispatch(unDislike(formData));
      } else {
        dispatch(upDislike(formData));
      }
    }
  };

  return (
    <>
      {user && (
        <div className="like-container">
          <div className="like-box">
            <div
              data-testId="like"
              style={{
                pointerEvents: likeStatus === "pending" ? "none" : "auto",
              }}
              onClick={() => handleLike()}
            >
              {item.likes.includes(user._id) ? (
                <div data-testId="fill-like">
                  <AiFillLike cursor="pointer" />
                </div>
              ) : (
                <div data-testId="outline-like">
                  <AiOutlineLike cursor="pointer" />
                </div>
              )}
            </div>
            <Typography data-testId="like-count">
              {item.likes.length}
            </Typography>
          </div>
          <div className="like-box">
            <div
              data-testId="dislike"
              style={{
                pointerEvents: likeStatus === "pending" ? "none" : "auto",
              }}
              onClick={() => handleDislike()}
            >
              {item.dislikes.includes(user._id) ? (
                <div data-testId="fill-dislike">
                  <AiFillDislike cursor="pointer" />
                </div>
              ) : (
                <div data-testId="outline-dislike">
                  <AiOutlineDislike cursor="pointer" />
                </div>
              )}
            </div>
            <Typography data-testId="dislike-count">
              {item.dislikes.length}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default HandleLike;
