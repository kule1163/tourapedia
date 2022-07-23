import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CommentServices } from "../../services/commentServices";
import { CommentProps } from "./types";

const commentServices = new CommentServices();

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (comment: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await commentServices.createComment(comment, token);

        return res.data.result[0] as CommentProps;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId: string, thunkAPI) => {
    try {
      const res = await commentServices.getComments(postId);

      return res.data.result as CommentProps[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
