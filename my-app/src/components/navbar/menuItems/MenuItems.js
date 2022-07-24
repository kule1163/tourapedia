"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../../app/hooks");
const MenuItems_1 = require("../../../utils/navbar/MenuItems");
const postsSlice_1 = require("../../../features/posts/postsSlice");
const tourappSlice_1 = require("../../../features/tourapp/tourappSlice");
const ActiveLink_1 = __importDefault(require("../../activeLink/ActiveLink"));
const MenuItems = () => {
    const isLogin = (0, hooks_1.useAppSelector)((state) => state.auth.isLogin);
    const addTourStatus = (0, hooks_1.useAppSelector)((state) => state.posts.addTourStatus);
    const dispatch = (0, hooks_1.useAppDispatch)();
    return (<>
      {isLogin ? (<>
          {MenuItems_1.byUserMenuItems.map((item) => (<div style={{
                    pointerEvents: addTourStatus === "pending" ? "none" : "all",
                }} data-testid={item.item}>
              <ActiveLink_1.default key={item.id} to={item.url} onClick={() => {
                    dispatch((0, postsSlice_1.setCurrentPost)("reset"));
                    dispatch((0, tourappSlice_1.setDisplayMenu)(false));
                }} className="menu-text">
                {item.item}
              </ActiveLink_1.default>
            </div>))}
        </>) : (<>
          {MenuItems_1.menuItems.map((item) => (<div style={{
                    pointerEvents: addTourStatus === "pending" ? "none" : "all",
                }}>
              <ActiveLink_1.default key={item.id} to={item.url} onClick={() => {
                    dispatch((0, tourappSlice_1.setDisplayMenu)(false));
                }} className="menu-text">
                {item.item}
              </ActiveLink_1.default>
            </div>))}
        </>)}
    </>);
};
exports.default = MenuItems;
