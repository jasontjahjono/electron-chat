import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";
import StoreProvider from "./store/StoreProvider";

import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./actions/auth";
import Loading from "./components/shared/Loading";

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (isChecking) {
    return <Loading />;
  }
  return (
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
  );
};

const App = () => {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
};

export default App;
