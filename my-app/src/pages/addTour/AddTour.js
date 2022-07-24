"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const hooks_1 = require("../../app/hooks");
const Spinner_1 = __importDefault(require("../../components/spinner/Spinner"));
const AddTourForm_1 = __importDefault(require("./AddTourForm/AddTourForm"));
const AddTour = () => {
    const currentPost = (0, hooks_1.useAppSelector)((state) => state.posts.currentPost);
    const addTourStatus = (0, hooks_1.useAppSelector)((state) => state.posts.addTourStatus);
    return (<div style={{ maxWidth: "100vw", position: "relative", minHeight: "100vh" }}>
      {addTourStatus === "pending" ? (<div className="spinner-box">
          <Spinner_1.default />
        </div>) : (<AddTourForm_1.default currentPost={currentPost}/>)}
    </div>);
};
exports.default = AddTour;
