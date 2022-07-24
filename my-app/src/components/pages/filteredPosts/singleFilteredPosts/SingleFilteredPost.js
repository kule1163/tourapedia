"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
require("./styles.scss");
const defaultImage_jpg_1 = __importDefault(require("../../../../assets/defaultImage.jpg"));
const react_router_dom_1 = require("react-router-dom");
const SingleFilteredPost = ({ filteredPost }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="single-filtered-post-container">
      <div className="single-filtered-post-box">
        <div className="img-box">
          <img src={filteredPost.postImage
            ? `http://localhost:5000/uploads/postPhotos/${filteredPost.postImage}`
            : defaultImage_jpg_1.default}/>
        </div>
        <div className="content-continer">
          <material_1.Typography className="header-text">{filteredPost.title}</material_1.Typography>
          <material_1.Typography className="content-text">
            {filteredPost.description.length > 120
            ? filteredPost.description.slice(0, 120)
            : filteredPost.description}
          </material_1.Typography>
          <div>
            <material_1.Button size="small" variant="contained" color="primary" className="button-box" onClick={() => {
            navigate(`/post/${filteredPost._id}`);
        }}>
              read more
            </material_1.Button>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = SingleFilteredPost;
