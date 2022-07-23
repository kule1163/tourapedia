import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Pagination as MUIPagination } from "@mui/material";
import { setCurrentPage } from "../../features/posts/postsSlice";

const Pagination = () => {
  const numberOfPages = useAppSelector((state) => state.posts.numberOfPages);
  const currentPage = useAppSelector((state) => state.posts.currentPage);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <MUIPagination
      onChange={handleChange}
      count={Math.ceil(numberOfPages ? numberOfPages : 1)}
      color="primary"
      page={currentPage}
    />
  );
};

export default Pagination;
