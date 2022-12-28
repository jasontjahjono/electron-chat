import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/shared/Loading";

const Welcome = () => {
  const navigate = useNavigate();

  const [isLoginView, setIsLoginView] = useState(true);
  const user = useSelector(({ auth }) => auth.user);
  const isChecking = useSelector(({ auth }) => auth.isChecking);

  console.log(user);
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  if (isChecking) {
    return <Loading />;
  }

  const optInText = isLoginView
    ? ["Need an account?", "Register"]
    : ["Already registered?", "Login"];

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}

        <small className="form-text text-muted mt-2">
          {optInText[0]}
          <span
            onClick={() => setIsLoginView(!isLoginView)}
            className="btn-link ml-2"
          >
            {optInText[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
