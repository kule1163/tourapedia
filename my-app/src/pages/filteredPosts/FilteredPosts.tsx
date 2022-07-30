import { Typography } from "@mui/material";
import React from "react";
import SingleFilteredPost from "./singleFilteredPosts/SingleFilteredPost";
import { EntitieProps } from "../../features/posts/types";
import { useAppSelector } from "../../app/hooks";
import Spinner from "../../components/spinner/Spinner";
import "./styles.scss";
import NotFoundPost from "../../components/notFoundPost/NotFoundPost";

interface FilteredPostProps {
  filteredPosts: EntitieProps[];
  header: string;
  text: string;
}

const FilteredPosts = ({ filteredPosts, header, text }: FilteredPostProps) => {
  const postStatus = useAppSelector((state) => state.posts.status);

  return (
    <div className="filtered-posts-container">
      {postStatus === "pending" && (
        <div className="spinner-box">
          <Spinner />
        </div>
      )}
      {postStatus === "succeeded" && (
        <div className="filtered-posts-box">
          <div className="header-box">
            <Typography className="header-text">{header}</Typography>
          </div>
          <div className="line"></div>
          {filteredPosts.length > 0 ? (
            <div className="posts-container">
              {filteredPosts.map((item) => (
                <SingleFilteredPost filteredPost={item} />
              ))}
            </div>
          ) : (
            <NotFoundPost text={text} />
          )}
        </div>
      )}
    </div>
  );
};

export default FilteredPosts;
