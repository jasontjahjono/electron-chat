import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";

import { Provider } from "react-redux";
import store from "./store";
import { listenToAuthChanges } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<WelcomeView />} exact />
            <Route path="/settings" element={<SettingsView />} exact />
            <Route path="/chat/:id" element={<ChatView />} exact />
            <Route path="/home" element={<HomeView />} exact />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
