import { Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

interface NotFoundPageProps {
  text: string;
}

const NotFoundPost = ({ text }: NotFoundPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="notfoundpost-container">
      <Typography className="text">{text}</Typography>
      <Button onClick={() => navigate(-1)} color="primary">
        go back
      </Button>
    </div>
  );
};

export default NotFoundPost;
