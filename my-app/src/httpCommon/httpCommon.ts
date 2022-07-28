import axios from "axios";

export const httpAuth = axios.create({
  baseURL: "/auth",
  headers: { "Content-Type": "multipart/form-data" },
});

export const httpPosts = axios.create({
  baseURL: "/posts",
  headers: { "Content-Type": "multipart/form-data" },
});

export const httpComment = axios.create({
  baseURL: "/comment",
  headers: { "Content-Type": "multipart/form-data" },
});

export const httpLike = axios.create({
  baseURL: "/like",
  headers: { "Content-Type": "multipart/form-data" },
});

export const httpDislike = axios.create({
  baseURL: "/dislike",
  headers: { "Content-Type": "multipart/form-data" },
});
