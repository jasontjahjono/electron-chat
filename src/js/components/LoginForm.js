import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/auth";
import Loading from "./shared/Loading";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.login.error);
  const isChecking = useSelector(({ auth }) => auth.login.isChecking);

  if (isChecking) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    console.log("Logging in");
    dispatch(loginUser(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Welcome here!</div>
      <div className="subheader">Login and chat with other people!</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            id="email"
            {...register("email")}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password")}
          />
        </div>
        {error && (
          <div className="alert alert-danger small">{error.message}</div>
        )}
        <button type="submit" className="btn btn-outline-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
