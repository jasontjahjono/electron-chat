import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomeView from "./views/Home";
import LoginView from "./views/Login";
import SettingsView from "./views/Settings";
import RegisterView from "./views/Register";
import ChatView from "./views/Chat";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/settings" element={<SettingsView />} exact />
            <Route path="/register" element={<RegisterView />} exact />
            <Route path="/login" element={<LoginView />} exact />
            <Route path="/chat/:id" element={<ChatView />} exact />
            <Route path="/" element={<HomeView />} exact />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
