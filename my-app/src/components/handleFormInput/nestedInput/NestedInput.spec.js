"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const store_1 = require("../../../app/store");
const NestedInput_1 = __importDefault(require("./NestedInput"));
require("@testing-library/jest-dom");
jest.mock("react-hook-form", () => (Object.assign(Object.assign({}, jest.requireActual("react-hook-form")), { useFormContext: () => ({
        register: () => jest.fn(),
    }) })));
describe("Input error", () => {
    it("error message", () => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <NestedInput_1.default label="test" name="test" type="text" errorMessage="error message"/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
        expect(react_1.screen.getByLabelText(/test/i)).toBeInTheDocument();
        expect(react_1.screen.getByText("error message")).toBeInTheDocument();
    });
    it("without error message", () => {
        (0, react_1.render)(<react_router_dom_1.BrowserRouter>
        <react_redux_1.Provider store={store_1.store}>
          <NestedInput_1.default label="test" name="test" type="text" errorMessage={undefined}/>
        </react_redux_1.Provider>
      </react_router_dom_1.BrowserRouter>);
        expect(react_1.screen.queryByText("error message")).not.toBeInTheDocument();
    });
});
