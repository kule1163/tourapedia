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
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../../../app/hooks");
const categories_1 = require("../../../utils/pages/filteredPost/categories");
const tags_1 = require("../../../utils/pages/filteredPost/tags");
require("./styles.scss");
const HomeFeatures = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const allPosts = (0, hooks_1.useAppSelector)((state) => state.posts.entities);
    const location = (0, react_router_dom_1.useLocation)();
    const [displayCategory, setDisplayCategory] = (0, react_1.useState)(false);
    const [displayTags, setDisplayTags] = (0, react_1.useState)(false);
    const handleClick = (e) => {
        const event = e.target;
        navigate(`/tours/${event.textContent}`);
    };
    return (<>
      {allPosts.length > 0 && (<div className="home-features-container">
          <div className="tags-container">
            <material_1.Typography onClick={() => setDisplayTags(!displayTags)} className="header">
              Populer Tags
            </material_1.Typography>
            <div className={`text-container ${displayTags && "display-flex"}`}>
              {tags_1.tags.map((item) => (<div key={item.id} onClick={(e) => handleClick(e)} className="text-box">
                  {item.tag}
                </div>))}
            </div>
          </div>
          <div className="categ-container">
            <material_1.Typography onClick={() => setDisplayCategory(!displayCategory)} className="header">
              Categories
            </material_1.Typography>
            <div className={`categ-box ${displayCategory && "display-block"}`}>
              {categories_1.categories.map((item) => (<div key={item.id} className="single-box">
                  <material_1.Typography onClick={() => {
                    navigate(`/category/${item.label}`);
                }}>
                    {item.label.toUpperCase()}
                  </material_1.Typography>
                </div>))}
            </div>

            <material_1.Button sx={{
                display: `${location.pathname === "/" ? "none" : "block"}`,
            }} onClick={() => navigate("/")} variant="contained" color="primary" className="button" fullWidth>
              view all tours
            </material_1.Button>
          </div>
        </div>)}
    </>);
};
exports.default = HomeFeatures;
