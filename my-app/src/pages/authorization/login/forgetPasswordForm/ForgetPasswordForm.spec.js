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
const ForgetPasswordForm_1 = __importDefault(require("./ForgetPasswordForm"));
require("@testing-library/jest-dom");
const submit = jest.fn();
describe("Forget Password Form", () => {
    beforeEach(() => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <ForgetPasswordForm_1.default submit={submit}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    it("form submit", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.change(react_1.screen.getByLabelText(/email/i), {
            target: { value: "batuhankir1163@gmail.com" },
        });
        react_1.fireEvent.click(react_1.screen.getByRole("button", {
            name: /submit/i,
        }));
        yield (0, react_1.waitFor)(() => expect(submit).toHaveBeenCalled());
    }));
    it("required form element", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.change(react_1.screen.getByLabelText(/email/i), {
            target: { value: "" },
        });
        react_1.fireEvent.click(react_1.screen.getByRole("button", {
            name: /submit/i,
        }));
        expect(yield react_1.screen.findByText("Email is required")).toBeInTheDocument();
    }));
    it("verify email type", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.change(react_1.screen.getByLabelText(/email/i), {
            target: { value: "batuhankir1163gmail.com" },
        });
        react_1.fireEvent.click(react_1.screen.getByRole("button", {
            name: /submit/i,
        }));
        expect(yield react_1.screen.findByText("email must be a valid email")).toBeInTheDocument();
    }));
});
