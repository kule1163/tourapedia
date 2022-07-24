"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../../app/store");
const ActiveLink_1 = __importDefault(require("./ActiveLink"));
require("@testing-library/jest-dom");
describe("active link", () => {
    beforeEach(() => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <ActiveLink_1.default to="/"/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    it("activelink test", () => {
        expect(react_1.screen.getByTestId("active-link")).toHaveStyle("color: rgb(244, 67, 54)");
    });
});
