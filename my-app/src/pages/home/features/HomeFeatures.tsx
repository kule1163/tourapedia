import { Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { categories } from "../../../utils/pages/filteredPost/categories";
import { tags } from "../../../utils/pages/filteredPost/tags";
import "./styles.scss";

const HomeFeatures = () => {
  const navigate = useNavigate();
  const { allPost } = useAppSelector((state) => state.posts);
  const location = useLocation();

  const [displayCategory, setDisplayCategory] = useState<boolean>(false);
  const [displayTags, setDisplayTags] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const event = e.target as HTMLDivElement;

    navigate(`/tours/${event.textContent}`);
  };

  return (
    <>
      {allPost.length > 0 && (
        <div className="home-features-container">
          <div className="tags-container">
            <Typography
              onClick={() => setDisplayTags(!displayTags)}
              className="header"
            >
              Populer Tags
            </Typography>
            <div className={`text-container ${displayTags && "display-flex"}`}>
              {tags.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => handleClick(e)}
                  className="text-box"
                >
                  {item.tag}
                </div>
              ))}
            </div>
          </div>
          <div className="categ-container">
            <Typography
              onClick={() => setDisplayCategory(!displayCategory)}
              className="header"
            >
              Categories
            </Typography>
            <div className={`categ-box ${displayCategory && "display-block"}`}>
              {categories.map((item) => (
                <div key={item.id} className="single-box">
                  <Typography
                    onClick={() => {
                      navigate(`/category/${item.label}`);
                    }}
                  >
                    {item.label.toUpperCase()}
                  </Typography>
                </div>
              ))}
            </div>

            <Button
              sx={{
                display: `${location.pathname === "/" ? "none" : "block"}`,
              }}
              onClick={() => navigate("/")}
              variant="contained"
              color="primary"
              className="button"
              fullWidth
            >
              view all tours
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeFeatures;
