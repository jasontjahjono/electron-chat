import React from "react";
import Navbar from "../components/Navbar";

const getDisplayName = (Component) => {
  return Component.displayName || Component.name || "Component";
};

const withBaseLayout = (Component, config) => (props) => {
  const viewName = getDisplayName(Component);
  return (
    <>
      <Navbar {...config} view={viewName} />
      <Component {...props} />
    </>
  );
};

export default withBaseLayout;
