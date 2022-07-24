"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
require("./styles.scss");
const hooks_1 = require("../../app/hooks");
const asyncThunks_1 = require("../../features/auth/asyncThunks");
const react_router_dom_1 = require("react-router-dom");
const postsSlice_1 = require("../../features/posts/postsSlice");
const ai_1 = require("react-icons/ai");
const TopMenu_1 = __importDefault(require("./topMenu/TopMenu"));
const cg_1 = require("react-icons/cg");
const cg_2 = require("react-icons/cg");
const tourappSlice_1 = require("../../features/tourapp/tourappSlice");
const Searchbar_1 = __importDefault(require("./searchbar/Searchbar"));
const MenuItems_1 = __importDefault(require("./menuItems/MenuItems"));
const Navbar = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const isLogin = (0, hooks_1.useAppSelector)((state) => state.auth.isLogin);
    const displayMenu = (0, hooks_1.useAppSelector)((state) => state.tourapp.displayMenu);
    const addTourStatus = (0, hooks_1.useAppSelector)((state) => state.posts.addTourStatus);
    const [menuHeight, setMenuHeight] = (0, react_1.useState)();
    return (<div className="navbar-container">
      <div className="navbar-box">
        <material_1.Typography onClick={() => navigate("/login")} className="logo">
          Touropedia
        </material_1.Typography>
        <div className="searchbar-md">
          <Searchbar_1.default />
        </div>
        <div className="icon-box">
          <div onClick={() => dispatch((0, tourappSlice_1.setDisplayMenu)(!displayMenu))}>
            <ai_1.AiOutlineMenu size={30}/>
          </div>
          {isLogin ? (<div onClick={() => {
                dispatch((0, postsSlice_1.setCurrentPost)("reset"));
                dispatch((0, asyncThunks_1.logout)(navigate));
            }} style={{
                pointerEvents: addTourStatus === "pending" ? "none" : "all",
            }} data-testid="logout-sm">
              <cg_1.CgLogOut size={30}/>
            </div>) : (<div onClick={() => {
                navigate("/login");
                dispatch((0, postsSlice_1.setCurrentPost)("reset"));
            }}>
              <cg_2.CgLogIn size={30}/>
            </div>)}
        </div>
        <div className="section-box">
          <div className="menu-items-container">
            <MenuItems_1.default />
            {isLogin && (<material_1.Typography style={{
                pointerEvents: addTourStatus === "pending" ? "none" : "all",
            }} className="menu-text" data-testid="logout" onClick={() => dispatch((0, asyncThunks_1.logout)(navigate))}>
                Logout
              </material_1.Typography>)}
          </div>
        </div>
      </div>
      <div style={{
            width: "100vw",
            transition: "height ease 1s",
            height: `${displayMenu ? menuHeight : 0}px`,
        }}>
        <TopMenu_1.default menuHeight={menuHeight} setMenuHeight={setMenuHeight}/>
      </div>
    </div>);
};
exports.default = Navbar;
