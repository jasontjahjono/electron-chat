import React, { useState } from "react";
import { createTimestamp } from "../utils/time";

const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
      setValue("");
      e.preventDefault();
    }
  };

  const sendMessage = () => {
    if (value.trim() === "") {
      return;
    }

    const message = {
      content: value.trim(),
      timestamp: createTimestamp(),
    };

    onSubmit(message);
  };
  return (
    <div className="chat-input form-group mt-3">
      <textarea
        onKeyDown={onKeyPress}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="form-control"
        row="3"
        placeholder="Type your message here..."
      />
    </div>
  );
};

export default Messenger;
