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
const store_1 = require("../../../app/store");
const Register_1 = __importDefault(require("./Register"));
const react_router_dom_1 = require("react-router-dom");
const login = jest.fn();
describe("Register", () => {
    beforeEach(() => {
        (0, react_2.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <Register_1.default login={login}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    describe("form validation", () => {
        afterEach(react_2.cleanup);
        it("if valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const firstname = yield react_2.screen.findByTestId("firstname");
            const lastname = yield react_2.screen.findByTestId("lastname");
            const email = yield react_2.screen.findByTestId("email");
            const password = yield react_2.screen.findByTestId("password");
            const password2 = yield react_2.screen.findByTestId("password2");
            const form = yield react_2.screen.findByTestId("form");
            if (password && email && firstname && lastname && password2) {
                const firstnameInput = firstname.querySelector("input");
                const lastnameInput = lastname.querySelector("input");
                const emailInput = email.querySelector("input");
                const passInput = password.querySelector("input");
                const pass2Input = password2.querySelector("input");
                if (passInput &&
                    emailInput &&
                    firstnameInput &&
                    lastnameInput &&
                    pass2Input) {
                    react_2.fireEvent.change(firstnameInput, {
                        target: { value: "batuhan" },
                    });
                    react_2.fireEvent.change(lastnameInput, {
                        target: { value: "kır" },
                    });
                    react_2.fireEvent.change(emailInput, {
                        target: { value: "batuhankir1163@gmail.com" },
                    });
                    react_2.fireEvent.change(passInput, {
                        target: { value: "password" },
                    });
                    react_2.fireEvent.change(pass2Input, {
                        target: { value: "password" },
                    });
                    react_2.fireEvent.submit(form);
                    yield (0, react_2.waitFor)(() => expect(login).toHaveBeenCalled());
                }
            }
        }));
        it("if not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const password = yield react_2.screen.findByTestId("password");
            const password2 = yield react_2.screen.findByTestId("password2");
            const form = yield react_2.screen.findByTestId("form");
            if (password && password2) {
                const passInput = password.querySelector("input");
                const pass2Input = password2.querySelector("input");
                if (passInput && pass2Input) {
                    react_2.fireEvent.change(passInput, {
                        target: { value: "password" },
                    });
                    react_2.fireEvent.change(pass2Input, {
                        target: { value: "password2" },
                    });
                    react_2.fireEvent.submit(form);
                    yield (0, react_2.waitFor)(() => expect(react_2.screen.getByText("Password does not match")).toBeInTheDocument());
                }
            }
        }));
    });
});
