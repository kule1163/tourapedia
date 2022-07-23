import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { LikeServices } from "../../services/likeSevices";
import { LikeDataProps, LikeProps } from "./types";

const likeServices = new LikeServices();

export const upDislike = createAsyncThunk(
  "dislike/upDislike",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await likeServices.upDislike(formData, token);

        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const unDislike = createAsyncThunk(
  "dislike/unDislike",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await likeServices.unDislike(formData, token);

        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDislikes = createAsyncThunk(
  "dislike/getDislikes",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await likeServices.getDislikes(formData);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const upLike = createAsyncThunk(
  "like/upLike",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await likeServices.upLike(formData, token);

        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const unLike = createAsyncThunk(
  "like/unLike",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await likeServices.unLike(formData, token);

        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getLikes = createAsyncThunk(
  "like/getLikes",
  async (formData: FormData, thunkAPI) => {
    try {
      const res = await likeServices.getLikes(formData);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
