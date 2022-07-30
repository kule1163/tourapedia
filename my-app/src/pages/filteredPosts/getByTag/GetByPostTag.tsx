import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import FilteredPosts from "../../../components/pages/filteredPosts/FilteredPosts";
import { getPostsByTag } from "../../../features/posts/asyncThunks";

const GetByPostTag = () => {
  const { tag } = useParams();
  const dispatch = useAppDispatch();
  const { allPost } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (tag) {
      dispatch(getPostsByTag(tag));
    }
  }, [tag]);

  return (
    <FilteredPosts
      header={`Tours By Tag: ${tag}`}
      filteredPosts={allPost}
      text={`No tours by tag: "${tag}"`}
    />
  );
};

export default GetByPostTag;
