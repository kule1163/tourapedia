import React from "react";
import Image from "../../assets/404.jpg";
import "./styles.scss";

const PageNotFound = () => {
  return (
    <div className="pagenotfound-container">
      <img alt="page not found" src={Image} />
    </div>
  );
};

export default PageNotFound;
