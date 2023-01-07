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
import ChatCreateView from "./views/ChatCreate";
import StoreProvider from "./store/StoreProvider";

import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./actions/auth";
import Loading from "./components/shared/Loading";
import { listenToConnectionChanges } from "./actions/app";
import { checkUserConnection } from "./actions/connection";
import { loadInitialSettings } from "./actions/settings";

const RequireAuth = ({ children }) => {
  const user = useSelector(({ auth }) => auth.user);
  return user ? children : <Navigate to="/" />;
};

const ContentWrapper = ({ children }) => {
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
  return (
    <div className={`content-wrapper ${isDarkTheme ? "dark" : "light"}`}>
      {children}
    </div>
  );
};

const ChatApp = () => {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const isOnline = useSelector(({ app }) => app.isOnline);
  const user = useSelector(({ auth }) => auth.user);

  useEffect(() => {
    dispatch(loadInitialSettings());
    const unsubAuth = dispatch(listenToAuthChanges());
    const unsubConnection = dispatch(listenToConnectionChanges());
    return () => {
      unsubAuth();
      unsubConnection();
    };
  }, [dispatch]);

  useEffect(() => {
    let unsubFromUserConnection;
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }
    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    };
  }, [dispatch, user]);

  if (isChecking) {
    return <Loading />;
  }

  if (!isOnline) {
    return (
      <Loading message="Application has been disconnected from the internet. Please reconnect..." />
    );
  }

  return (
    <Router>
      <ContentWrapper>
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
          <Route
            path="/chatCreate"
            element={
              <RequireAuth>
                <ChatCreateView />
              </RequireAuth>
            }
            exact
          />
        </Routes>
      </ContentWrapper>
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
