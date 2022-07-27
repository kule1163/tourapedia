import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../app/store";
import { PostServices } from "../../services/postServices";
import { EntitieProps, HandleLike, PaginateTourProps } from "./types";

const postServices = new PostServices();

export interface GetAllPosts {
  page: string;
  navigate: NavigateFunction;
}

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async ({ page, navigate }: GetAllPosts, thunkAPI) => {
    try {
      const res = await postServices.getAllPosts(page);

      /* navigate(`/?page=${page}`); */

      return res.data as PaginateTourProps;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (page: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await postServices.getUserPosts(token, page);

        return res.data as PaginateTourProps;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (id: string, thunkAPI) => {
    try {
      const res = await postServices.getSinglePost(id);

      return res.data as EntitieProps;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface CreatePostProps {
  formData: FormData;
  navigate: NavigateFunction;
}

export const createPost = createAsyncThunk<
  any,
  CreatePostProps,
  { state: RootState }
>("posts/createPost", async ({ formData, navigate }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;

    if (token) {
      const res = await postServices.createPost(formData, token);

      navigate("/");

      return res.data as EntitieProps;
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        await postServices.deletePost(id, token);

        window.location.reload();

        return id;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await postServices.likePost(token, formData);

        return res.data as HandleLike;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (formData: FormData, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await postServices.dislikePost(token, formData);

        return res.data as HandleLike;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface GetRelatedPostsProps {
  formData: FormData;
  id: string;
}

export const getRelatedPosts = createAsyncThunk(
  "posts/getRelatedPosts",
  async ({ formData, id }: GetRelatedPostsProps, thunkAPI) => {
    try {
      const res = await postServices.getRelatedPosts({ formData, id });

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPostsByTag = createAsyncThunk(
  "posts/getPostsBytag",
  async (tag: string, thunkAPI) => {
    try {
      const res = await postServices.getPostsByTag(tag);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getPostByCateg = createAsyncThunk(
  "posts/getPostByCateg",
  async (categ: string, thunkAPI) => {
    try {
      const res = await postServices.getPostByCateg(categ);

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface UpdatePostProps {
  formData: FormData;
  id: string;
  navigate: NavigateFunction;
}

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ formData, id, navigate }: UpdatePostProps, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.user?.token;

      if (token) {
        const res = await postServices.updatePost(id, formData, token);

        navigate("/");

        return res.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface SearchPostProps {
  searchQuery: string;
  page: string;
  navigate: NavigateFunction;
  searchValue: string;
}

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (
    { searchQuery, page, navigate, searchValue }: SearchPostProps,
    thunkAPI
  ) => {
    try {
      const res = await postServices.searchPosts(searchQuery, page);

      navigate(`/search?searchQuery=${searchValue}&page=${page}`);

      return res.data as PaginateTourProps;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
