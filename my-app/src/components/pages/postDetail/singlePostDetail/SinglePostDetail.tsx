import { Typography } from "@mui/material";
import React from "react";
import Image from "../../../../assets/image.jpg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { CgCalendarDates } from "react-icons/cg";
import "./styles.scss";
import { EntitieProps } from "../../../../features/posts/types";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DefaultImage from "../../../../assets/defaultImage.jpg";

interface SinglePostDetailProps {
  post: EntitieProps;
}

const SinglePostDetail = ({ post }: SinglePostDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="single-post-detail-container">
      <div className="single-post-detail-box">
        <img src={post.postImage.url} />
        <div className="content-container">
          <div className="header-box">
            <div onClick={() => navigate(-1)} className="header-icon">
              <HiOutlineArrowNarrowLeft />
            </div>
            <Typography className="header-text">{post.title}</Typography>
          </div>
          <Typography className="creator">
            <span className="span">Created By:</span> {post.user.firstname}{" "}
            {post.user.lastname}
          </Typography>
          <div className="tag-box">
            {post.tags.map((item) => (
              <Typography key={item} className="text">
                #{item}
              </Typography>
            ))}
          </div>
          <div className="date-box">
            <CgCalendarDates size={20} />
            <Typography className="date-text">
              {moment(post.updatedAt).startOf("day").fromNow()}
            </Typography>
          </div>
          <div className="content-box">
            <Typography className="content">{post.description}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostDetail;
