import React from "react";

const App = () => {
  const title = "Hello World My Perfect Application";
  const enhancedTitle = title + " - React App!";

  const sendNotification = () => {
    e_notification.sendNotification("My custom message from preload!");
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
};

export default App;
