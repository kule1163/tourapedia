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
const store_1 = require("../../app/store");
const Dashboard_1 = __importDefault(require("./Dashboard"));
require("@testing-library/jest-dom");
describe("Dashboard", () => {
    beforeEach(() => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <Dashboard_1.default />
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
    });
    it("delete button test", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield react_1.screen.findByText(/you dont have any tour lets your first tour/i)).toBeInTheDocument();
    }));
});
