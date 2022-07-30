import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getRelatedPosts } from "../../../features/posts/asyncThunks";
import { resetPost } from "../../../features/posts/postsSlice";
import SinglePost from "../../../components/singlePost/SinglePost";
import "./styles.scss";

const RelatedPosts = () => {
  const post = useAppSelector((state) => state.posts.singlePost);
  const { allPost } = useAppSelector((state) => state.posts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (post) {
      const formData = new FormData();

      post.tags.forEach((tag) => formData.append("tags[]", tag));

      dispatch(getRelatedPosts({ formData, id: post._id }));
    }
  }, [post]);

  useEffect(() => {
    if (postStatus === "succeeded") {
      dispatch(resetPost());
    }
  }, [postStatus]);

  return (
    <div className="related-post-container">
      <div className="header-container">
        <div className="line"></div>
        <Typography className="header-text">RELATED TOURS</Typography>
        <div className="line"></div>
      </div>
      <div className="related-post-box">
        {allPost.map((item) => (
          <SinglePost key={item._id} post={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
