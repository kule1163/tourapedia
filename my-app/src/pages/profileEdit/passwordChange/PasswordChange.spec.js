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
const PasswordChange_1 = __importDefault(require("./PasswordChange"));
require("@testing-library/jest-dom");
const submit = jest.fn();
describe("Password Change", () => {
    beforeEach(() => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <PasswordChange_1.default submit={submit}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    it("form validation", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.change(react_1.screen.getByLabelText(/old password/i), {
            target: { value: "1907" },
        });
        react_1.fireEvent.change(react_1.screen.getByLabelText(/new password/i), {
            target: { value: "1163" },
        });
        react_1.fireEvent.change(react_1.screen.getByLabelText(/confirm password/i), {
            target: { value: "1163" },
        });
        react_1.fireEvent.click(react_1.screen.getByRole("button", { name: /change password/i }));
        yield (0, react_1.waitFor)(() => expect(submit).toHaveBeenCalled());
    }));
    it("password doesnt match", () => __awaiter(void 0, void 0, void 0, function* () {
        react_1.fireEvent.change(react_1.screen.getByLabelText(/new password/i), {
            target: { value: "1163" },
        });
        react_1.fireEvent.change(react_1.screen.getByLabelText(/confirm password/i), {
            target: { value: "1160" },
        });
        react_1.fireEvent.click(react_1.screen.getByRole("button", { name: /change password/i }));
        expect(yield react_1.screen.findByText(/Password does not match/i)).toBeInTheDocument();
    }));
});
