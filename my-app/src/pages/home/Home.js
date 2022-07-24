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
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../../app/hooks");
const Searchbar_1 = __importDefault(require("../../components/navbar/searchbar/Searchbar"));
const Pagination_1 = __importDefault(require("../../components/pagination/Pagination"));
const SinglePost_1 = __importDefault(require("../../components/singlePost/SinglePost"));
const Spinner_1 = __importDefault(require("../../components/spinner/Spinner"));
const asyncThunks_1 = require("../../features/posts/asyncThunks");
const NotFoundPost_1 = __importDefault(require("../../components/notFoundPost/NotFoundPost"));
require("./styles.scss");
const tourappSlice_1 = require("../../features/tourapp/tourappSlice");
const HomeFeatures_1 = __importDefault(require("./features/HomeFeatures"));
const useQuery = () => {
    return new URLSearchParams((0, react_router_dom_1.useLocation)().search);
};
const Home = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const allPosts = (0, hooks_1.useAppSelector)((state) => state.posts.entities);
    const postStatus = (0, hooks_1.useAppSelector)((state) => state.posts.paginationToursStatus);
    const currentPage = (0, hooks_1.useAppSelector)((state) => state.posts.currentPage);
    const searchValue = (0, hooks_1.useAppSelector)((state) => state.tourapp.searchValue);
    const searchQuery = useQuery().get("searchQuery");
    (0, react_1.useEffect)(() => {
        dispatch((0, tourappSlice_1.setSearchValue)(""));
    }, []);
    (0, react_1.useEffect)(() => {
        if (searchQuery) {
            dispatch((0, asyncThunks_1.searchPosts)({
                searchQuery,
                page: currentPage.toString(),
                navigate,
                searchValue,
            }));
        }
        else {
            const getAllPostsProps = {
                navigate,
                page: currentPage.toString(),
            };
            dispatch((0, asyncThunks_1.getAllPosts)(getAllPostsProps));
        }
    }, [currentPage, searchQuery]);
    return (<div className="home-container">
      {postStatus === "pending" && (<div className="spinner-box">
          <Spinner_1.default />
        </div>)}
      <div className="section-container">
        <div className="searchbar">
          <Searchbar_1.default />
        </div>
        <div className="home-box">
          {postStatus === "succeeded" && (<>
              <div className="first-section">
                {searchQuery && allPosts.length === 0 && (<NotFoundPost_1.default text={`No tour by search query: "${searchQuery}"`}/>)}
                <div className="posts-box">
                  {allPosts.map((item) => (<SinglePost_1.default key={item._id} post={item}/>))}
                </div>
                {allPosts.length > 0 && postStatus === "succeeded" && (<div className="pagination-box">
                    <Pagination_1.default />
                  </div>)}
              </div>
              <HomeFeatures_1.default />
            </>)}
        </div>
      </div>
    </div>);
};
exports.default = Home;
