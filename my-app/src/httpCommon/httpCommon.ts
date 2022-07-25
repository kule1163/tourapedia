import axios from "axios";

export const httpAuth = axios.create({
  baseURL: "/auth",
  headers: {
    "Content-Type": `application/x-www-form-urlencoded`,
  },
});

export const httpPosts = axios.create({
  baseURL: "/posts",
});

export const httpComment = axios.create({
  baseURL: "/comment",
});

export const httpLike = axios.create({
  baseURL: "/like",
});

export const httpDislike = axios.create({
  baseURL: "/dislike",
});
