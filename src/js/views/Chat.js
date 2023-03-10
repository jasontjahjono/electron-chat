import React, { useEffect, useRef, useCallback } from "react";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import { useParams } from "react-router-dom";
import withBaseLayout from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToChat,
  subscribeToProfile,
  sendChatMessage,
  subscribeToMessages,
  registerMessageSubscription,
} from "../actions/chats";
import Loading from "../components/shared/Loading";
import Messenger from "../components/Messenger";

const ChatView = () => {
  const { id } = useParams();
  const userWatchers = useRef({});
  const messageList = useRef();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const activeMessages = useSelector(({ chats }) => chats.activeMessages[id]);
  const joinedUsers = activeChat?.joinedUsers;
  const messagesSub = useSelector(({ chats }) => chats.messagesSubs[id]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    if (!messagesSub) {
      const unsubFromMessages = dispatch(subscribeToMessages(id));
      dispatch(registerMessageSubscription(id, unsubFromMessages));
    }

    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    };
  }, [dispatch]);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = useCallback(
    (users) => {
      users.forEach((user) => {
        if (!userWatchers.current[user.uid]) {
          userWatchers.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(userWatchers.current).forEach((id) =>
      userWatchers.current[id]()
    );
  }, [userWatchers.current]);

  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id)).then((_) =>
        messageList.current.scrollIntoView(false)
      );
    },
    [id]
  );

  if (!activeChat?.id) {
    return <Loading message="Loading Chat" />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined Channel: ${activeChat?.name}`} />
        <ChatMessagesList messages={activeMessages} innerRef={messageList} />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  );
};

export default withBaseLayout(ChatView, { canGoBack: true });
