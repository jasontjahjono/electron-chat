import React from "react";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";

const Loading = ({ message = "Just one moment please..." }) => {
  const isDarkTheme = useSelector(({ settings }) => settings.isDarkTheme);
  return (
    <div className={isDarkTheme ? "dark" : "light"}>
      <div className="loading-screen">
        <div className="loading-view">
          <div className="loading-view-container">
            <div className="mb-3">{message}</div>
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
