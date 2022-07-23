import React, { useEffect } from "react";
import "./styles.scss";
import SinglePostDetail from "../../components/pages/postDetail/singlePostDetail/SinglePostDetail";
import RelatedPosts from "../../components/pages/postDetail/relatedPosts/RelatedPosts";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getSinglePost } from "../../features/posts/asyncThunks";
import { useParams } from "react-router-dom";
import Comments from "../../components/pages/postDetail/singlePostDetail/comments/Comments";
import NotFoundPost from "../../components/notFoundPost/NotFoundPost";
import Spinner from "../../components/spinner/Spinner";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) => state.posts.singlePost);
  const singlePostStatus = useAppSelector(
    (state) => state.posts.singlePostStatus
  );

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {singlePostStatus === "pending" && (
        <div className="spinner-box">
          <Spinner />
        </div>
      )}
      {singlePostStatus === "succeeded" && (
        <div key={post._id} className="post-detail-container">
          <div className="post-detail-box">
            <SinglePostDetail post={post} />
            <RelatedPosts />
          </div>

          <Comments />
        </div>
      )}
      {singlePostStatus === "failed" && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <NotFoundPost text="no post find" />
        </div>
      )}
    </div>
  );
};

export default PostDetail;
