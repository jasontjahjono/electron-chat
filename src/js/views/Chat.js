import React, { useEffect } from "react";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import { useParams } from "react-router-dom";
import withBaseLayout from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToChat } from "../actions/chats";

const ChatView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));
    return () => {
      unsubFromChat();
    };
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined Channel: ${activeChat?.name}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};

export default withBaseLayout(ChatView, { canGoBack: true });
