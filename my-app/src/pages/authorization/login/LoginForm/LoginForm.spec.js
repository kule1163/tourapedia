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
const react_2 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const store_1 = require("../../../../app/store");
const LoginForm_1 = __importDefault(require("./LoginForm"));
const react_router_dom_1 = require("react-router-dom");
require("@testing-library/jest-dom");
const login = jest.fn();
describe("LoginForm", () => {
    beforeEach(() => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <LoginForm_1.default login={login}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    it("email", () => {
        const email = react_2.screen.getByTestId("email");
        if (email) {
            const input = email.querySelector("input");
            if (input) {
                react_2.fireEvent.change(input, {
                    target: { value: "batuhankir1163@gmail.com" },
                });
                expect(input.value).toBe("batuhankir1163@gmail.com");
            }
        }
    });
    it("password", () => {
        const password = react_2.screen.getByTestId("password");
        if (password) {
            const input = password.querySelector("input");
            if (input) {
                react_2.fireEvent.change(input, {
                    target: { value: "password" },
                });
                expect(input.value).toBe("password");
            }
        }
    });
    describe("form validation", () => {
        afterEach(react_2.cleanup);
        it("if valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const password = yield react_2.screen.findByTestId("password");
            const email = yield react_2.screen.findByTestId("email");
            const form = yield react_2.screen.findByTestId("form");
            const passInput = password.querySelector("input");
            const emailInput = email.querySelector("input");
            if (passInput && emailInput) {
                react_2.fireEvent.change(emailInput, {
                    target: { value: "batuhankir1163@gmail.com" },
                });
                react_2.fireEvent.change(passInput, {
                    target: { value: "password" },
                });
                react_2.fireEvent.submit(form);
                yield (0, react_2.waitFor)(() => expect(login).toHaveBeenCalled());
            }
        }));
        it("if not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const email = yield react_2.screen.findByTestId("email");
            const form = yield react_2.screen.findByTestId("form");
            if (email) {
                const emailInput = email.querySelector("input");
                if (emailInput) {
                    react_2.fireEvent.change(emailInput, {
                        target: { value: "batuhankir1163gmail.com" },
                    });
                    react_2.fireEvent.submit(form);
                    yield (0, react_2.waitFor)(() => expect(react_2.screen.getByText(/Email is not valid/i)));
                }
            }
        }));
    });
});
