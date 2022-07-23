import axios from "axios";

export const httpAuth = axios.create({
  baseURL: "http://localhost:5000/auth",
  headers: {
    "Content-Type": `application/x-www-form-urlencoded`,
  },
});

export const httpPosts = axios.create({
  baseURL: "http://localhost:5000/posts",
});

export const httpComment = axios.create({
  baseURL: "http://localhost:5000/comment",
});

export const httpLike = axios.create({
  baseURL: "http://localhost:5000/like",
});

export const httpDislike = axios.create({
  baseURL: "http://localhost:5000/dislike",
});
