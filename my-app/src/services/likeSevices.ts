import { httpLike } from "../httpCommon/httpCommon";

export class LikeServices {
  getLikes = (formData: FormData) => {
    return httpLike.post("/getLikes", formData);
  };

  upLike = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpLike.post("/upLike", formData, config);
  };

  unLike = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpLike.post("/unLike", formData, config);
  };
  getDislikes = (formData: FormData) => {
    return httpLike.post("/getDislikes", formData);
  };

  upDislike = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpLike.post("/upDislike", formData, config);
  };

  unDislike = (formData: FormData, token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return httpLike.post("/unDislike", formData, config);
  };
}
