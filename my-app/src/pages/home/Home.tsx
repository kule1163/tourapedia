import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Searchbar from "../../components/navbar/searchbar/Searchbar";
import Pagination from "../../components/pagination/Pagination";
import SinglePost from "../../components/singlePost/SinglePost";
import Spinner from "../../components/spinner/Spinner";
import {
  GetAllPosts,
  getAllPosts,
  searchPosts,
} from "../../features/posts/asyncThunks";
import NotFoundPost from "../../components/notFoundPost/NotFoundPost";
import "./styles.scss";
import { setSearchValue } from "../../features/tourapp/tourappSlice";
import HomeFeatures from "./features/HomeFeatures";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { allPost } = useAppSelector((state) => state.posts);
  const postStatus = useAppSelector(
    (state) => state.posts.paginationToursStatus
  );

  const currentPage = useAppSelector((state) => state.posts.currentPage);
  const searchValue = useAppSelector((state) => state.tourapp.searchValue);

  const searchQuery = useQuery().get("searchQuery");

  useEffect(() => {
    dispatch(setSearchValue(""));
  }, []);

  console.log(allPost);

  useEffect(() => {
    if (searchQuery) {
      dispatch(
        searchPosts({
          searchQuery,
          page: currentPage.toString(),
          navigate,
          searchValue,
        })
      );
    } else {
      const getAllPostsProps: GetAllPosts = {
        navigate,
        page: currentPage.toString(),
      };

      dispatch(getAllPosts(getAllPostsProps));
    }
  }, [currentPage, searchQuery]);

  return (
    <div className="home-container">
      {postStatus === "pending" && (
        <div className="spinner-box">
          <Spinner />
        </div>
      )}
      <div className="section-container">
        <div className="searchbar">
          <Searchbar />
        </div>
        <div className="home-box">
          {postStatus === "succeeded" && (
            <>
              <div className="first-section">
                {searchQuery && allPost.length === 0 && (
                  <NotFoundPost
                    text={`No tour by search query: "${searchQuery}"`}
                  />
                )}
                {allPost.length > 0 && (
                  <div className="posts-box">
                    {allPost.map((item) => (
                      <SinglePost key={item._id} post={item} />
                    ))}
                  </div>
                )}
                {allPost.length > 0 && postStatus === "succeeded" && (
                  <div className="pagination-box">
                    <Pagination />
                  </div>
                )}
              </div>
              <HomeFeatures />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
