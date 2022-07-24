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
const store_1 = require("../../../app/store");
const Login_1 = __importDefault(require("./Login"));
require("@testing-library/jest-dom");
describe("Login", () => {
    beforeEach(() => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <Login_1.default />
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    it("form toggle(true) sign in form to forget password form", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.click(react_1.screen.getByRole("button", {
            name: /forget password\?/i,
        }));
        expect(yield react_1.screen.findByRole("button", {
            name: /sign in/i,
        })).toBeInTheDocument();
    }));
    it("form toggle(false) forget password form to sign in form", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.click(react_1.screen.getByRole("button", {
            name: /sign in/i,
        }));
        expect(yield react_1.screen.findByRole("button", {
            name: /forget password\?/i,
        })).toBeInTheDocument();
    }));
});
