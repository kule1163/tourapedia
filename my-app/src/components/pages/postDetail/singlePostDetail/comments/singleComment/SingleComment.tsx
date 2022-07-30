import { Typography } from "@mui/material";
import React, { memo } from "react";
import { CommentProps } from "../../../../../../features/comment/types";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import {
  setCurrentReply,
  setReply,
} from "../../../../../../features/comment/commentSlice";
import CommentForm from "../commentForm/CommentForm";
import "./styles.scss";
import HandleLike from "../../../../../handleLike/HandleLike";
import Spinner from "../../../../../spinner/Spinner";

interface SingleCommentProps {
  comment: CommentProps;
}

const SingleComment = ({ comment }: SingleCommentProps) => {
  const dispatch = useAppDispatch();
  const createStatus = useAppSelector((state) => state.comment.createStatus);
  const currentReply = useAppSelector((state) => state.comment.currentReply);

  return (
    <div
      onClick={() => dispatch(setCurrentReply(comment._id))}
      className="single-comment-container"
    >
      <img src={comment.writer.profilePhoto.url} />
      <div className="content-container">
        <div className="box">
          <Typography className="name">
            {comment.writer.firstname} {comment.writer.lastname}
          </Typography>
        </div>
        <Typography>{comment.content}</Typography>
        <div className="box">
          <Button
            onClick={() => {
              dispatch(setReply(comment._id));
            }}
          >
            reply
          </Button>
          <div className="like-box">
            <HandleLike commentId={comment._id} item={comment} />
          </div>
        </div>
        {currentReply === comment._id && createStatus === "pending" && (
          <div className="spinner-box-2">
            <Spinner size={30} />
          </div>
        )}

        {comment.reply && <CommentForm commentId={comment._id} />}
      </div>
    </div>
  );
};

export default memo(SingleComment);
