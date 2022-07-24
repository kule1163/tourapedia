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
const user_event_1 = __importDefault(require("@testing-library/user-event"));
const history_1 = require("history");
const react_2 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
const store_1 = require("./app/store");
describe("App", () => {
    it("check routes", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <App_1.default />
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
        expect(yield react_1.screen.findByText(/populer tags/i)).toBeInTheDocument();
        const login = react_1.screen.getAllByText(/login/i);
        const user = user_event_1.default.setup();
        yield user.click(login[0]);
        expect(react_1.screen.getByTestId(/login-form/i)).toBeInTheDocument();
    }));
    it("landing on a bad page", () => {
        const history = (0, history_1.createMemoryHistory)();
        history.push("/some/bad/route");
        (0, react_1.render)(<react_router_dom_1.Router location={history.location} navigator={history}>
        <react_redux_1.Provider store={store_1.store}>
          <App_1.default />
        </react_redux_1.Provider>
      </react_router_dom_1.Router>);
        expect(react_1.screen.getByAltText(/page not found/i)).toBeInTheDocument();
    });
});
