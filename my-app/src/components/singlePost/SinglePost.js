"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
require("./styles.scss");
const react_router_dom_1 = require("react-router-dom");
const defaultImage_jpg_1 = __importDefault(require("../../assets/defaultImage.jpg"));
const HandleLike_1 = __importDefault(require("../handleLike/HandleLike"));
const SinglePost = ({ post }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (<>
      {post && (<div className="single-post-container">
          <div className="single-post-box">
            <div className="img-box">
              <img src={post.postImage
                ? `http://localhost:5000/uploads/postPhotos/${post.postImage}`
                : defaultImage_jpg_1.default}/>
            </div>
            <div onClick={() => {
                navigate(`/category/${post.category}`);
            }} className={`categ-box ${post.category}`}>
              {post.category}
            </div>
            <HandleLike_1.default item={post} postId={post._id}/>
            <div className="content-container">
              <material_1.Typography className="header">{post.title}</material_1.Typography>
              <div className="box">
                <material_1.Typography className="text">
                  {post.description.slice(0, 50)} ... &nbsp;
                  <span className="read-more" onClick={() => {
                navigate(`/post/${post._id}`);
            }}>
                    Read More
                  </span>
                </material_1.Typography>
              </div>
            </div>
            <div className="tag-box">
              {post.tags &&
                post.tags.map((item) => (<material_1.Typography key={item} onClick={() => navigate(`/tours/${item}`)} id={item}>
                    #{item}
                  </material_1.Typography>))}
            </div>
          </div>
        </div>)}
    </>);
};
exports.default = SinglePost;
