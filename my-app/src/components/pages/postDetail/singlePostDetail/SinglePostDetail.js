"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const hi_1 = require("react-icons/hi");
const cg_1 = require("react-icons/cg");
require("./styles.scss");
const react_router_dom_1 = require("react-router-dom");
const moment_1 = __importDefault(require("moment"));
const defaultImage_jpg_1 = __importDefault(require("../../../../assets/defaultImage.jpg"));
const SinglePostDetail = ({ post }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<div className="single-post-detail-container">
      <div className="single-post-detail-box">
        <img src={post.postImage
            ? `http://localhost:5000/uploads/postPhotos/${post.postImage}`
            : defaultImage_jpg_1.default}/>
        <div className="content-container">
          <div className="header-box">
            <div onClick={() => navigate(-1)} className="header-icon">
              <hi_1.HiOutlineArrowNarrowLeft />
            </div>
            <material_1.Typography className="header-text">{post.title}</material_1.Typography>
          </div>
          <material_1.Typography className="creator">
            <span className="span">Created By:</span> {post.user.firstname}{" "}
            {post.user.lastname}
          </material_1.Typography>
          <div className="tag-box">
            {post.tags.map((item) => (<material_1.Typography className="text">#{item}</material_1.Typography>))}
          </div>
          <div className="date-box">
            <cg_1.CgCalendarDates size={20}/>
            <material_1.Typography className="date-text">
              {(0, moment_1.default)(post.updatedAt).startOf("day").fromNow()}
            </material_1.Typography>
          </div>
          <div className="content-box">
            <material_1.Typography className="content">{post.description}</material_1.Typography>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = SinglePostDetail;
