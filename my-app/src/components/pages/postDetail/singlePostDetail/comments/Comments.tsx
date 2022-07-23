import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getComments } from "../../../../../features/comment/asyncThunks";
import { useParams } from "react-router-dom";
import SingleComment from "./singleComment/SingleComment";
import ReplyComment from "./replyComment/ReplyComment";
import CommentForm from "./commentForm/CommentForm";
import "./styles.scss";
import Spinner from "../../../../spinner/Spinner";

export interface Inputs {
  content: string;
}

const Comments = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comment.entities);
  const status = useAppSelector((state) => state.comment.status);
  const createStatus = useAppSelector((state) => state.comment.createStatus);
  const currentReply = useAppSelector((state) => state.comment.currentReply);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getComments(id));
    }
  }, [id]);

  return (
    <div className="comments-container">
      <div
        style={{
          display:
            currentReply === null && createStatus === "pending"
              ? "none"
              : "block",
        }}
      >
        <CommentForm />
      </div>
      {currentReply === null && createStatus === "pending" && (
        <div className="spinner-box-2">
          <Spinner size={30} />
        </div>
      )}
      {status === "succeeded" && (
        <>
          <div>
            {comments &&
              id &&
              comments.map(
                (item) =>
                  !item.responseTo && (
                    <>
                      <div>
                        <SingleComment comment={item} />
                        <div style={{ paddingLeft: 60 }}>
                          <ReplyComment
                            comments={comments}
                            postId={id}
                            parentCommentId={item._id}
                          />
                        </div>
                      </div>
                    </>
                  )
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Comments);
