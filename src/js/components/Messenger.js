import React, { useState } from "react";

const Messenger = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const onSend = (e) => {
    if (e.key === "Enter") {
      onSubmit(value);
      setValue("");
      e.preventDefault();
    }
  };
  return (
    <div className="chat-input form-group mt-3">
      <textarea
        onKeyDown={onSend}
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
