import React from "react";
import withBaseLayout from "../layouts/Base";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../actions/chats";
import { useNavigate } from "react-router-dom";

// FORM FORMAT
// name -> input
// description -> textarea
// image -> input

const ChatCreateView = () => {
  const { register, handleSubmit } = useForm();
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(createChat(data, user.uid)).then((_) => navigate("/home"));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="centered-container-form"
        >
          <div className="header">Create chat now!</div>
          <div className="subheader">Chat with people you know</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                {...register("description")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                {...register("image")}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(ChatCreateView, { canGoBack: true });
