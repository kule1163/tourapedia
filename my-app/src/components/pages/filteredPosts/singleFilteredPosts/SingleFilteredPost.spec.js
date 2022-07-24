"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../../../../app/store");
const SingleFilteredPost_1 = __importDefault(require("./SingleFilteredPost"));
require("@testing-library/jest-dom");
const filteredPost = {
    _id: "62aa294e34bef8254dc56595",
    user: {
        _id: "62aa294334bef8254dc5658e",
        firstname: "batu",
        lastname: "kır",
    },
    title: "dsa",
    description: "dsa",
    category: "beach",
    tags: ["a", "b"],
    postImage: "5835be20-5485-4ad7-8503-23e9a191e2d8-1655318862553.jpg",
    likes: ["62aa294334bef8254dc5658e"],
    dislikes: ["62aa294334bef8254dc51907"],
    createdAt: "2022-06-15T18:47:42.639+00:00",
    updatedAt: "2022-06-15T18:47:42.639+00:00",
};
const filteredPost2 = {
    _id: "62aa294e34bef8254dc56595",
    user: {
        _id: "62aa294334bef8254dc5658e",
        firstname: "batu",
        lastname: "kır",
    },
    title: "qwe",
    description: "qwe",
    category: "sea",
    tags: ["a", "b"],
    postImage: undefined,
    likes: ["62aa294334bef8254dc5658e"],
    dislikes: ["62aa294334bef8254dc51907"],
    createdAt: "2022-06-15T18:47:42.639+00:00",
    updatedAt: "2022-06-15T18:47:42.639+00:00",
};
describe("Filtered Posts", () => {
    it("filtered posts", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <SingleFilteredPost_1.default filteredPost={filteredPost}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
        expect((yield react_1.screen.findByRole("img")).src).toBe("http://localhost:5000/uploads/postPhotos/5835be20-5485-4ad7-8503-23e9a191e2d8-1655318862553.jpg");
    }));
    it("filtered posts no image", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <SingleFilteredPost_1.default filteredPost={filteredPost2}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
        expect((yield react_1.screen.findByRole("img")).src).toBe("http://localhost/defaultImage.jpg");
    }));
});
