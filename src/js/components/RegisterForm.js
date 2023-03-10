import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/auth";
import Loading from "./shared/Loading";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.register.error);
  const isChecking = useSelector(({ auth }) => auth.register.isChecking);

  if (isChecking) {
    return <Loading />;
  }

  const onSubmit = (registerData) => {
    dispatch(registerUser(registerData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
      <div className="header">Create an account</div>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            {...register("email")}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            {...register("username")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            className="form-control"
            id="avatar"
            aria-describedby="emailHelp"
            {...register("avatar")}
          />
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
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
