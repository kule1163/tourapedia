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
const hooks_1 = require("../../app/hooks");
const asyncThunks_1 = require("../../features/posts/asyncThunks");
const postsSlice_1 = require("../../features/posts/postsSlice");
const SinglePost_1 = __importDefault(require("../../components/singlePost/SinglePost"));
require("./styles.scss");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const Spinner_1 = __importDefault(require("../../components/spinner/Spinner"));
const Pagination_1 = __importDefault(require("../../components/pagination/Pagination"));
const Dashboard = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const userPosts = (0, hooks_1.useAppSelector)((state) => state.posts.entities);
    const postStatus = (0, hooks_1.useAppSelector)((state) => state.posts.status);
    const deleteStatus = (0, hooks_1.useAppSelector)((state) => state.posts.deleteStatus);
    const [currentItem, setCurrentItem] = (0, react_1.useState)();
    const currentPage = (0, hooks_1.useAppSelector)((state) => state.posts.currentPage);
    (0, react_1.useEffect)(() => {
        dispatch((0, postsSlice_1.setCurrentPage)(1));
    }, []);
    (0, react_1.useEffect)(() => {
        dispatch((0, asyncThunks_1.getUserPosts)(currentPage ? currentPage.toString() : "1"));
    }, [currentPage]);
    return (<div className="dashboard-container">
      {postStatus === "pending" ? (<div className="spinner-box">
          <Spinner_1.default />
        </div>) : (<>
          {userPosts.length > 0 && (<div className="header-box">
              <material_1.Typography className="header">My Tours</material_1.Typography>
            </div>)}
          <div className="dashboard-box">
            {userPosts.map((item) => (<div key={item._id} className="single-box">
                <SinglePost_1.default post={item}/>
                <div className="update-box">
                  <div style={{
                    pointerEvents: deleteStatus === "pending" ? "none" : "auto",
                }} className="delete" onClick={() => {
                    dispatch((0, asyncThunks_1.deletePost)(item._id));
                    setCurrentItem(item._id);
                }}>
                    {deleteStatus === "pending" && item._id === currentItem ? (<Spinner_1.default color="white" size={12}/>) : ("delete")}
                  </div>
                  <div className="update" onClick={() => {
                    dispatch((0, postsSlice_1.setCurrentPost)(item._id));
                    navigate("/add-tour");
                }}>
                    update
                  </div>
                </div>
              </div>))}
          </div>
          {userPosts.length === 0 ? (<material_1.Typography sx={{
                    fontSize: "1.3em",
                    marginTop: "6rem",
                    marginInline: "auto",
                }}>
              You dont have any tour lets{" "}
              <span data-testid="add" style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/add-tour")}>
                add
              </span>{" "}
              your first tour
            </material_1.Typography>) : (<div className="pagination-box">
              <Pagination_1.default />
            </div>)}
        </>)}
    </div>);
};
exports.default = Dashboard;
