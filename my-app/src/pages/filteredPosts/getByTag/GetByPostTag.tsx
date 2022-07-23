import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import FilteredPosts from "../../../components/pages/filteredPosts/FilteredPosts";
import { getPostsByTag } from "../../../features/posts/asyncThunks";

const GetByPostTag = () => {
  const { tag } = useParams();
  const dispatch = useAppDispatch();
  const filteredPosts = useAppSelector((state) => state.posts.entities);

  useEffect(() => {
    if (tag) {
      dispatch(getPostsByTag(tag));
    }
  }, [tag]);

  return (
    <FilteredPosts
      header={`Tours By Tag: ${tag}`}
      filteredPosts={filteredPosts}
      text={`No tours by tag: "${tag}"`}
    />
  );
};

export default GetByPostTag;
