import { httpComment } from "../httpCommon/httpCommon";

export class CommentServices {
  createComment = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpComment.post("/add-comment", formData, config);
  };

  getComments = (postId: String) => {
    return httpComment.get(`/${postId}`);
  };

  getReplies = (formData: FormData) => {
    return httpComment.post("/get-replies", formData);
  };
}
