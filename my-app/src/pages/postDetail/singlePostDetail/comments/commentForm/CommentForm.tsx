import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./FormValidation";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { createComment } from "../../../../../features/comment/asyncThunks";
import {
  hideReply,
  setCurrentReply,
} from "../../../../../features/comment/commentSlice";
import "./styles.scss";

export interface Inputs {
  content: string;
}

export interface CommentFormProps {
  commentId?: string;
  submit?: () => void;
}

const CommentForm = ({ commentId, submit }: CommentFormProps) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { content } = data;

    const formData = new FormData();

    if (id) {
      if (commentId) {
        formData.append("comment", content);
        formData.append("postId", id);
        formData.append("responseTo", commentId);

        dispatch(hideReply(commentId));
      } else {
        formData.append("comment", content);
        formData.append("postId", id);
      }

      dispatch(createComment(formData));
    }

    if (submit) {
      submit();
    }
  };

  return (
    <div className="comment-form-container">
      <>
        <img src={user?.profilePhoto.url} />
        <FormProvider {...methods}>
          <form
            className="form-container"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              autoFocus
              variant="standard"
              placeholder="add comment ..."
              type="text"
              {...methods.register("content")}
            />
            <div className="button-container">
              <Button>Cancel</Button>
              <Button
                data-testid="submit"
                onClick={() => !commentId && dispatch(setCurrentReply(null))}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </>
    </div>
  );
};

export default CommentForm;
