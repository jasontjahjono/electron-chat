import React from "react";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import { useParams } from "react-router-dom";
import BaseLayout from "../layouts/Base";

const ChatView = () => {
  const { id } = useParams();
  return (
    <BaseLayout canGoBack>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <ChatUsersList />
        </div>
        <div className="col-9 fh">
          <ViewTitle text={`Joined Channel: ${id}`} />
          <ChatMessagesList />
        </div>
      </div>
    </BaseLayout>
  );
};

export default ChatView;
