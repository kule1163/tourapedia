import React, { useEffect } from "react";
import "./App.css";
import "./sass/main.scss";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/authorization/login/Login";
import Register from "./pages/authorization/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import AddTour from "./pages/addTour/AddTour";
import PostDetail from "./pages/postDetail/PostDetail";
import GetByPostTag from "./pages/filteredPosts/getByTag/GetByPostTag";
import GetByCategName from "./pages/filteredPosts/getByCateg/GetByCategName";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setDisplayMenu } from "./features/tourapp/tourappSlice";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import ProfileEdit from "./pages/profileEdit/ProfileEdit";
import PasswordChange from "./pages/profileEdit/passwordChange/PasswordChange";
import ResetPassword from "./pages/resetPassword/ResetPassword";

function App() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const addTourStatus = useAppSelector((state) => state.posts.addTourStatus);

  useEffect(() => {
    dispatch(setDisplayMenu(false));
  }, [pathname]);

  return (
    <div
      style={{
        maxWidth: "100vw",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-tour"
          element={user ? <AddTour /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path={`/reset-password/:resetToken`}
          element={<ResetPassword />}
        />
        <Route
          path="/edit"
          element={user ? <ProfileEdit /> : <Navigate to="/login" replace />}
        />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/tours/:tag" element={<GetByPostTag />} />
        <Route path="/category/:categ" element={<GetByCategName />} />
      </Routes>
    </div>
  );
}

export default App;
