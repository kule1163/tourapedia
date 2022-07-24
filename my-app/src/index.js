"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistor = void 0;
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const react_redux_1 = require("react-redux");
const store_1 = require("./app/store");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("redux-persist/integration/react");
const redux_persist_1 = require("redux-persist");
const container = document.getElementById("root");
const root = (0, client_1.createRoot)(container);
exports.persistor = (0, redux_persist_1.persistStore)(store_1.store);
root.render(<react_1.default.StrictMode>
    <react_router_dom_1.BrowserRouter>
      <react_redux_1.Provider store={store_1.store}>
        <react_2.PersistGate persistor={exports.persistor}>
          <App_1.default />
        </react_2.PersistGate>
      </react_redux_1.Provider>
    </react_router_dom_1.BrowserRouter>
  </react_1.default.StrictMode>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
