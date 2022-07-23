import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./styles.scss";
import { useAppDispatch } from "../../../app/hooks";
import { resetAuth, setChangeStatus } from "../../../features/auth/authSlice";
import ForgetPasswordForm from "./forgetPasswordForm/ForgetPasswordForm";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  const dispatch = useAppDispatch();

  const [formToggle, setFormToggle] = useState<boolean>(false);

  useEffect(() => {
    dispatch(resetAuth());
  }, []);

  return (
    <div data-testid="login-form" className="max">
      <div className="log-reg-container">
        <div className="log-reg-box">
          {formToggle ? <ForgetPasswordForm /> : <LoginForm />}

          <Button
            onClick={() => {
              dispatch(setChangeStatus("idle"));
              setFormToggle((prev) => !prev);
            }}
            color="error"
          >
            {formToggle ? "sign in" : "forget password?"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
