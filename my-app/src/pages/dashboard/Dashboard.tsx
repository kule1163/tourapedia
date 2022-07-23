import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePost, getUserPosts } from "../../features/posts/asyncThunks";
import {
  setCurrentPost,
  setCurrentPage,
} from "../../features/posts/postsSlice";
import SinglePost from "../../components/singlePost/SinglePost";
import "./styles.scss";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import Pagination from "../../components/pagination/Pagination";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userPosts = useAppSelector((state) => state.posts.entities);
  const postStatus = useAppSelector((state) => state.posts.status);
  const deleteStatus = useAppSelector((state) => state.posts.deleteStatus);
  const [currentItem, setCurrentItem] = useState<string>();
  const currentPage = useAppSelector((state) => state.posts.currentPage);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);

  useEffect(() => {
    dispatch(getUserPosts(currentPage ? currentPage.toString() : "1"));
  }, [currentPage]);

  return (
    <div className="dashboard-container">
      {postStatus === "pending" ? (
        <div className="spinner-box">
          <Spinner />
        </div>
      ) : (
        <>
          {userPosts.length > 0 && (
            <div className="header-box">
              <Typography className="header">My Tours</Typography>
            </div>
          )}
          <div className="dashboard-box">
            {userPosts.map((item) => (
              <div key={item._id} className="single-box">
                <SinglePost post={item} />
                <div className="update-box">
                  <div
                    style={{
                      pointerEvents:
                        deleteStatus === "pending" ? "none" : "auto",
                    }}
                    className="delete"
                    onClick={() => {
                      dispatch(deletePost(item._id));
                      setCurrentItem(item._id);
                    }}
                  >
                    {deleteStatus === "pending" && item._id === currentItem ? (
                      <Spinner color="white" size={12} />
                    ) : (
                      "delete"
                    )}
                  </div>
                  <div
                    className="update"
                    onClick={() => {
                      dispatch(setCurrentPost(item._id));
                      navigate("/add-tour");
                    }}
                  >
                    update
                  </div>
                </div>
              </div>
            ))}
          </div>
          {userPosts.length === 0 ? (
            <Typography
              sx={{
                fontSize: "1.3em",
                marginTop: "6rem",
                marginInline: "auto",
              }}
            >
              You dont have any tour lets{" "}
              <span
                data-testid="add"
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/add-tour")}
              >
                add
              </span>{" "}
              your first tour
            </Typography>
          ) : (
            <div className="pagination-box">
              <Pagination />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
