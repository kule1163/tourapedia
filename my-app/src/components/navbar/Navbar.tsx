import React, { useRef, useState } from "react";
import { Typography } from "@mui/material";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/asyncThunks";
import { useNavigate } from "react-router-dom";
import { setCurrentPost } from "../../features/posts/postsSlice";
import { AiOutlineMenu } from "react-icons/ai";
import TopMenu from "./topMenu/TopMenu";
import { CgLogOut } from "react-icons/cg";
import { CgLogIn } from "react-icons/cg";
import { setDisplayMenu } from "../../features/tourapp/tourappSlice";
import Searchbar from "./searchbar/Searchbar";
import MenuItems from "./menuItems/MenuItems";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const displayMenu = useAppSelector((state) => state.tourapp.displayMenu);

  const addTourStatus = useAppSelector((state) => state.posts.addTourStatus);

  const [menuHeight, setMenuHeight] = useState<number | undefined>();

  return (
    <div className="navbar-container">
      <div className="navbar-box">
        <Typography onClick={() => navigate("/login")} className="logo">
          Touropedia
        </Typography>
        <div className="searchbar-md">
          <Searchbar />
        </div>
        <div className="icon-box">
          <div onClick={() => dispatch(setDisplayMenu(!displayMenu))}>
            <AiOutlineMenu size={30} />
          </div>
          {isLogin ? (
            <div
              onClick={() => {
                dispatch(setCurrentPost("reset"));
                dispatch(logout(navigate));
              }}
              style={{
                pointerEvents: addTourStatus === "pending" ? "none" : "all",
              }}
              data-testid="logout-sm"
            >
              <CgLogOut size={30} />
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/login");
                dispatch(setCurrentPost("reset"));
              }}
            >
              <CgLogIn size={30} />
            </div>
          )}
        </div>
        <div className="section-box">
          <div className="menu-items-container">
            <MenuItems />
            {isLogin && (
              <Typography
                style={{
                  pointerEvents: addTourStatus === "pending" ? "none" : "all",
                }}
                className="menu-text"
                data-testid="logout"
                onClick={() => dispatch(logout(navigate))}
              >
                Logout
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          transition: "height ease 1s",
          height: `${displayMenu ? menuHeight : 0}px`,
        }}
      >
        <TopMenu menuHeight={menuHeight} setMenuHeight={setMenuHeight} />
      </div>
    </div>
  );
};

export default Navbar;
