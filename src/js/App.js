import React from "react";
import HomeView from "./views/home";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// const router = createHashRouter([
//   {
//     path: "/settings",
//     element: <h1>I am in Settings</h1>,
//   },
//   {
//     path: "/register",
//     element: <h1>I am in Sign up</h1>,
//   },
//   {
//     path: "/login",
//     element: <h1>I am in Signin</h1>,
//   },
//   {
//     path: "/",
//     element: <HomeView />,
//   },
// ]);

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/settings" element={<h1>I am in Settings</h1>} exact />
          <Route path="/register" element={<h1>I am in register</h1>} exact />
          <Route path="/login" element={<h1>I am in login</h1>} exact />
          <Route path="/" element={<HomeView />} exact />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
