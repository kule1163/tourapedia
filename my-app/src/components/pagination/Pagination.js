"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../app/hooks");
const material_1 = require("@mui/material");
const postsSlice_1 = require("../../features/posts/postsSlice");
const Pagination = () => {
    const numberOfPages = (0, hooks_1.useAppSelector)((state) => state.posts.numberOfPages);
    const currentPage = (0, hooks_1.useAppSelector)((state) => state.posts.currentPage);
    const dispatch = (0, hooks_1.useAppDispatch)();
    const handleChange = (event, value) => {
        dispatch((0, postsSlice_1.setCurrentPage)(value));
    };
    return (<material_1.Pagination onChange={handleChange} count={Math.ceil(numberOfPages ? numberOfPages : 1)} color="primary" page={currentPage}/>);
};
exports.default = Pagination;
