import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { byUserMenuItems, menuItems } from "../../../utils/navbar/MenuItems";
import { setCurrentPost } from "../../../features/posts/postsSlice";
import { setDisplayMenu } from "../../../features/tourapp/tourappSlice";
import ActiveLink from "../../activeLink/ActiveLink";

const MenuItems = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const addTourStatus = useAppSelector((state) => state.posts.addTourStatus);
  const dispatch = useAppDispatch();

  return (
    <>
      {isLogin ? (
        <>
          {byUserMenuItems.map((item) => (
            <div
              key={item.id}
              style={{
                pointerEvents: addTourStatus === "pending" ? "none" : "all",
              }}
              data-testid={item.item}
            >
              <ActiveLink
                to={item.url}
                onClick={() => {
                  dispatch(setCurrentPost("reset"));
                  dispatch(setDisplayMenu(false));
                }}
                className="menu-text"
              >
                {item.item}
              </ActiveLink>
            </div>
          ))}
        </>
      ) : (
        <>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                pointerEvents: addTourStatus === "pending" ? "none" : "all",
              }}
            >
              <ActiveLink
                to={item.url}
                onClick={() => {
                  dispatch(setDisplayMenu(false));
                }}
                className="menu-text"
              >
                {item.item}
              </ActiveLink>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default MenuItems;
