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
              data-testid="like"
              style={{
                pointerEvents: likeStatus === "pending" ? "none" : "auto",
              }}
              onClick={() => handleLike()}
            >
              {item.likes.includes(user._id) ? (
                <div data-testid="fill-like">
                  <AiFillLike cursor="pointer" />
                </div>
              ) : (
                <div data-testid="outline-like">
                  <AiOutlineLike cursor="pointer" />
                </div>
              )}
            </div>
            <div data-testid="like-count">
              <Typography>{item.likes.length}</Typography>
            </div>
          </div>
          <div className="like-box">
            <div
              data-testid="dislike"
              style={{
                pointerEvents: likeStatus === "pending" ? "none" : "auto",
              }}
              onClick={() => handleDislike()}
            >
              {item.dislikes.includes(user._id) ? (
                <div data-testid="fill-dislike">
                  <AiFillDislike cursor="pointer" />
                </div>
              ) : (
                <div data-testid="outline-dislike">
                  <AiOutlineDislike cursor="pointer" />
                </div>
              )}
            </div>
            <div data-testid="dislike-count">
              <Typography>{item.dislikes.length}</Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HandleLike;
