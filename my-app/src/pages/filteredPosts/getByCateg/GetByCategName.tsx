import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getPostByCateg } from "../../../features/posts/asyncThunks";
import FilteredPosts from "../../../components/pages/filteredPosts/FilteredPosts";

const GetByCategName = () => {
  const { categ } = useParams();
  const dispatch = useAppDispatch();
  const { allPost } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (categ) {
      dispatch(getPostByCateg(categ));
    }
  }, [categ]);

  return (
    <FilteredPosts
      header={`Category: ${categ}`}
      filteredPosts={allPost}
      text={`No tours by category: "${categ}"`}
    />
  );
};

export default GetByCategName;
