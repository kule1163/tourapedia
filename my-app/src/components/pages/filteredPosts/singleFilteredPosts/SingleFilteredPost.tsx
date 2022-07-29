import { Button, Typography } from "@mui/material";
import React from "react";
import { EntitieProps } from "../../../../features/posts/types";
import "./styles.scss";
import DefaultImage from "../../../../assets/defaultImage.jpg";
import { useNavigate } from "react-router-dom";

interface SingleFilteredPostProps {
  filteredPost: EntitieProps;
}

const SingleFilteredPost = ({ filteredPost }: SingleFilteredPostProps) => {
  const navigate = useNavigate();

  return (
    <div className="single-filtered-post-container">
      <div className="single-filtered-post-box">
        <div className="img-box">
          {/* <img src={filteredPost.postImage.url} /> */}
        </div>
        <div className="content-continer">
          <Typography className="header-text">{filteredPost.title}</Typography>
          <Typography className="content-text">
            {filteredPost.description.length > 120
              ? filteredPost.description.slice(0, 120)
              : filteredPost.description}
          </Typography>
          <div>
            <Button
              size="small"
              variant="contained"
              color="primary"
              className="button-box"
              onClick={() => {
                navigate(`/post/${filteredPost._id}`);
              }}
            >
              read more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFilteredPost;
