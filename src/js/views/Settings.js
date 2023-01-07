import React from "react";
import withBaseLayout from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../actions/settings";

const Settings = () => {
  const dispatch = useDispatch();
  const { isDarkTheme, showNotifications, playSound } = useSelector(
    ({ settings }) => settings
  );

  const handleChange = ({ target: { name, checked } }) => {
    dispatch(updateSettings(name, checked));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form className="centered-container-form">
          <div className="header">Adjust application settings</div>
          <div className="form-container">
            <div className="my-3">
              <div className="form-check">
                <input
                  onChange={handleChange}
                  name="isDarkTheme"
                  type="checkbox"
                  className="form-check-input"
                  checked={isDarkTheme}
                />
                <label className="form-check-label">Dark Theme</label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleChange}
                  name="showNotifications"
                  type="checkbox"
                  className="form-check-input"
                  checked={showNotifications}
                />
                <label className="form-check-label">Enable Notification</label>
              </div>
              <div className="form-check">
                <input
                  onChange={handleChange}
                  name="playSound"
                  type="checkbox"
                  className="form-check-input"
                  checked={playSound}
                />
                <label className="form-check-label">Sound notification</label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                electron.appApi.quitApp();
              }}
              className="btn btn-danger"
            >
              Quit App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(Settings, { canGoBack: true });
