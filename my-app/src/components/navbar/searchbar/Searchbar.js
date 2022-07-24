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
const react_1 = __importStar(require("react"));
require("./styles.scss");
const bi_1 = require("react-icons/bi");
const hooks_1 = require("../../../app/hooks");
const tourappSlice_1 = require("../../../features/tourapp/tourappSlice");
const react_router_dom_1 = require("react-router-dom");
const postsSlice_1 = require("../../../features/posts/postsSlice");
const Searchbar = () => {
    const searchValue = (0, hooks_1.useAppSelector)((state) => state.tourapp.searchValue);
    const currentPage = (0, hooks_1.useAppSelector)((state) => state.posts.currentPage);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const submitRef = (0, react_1.useRef)(null);
    const { addTourStatus } = (0, hooks_1.useAppSelector)((state) => state.posts);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue) {
            navigate(`/search?searchQuery=${searchValue}&page=${currentPage}`);
        }
        dispatch((0, postsSlice_1.setCurrentPage)(1));
    };
    return (<>
      <form style={{ pointerEvents: addTourStatus === "pending" ? "none" : "all" }} onSubmit={handleSubmit} className="search-container">
        <input name="search" onChange={(e) => dispatch((0, tourappSlice_1.setSearchValue)(e.target.value))} value={searchValue} className="input" type="text" placeholder="searchValue"/>

        <bi_1.BiSearch className="search-icon" onClick={() => { var _a; return (_a = submitRef === null || submitRef === void 0 ? void 0 : submitRef.current) === null || _a === void 0 ? void 0 : _a.click(); }} cursor="pointer" size={22}/>

        <input ref={submitRef} type="submit" style={{ display: "none" }}></input>
      </form>
    </>);
};
exports.default = Searchbar;
