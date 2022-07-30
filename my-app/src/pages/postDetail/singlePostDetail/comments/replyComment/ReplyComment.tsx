import { Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { setChildComments } from "../../../../../features/comment/commentSlice";
import { CommentProps } from "../../../../../features/comment/types";
import SingleComment from "../singleComment/SingleComment";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

import "./styles.scss";

export interface ReplyCommentProps {
  comments: CommentProps[];
  postId?: string;
  parentCommentId?: string;
}

const ReplyComment = ({
  comments,
  parentCommentId,
  postId,
}: ReplyCommentProps) => {
  const dispatch = useAppDispatch();

  const [countChildren, setCountChildren] = useState<number>(0);

  useEffect(() => {
    let childComment = 0;

    comments.map((item) => {
      item.responseTo === parentCommentId && childComment++;
    });

    setCountChildren(childComment);
  }, [parentCommentId, comments]);

  return (
    <div className="reply-comment-container">
      {comments && parentCommentId && (
        <>
          <>
            {comments.map(
              (item) =>
                item.responseTo === parentCommentId && (
                  <>
                    <>
                      {countChildren > 0 && (
                        <div
                          className="children-box"
                          onClick={() =>
                            dispatch(setChildComments(parentCommentId))
                          }
                        >
                          <div className="icon-box">
                            {item.childComments ? (
                              <IoMdArrowDropup />
                            ) : (
                              <IoMdArrowDropdown />
                            )}
                          </div>
                          <Typography> comments {countChildren}</Typography>
                        </div>
                      )}
                    </>
                    <div>
                      {item.childComments && (
                        <>
                          <div>
                            <SingleComment comment={item} />
                            <ReplyComment
                              comments={comments}
                              postId={postId}
                              parentCommentId={item._id}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )
            )}
          </>
        </>
      )}
    </div>
  );
};

export default memo(ReplyComment);
