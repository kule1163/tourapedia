import { GetRelatedPostsProps } from "../features/posts/asyncThunks";
import { httpPosts } from "../httpCommon/httpCommon";

export class PostServices {
  getAllPosts = (page: string) => {
    return httpPosts.get(`?page=${page}`);
  };
  getUserPosts = (token: string, page: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return httpPosts.get(`/by-user?page=${page}`, config);
  };
  getSinglePost = (id: string) => {
    return httpPosts.get(`/post/${id}`);
  };
  createPost = (post: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpPosts.post("/", post, config);
  };
  deletePost = (id: string, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpPosts.delete(`/post/${id}`, config);
  };
  likePost = (token: String, formData: FormData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return httpPosts.put(`/like`, formData, config);
  };
  dislikePost = (token: String, formData: FormData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpPosts.put(`/dislike`, formData, config);
  };
  getPostsByTag = (tag: string) => {
    return httpPosts.get(`/tag/${tag}`);
  };
  getPostByCateg = (categ: string) => {
    return httpPosts.get(`/category/${categ}`);
  };
  getRelatedPosts = ({ formData, id }: GetRelatedPostsProps) => {
    return httpPosts.post(`/related-post/${id}`, formData);
  };
  updatePost = (id: string, formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpPosts.patch(`/post/${id}`, formData, config);
  };
  searchPosts = (query: string, page: string) => {
    return httpPosts.get(`/search?searchQuery=${query}&page=${page}`);
  };
}
