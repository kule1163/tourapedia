"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const _404_jpg_1 = __importDefault(require("../../assets/404.jpg"));
require("./styles.scss");
const PageNotFound = () => {
    return (<div className="pagenotfound-container">
      <img alt="page not found" src={_404_jpg_1.default}/>
    </div>);
};
exports.default = PageNotFound;
