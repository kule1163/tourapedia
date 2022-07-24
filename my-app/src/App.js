"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
require("./sass/main.scss");
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("./pages/authorization/login/Login"));
const Register_1 = __importDefault(require("./pages/authorization/register/Register"));
const Home_1 = __importDefault(require("./pages/home/Home"));
const Navbar_1 = __importDefault(require("./components/navbar/Navbar"));
const AddTour_1 = __importDefault(require("./pages/addTour/AddTour"));
const PostDetail_1 = __importDefault(require("./pages/postDetail/PostDetail"));
const GetByPostTag_1 = __importDefault(require("./pages/filteredPosts/getByTag/GetByPostTag"));
const GetByCategName_1 = __importDefault(require("./pages/filteredPosts/getByCateg/GetByCategName"));
const Dashboard_1 = __importDefault(require("./pages/dashboard/Dashboard"));
const hooks_1 = require("./app/hooks");
const tourappSlice_1 = require("./features/tourapp/tourappSlice");
const PageNotFound_1 = __importDefault(require("./components/pageNotFound/PageNotFound"));
const ProfileEdit_1 = __importDefault(require("./pages/profileEdit/ProfileEdit"));
const ResetPassword_1 = __importDefault(require("./pages/resetPassword/ResetPassword"));
function App() {
    const { pathname } = (0, react_router_dom_1.useLocation)();
    const dispatch = (0, hooks_1.useAppDispatch)();
    const user = (0, hooks_1.useAppSelector)((state) => state.auth.user);
    const addTourStatus = (0, hooks_1.useAppSelector)((state) => state.posts.addTourStatus);
    (0, react_1.useEffect)(() => {
        dispatch((0, tourappSlice_1.setDisplayMenu)(false));
    }, [pathname]);
    return (<div style={{
            maxWidth: "100vw",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F0F0F0",
            minHeight: "100vh",
        }}>
      <Navbar_1.default />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="*" element={<PageNotFound_1.default />}/>
        <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
        <react_router_dom_1.Route path="/search" element={<Home_1.default />}/>
        <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
        <react_router_dom_1.Route path="/register" element={<Register_1.default />}/>
        <react_router_dom_1.Route path="/add-tour" element={user ? <AddTour_1.default /> : <react_router_dom_1.Navigate to="/login" replace/>}/>
        <react_router_dom_1.Route path="/dashboard" element={user ? <Dashboard_1.default /> : <react_router_dom_1.Navigate to="/login" replace/>}/>
        <react_router_dom_1.Route path={`/reset-password/:resetToken`} element={<ResetPassword_1.default />}/>
        <react_router_dom_1.Route path="/edit" element={user ? <ProfileEdit_1.default /> : <react_router_dom_1.Navigate to="/login" replace/>}/>
        <react_router_dom_1.Route path="/post/:id" element={<PostDetail_1.default />}/>
        <react_router_dom_1.Route path="/tours/:tag" element={<GetByPostTag_1.default />}/>
        <react_router_dom_1.Route path="/category/:categ" element={<GetByCategName_1.default />}/>
      </react_router_dom_1.Routes>
    </div>);
}
exports.default = App;
