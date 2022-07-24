"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const SingleFilteredPost_1 = __importDefault(require("./singleFilteredPosts/SingleFilteredPost"));
const hooks_1 = require("../../../app/hooks");
const Spinner_1 = __importDefault(require("../../../components/spinner/Spinner"));
require("./styles.scss");
const NotFoundPost_1 = __importDefault(require("../../notFoundPost/NotFoundPost"));
const FilteredPosts = ({ filteredPosts, header, text }) => {
    const postStatus = (0, hooks_1.useAppSelector)((state) => state.posts.status);
    return (<div className="filtered-posts-container">
      {postStatus === "pending" && (<div className="spinner-box">
          <Spinner_1.default />
        </div>)}
      {postStatus === "succeeded" && (<div className="filtered-posts-box">
          <div className="header-box">
            <material_1.Typography className="header-text">{header}</material_1.Typography>
          </div>
          <div className="line"></div>
          {filteredPosts.length > 0 ? (<div className="posts-container">
              {filteredPosts.map((item) => (<SingleFilteredPost_1.default filteredPost={item}/>))}
            </div>) : (<NotFoundPost_1.default text={text}/>)}
        </div>)}
    </div>);
};
exports.default = FilteredPosts;
