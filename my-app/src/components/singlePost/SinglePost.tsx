import React from "react";
import { Typography } from "@mui/material";
import "./styles.scss";
import { EntitieProps } from "../../features/posts/types";
import { useNavigate } from "react-router-dom";
import HandleLike from "../handleLike/HandleLike";

interface SinglePostProps {
  post: EntitieProps;
}

const SinglePost = ({ post }: SinglePostProps) => {
  const navigate = useNavigate();

  console.log(post);

  return (
    <>
      {post && (
        <div className="single-post-container">
          <div className="single-post-box">
            <div className="img-box">
              <img src={post.postImage.url} />
            </div>
            <div
              onClick={() => {
                navigate(`/category/${post.category}`);
              }}
              className={`categ-box ${post.category}`}
            >
              {post.category}
            </div>
            <HandleLike item={post} postId={post._id} />
            <div className="content-container">
              <Typography className="header">{post.title}</Typography>
              <div className="box">
                <Typography className="text">
                  {post.description.slice(0, 50)} ... &nbsp;
                  <span
                    className="read-more"
                    onClick={() => {
                      navigate(`/post/${post._id}`);
                    }}
                  >
                    Read More
                  </span>
                </Typography>
              </div>
            </div>
            <div className="tag-box">
              {post.tags &&
                post.tags.map((item) => (
                  <Typography
                    key={item}
                    onClick={() => navigate(`/tours/${item}`)}
                    id={item}
                  >
                    #{item}
                  </Typography>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
