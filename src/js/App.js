import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomeView from "./views/Home";
import WelcomeView from "./views/Welcome";
import SettingsView from "./views/Settings";
import ChatView from "./views/Chat";
import StoreProvider from "./store/StoreProvider";

import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./actions/auth";
import Loading from "./components/shared/Loading";
import { listenToConnectionChanges } from "./actions/app";

const RequireAuth = ({ children }) => {
  const user = useSelector(({ auth }) => auth.user);
  return user ? children : <Navigate to="/" />;
};

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);

  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? "online" : "offline");
  };

  useEffect(() => {
    const unsubAuth = dispatch(listenToAuthChanges());

    const unsubConnection = dispatch(listenToConnectionChanges());

    return () => {
      unsubAuth();
      unsubConnection();
    };
  }, [dispatch]);

  if (isChecking) {
    return <Loading />;
  }
  return (
    <Router>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<WelcomeView />} exact />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <SettingsView />
              </RequireAuth>
            }
            exact
          />
          <Route
            path="/chat/:id"
            element={
              <RequireAuth>
                <ChatView />
              </RequireAuth>
            }
            exact
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <HomeView />
              </RequireAuth>
            }
            exact
          />
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
