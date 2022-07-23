import React from "react";
import { useAppSelector } from "../../app/hooks";
import Spinner from "../../components/spinner/Spinner";
import AddTourForm from "./AddTourForm/AddTourForm";

export interface Inputs {
  title: string;
  description: string;
  tags: string;
  category: string;
  file: FileList;
}

const AddTour = () => {
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const addTourStatus = useAppSelector((state) => state.posts.addTourStatus);

  return (
    <div
      style={{ maxWidth: "100vw", position: "relative", minHeight: "100vh" }}
    >
      {addTourStatus === "pending" ? (
        <div className="spinner-box">
          <Spinner />
        </div>
      ) : (
        <AddTourForm currentPost={currentPost} />
      )}
    </div>
  );
};

export default AddTour;
