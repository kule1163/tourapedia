import React, { useRef } from "react";
import "./styles.scss";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setSearchValue } from "../../../features/tourapp/tourappSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentPage } from "../../../features/posts/postsSlice";

const Searchbar = () => {
  const searchValue = useAppSelector((state) => state.tourapp.searchValue);
  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submitRef = useRef<HTMLInputElement>(null);

  const { addTourStatus } = useAppSelector((state) => state.posts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchValue) {
      navigate(`/search?searchQuery=${searchValue}&page=${currentPage}`);
    }

    dispatch(setCurrentPage(1));
  };

  return (
    <>
      <form
        style={{ pointerEvents: addTourStatus === "pending" ? "none" : "all" }}
        onSubmit={handleSubmit}
        className="search-container"
      >
        <input
          name="search"
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          value={searchValue}
          className="input"
          type="text"
          placeholder="searchValue"
        />

        <BiSearch
          className="search-icon"
          onClick={() => submitRef?.current?.click()}
          cursor="pointer"
          size={22}
        />

        <input
          ref={submitRef}
          type="submit"
          style={{ display: "none" }}
        ></input>
      </form>
    </>
  );
};

export default Searchbar;
