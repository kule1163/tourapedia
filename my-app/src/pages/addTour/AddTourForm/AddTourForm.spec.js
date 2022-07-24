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
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const store_1 = require("../../../app/store");
const AddTourForm_1 = __importDefault(require("./AddTourForm"));
require("@testing-library/jest-dom");
const react_2 = require("@testing-library/react");
const addPost = jest.fn();
const editPost = jest.fn();
const currentPost = {
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
describe("Add Tour", () => {
    beforeEach(() => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <AddTourForm_1.default addPost={addPost}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    describe("form validation add", () => {
        afterEach(react_2.cleanup);
        it("if valid add", () => __awaiter(void 0, void 0, void 0, function* () {
            const newFile = new File(["hello"], "hello.png", {
                type: "image/png",
            });
            const title = yield react_2.screen.findByTestId("title");
            const tags = yield react_2.screen.findByTestId("tags");
            const description = yield react_2.screen.findByTestId("description");
            const category = yield react_2.screen.findByTestId("category");
            const file = yield react_2.screen.findByTestId("file");
            const form = yield react_2.screen.findByTestId("form");
            const titleInput = title.querySelector("input");
            const tagsInput = tags.querySelector("input");
            const categoryInput = category.querySelector("input");
            if (titleInput && tagsInput && categoryInput) {
                react_2.fireEvent.change(tagsInput, {
                    target: { value: "tags" },
                });
                react_2.fireEvent.change(titleInput, {
                    target: { value: "title" },
                });
                react_2.fireEvent.change(description, {
                    target: { value: "description" },
                });
                react_2.fireEvent.change(categoryInput, { target: { value: "sea" } });
                react_2.fireEvent.change(file, { target: { files: [newFile] } });
                react_2.fireEvent.submit(form);
                yield (0, react_2.waitFor)(() => expect(addPost).toHaveBeenCalled());
            }
        }));
        it("if not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const newFile = new File(["hello"], "hello.png", {
                type: "image/txt",
            });
            const file = yield react_2.screen.findByTestId("file");
            const form = yield react_2.screen.findByTestId("form");
            react_2.fireEvent.change(file, { target: { files: [newFile] } });
            react_2.fireEvent.submit(form);
            yield (0, react_2.waitFor)(() => expect(react_2.screen.getByText(/Unsupported File Format/i)).toBeInTheDocument());
        }));
    });
});
describe("edit Tour", () => {
    beforeEach(() => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <AddTourForm_1.default currentPost={currentPost} editPost={editPost}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    describe("form validation edit", () => {
        afterEach(react_2.cleanup);
        it("if valid edit", () => __awaiter(void 0, void 0, void 0, function* () {
            const newFile = new File(["hello"], "hello.png", {
                type: "image/png",
            });
            const title = yield react_2.screen.findByTestId("title");
            const tags = yield react_2.screen.findByTestId("tags");
            const description = yield react_2.screen.findByTestId("description");
            const category = yield react_2.screen.findByTestId("category");
            const file = yield react_2.screen.findByTestId("file");
            const form = yield react_2.screen.findByTestId("form");
            const titleInput = title.querySelector("input");
            const tagsInput = tags.querySelector("input");
            const categoryInput = category.querySelector("input");
            if (titleInput && tagsInput && categoryInput) {
                react_2.fireEvent.change(tagsInput, {
                    target: { value: "tags" },
                });
                react_2.fireEvent.change(titleInput, {
                    target: { value: "title" },
                });
                react_2.fireEvent.change(description, {
                    target: { value: "description" },
                });
                react_2.fireEvent.change(categoryInput, { target: { value: "sea" } });
                react_2.fireEvent.change(file, { target: { files: [newFile] } });
                react_2.fireEvent.submit(form);
                yield (0, react_2.waitFor)(() => expect(editPost).toHaveBeenCalled());
            }
        }));
    });
});
