import React, { useEffect } from "react";
import AvailableChatsList from "../components/AvailableChatsList";
import JoinedChatsList from "../components/JoinedChatsList";
import ViewTitle from "../components/shared/ViewTitle";

import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chats";
import BaseLayout from "../layouts/Base";

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector(({ chats }) => chats.items);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <BaseLayout>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChatsList chats={chats} />
        </div>
        <div className="col-9 fh">
          <ViewTitle text={"Choose your channel"} />
          <AvailableChatsList chats={chats} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
