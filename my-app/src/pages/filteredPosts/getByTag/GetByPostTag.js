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
const hooks_1 = require("../../../app/hooks");
const FilteredPosts_1 = __importDefault(require("../../../components/pages/filteredPosts/FilteredPosts"));
const asyncThunks_1 = require("../../../features/posts/asyncThunks");
const GetByPostTag = () => {
    const { tag } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const filteredPosts = (0, hooks_1.useAppSelector)((state) => state.posts.entities);
    (0, react_1.useEffect)(() => {
        if (tag) {
            dispatch((0, asyncThunks_1.getPostsByTag)(tag));
        }
    }, [tag]);
    return (<FilteredPosts_1.default header={`Tours By Tag: ${tag}`} filteredPosts={filteredPosts} text={`No tours by tag: "${tag}"`}/>);
};
exports.default = GetByPostTag;
