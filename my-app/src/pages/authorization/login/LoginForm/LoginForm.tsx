import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import NestedInput from "../../../../components/handleFormInput/nestedInput/NestedInput";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./Formvalidation";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { authLogin } from "../../../../features/auth/asyncThunks";
import Spinner from "../../../../components/spinner/Spinner";

interface Inputs {
  email: string;
  password: string;
}

interface LoginProps {
  login?: () => void;
}

const LoginForm = ({ login }: LoginProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  const message = useAppSelector((state) => state.auth.message);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (!email || !password) {
      console.log("please enter all");
    } else {
      dispatch(authLogin({ formData, navigate }));
      methods.reset();
    }

    if (login) {
      login();
    }
  };

  return (
    <>
      <div className="sign-box">
        <FaUserCircle />
        <Typography>Sign In</Typography>
      </div>
      <FormProvider {...methods}>
        <form
          data-testid="form"
          className="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="input-box">
            <NestedInput
              errorMessage={methods.formState.errors?.email?.message}
              label="Email"
              type="email"
              name="email"
            />
          </div>
          <div className="input-box">
            <NestedInput
              errorMessage={methods.formState.errors?.password?.message}
              label="Password"
              name="password"
              type="password"
            />
          </div>
          {status === "failed" && (
            <div className="info-box">
              <Typography>*</Typography>
              <Typography>{message}</Typography>
            </div>
          )}
          <Button variant="contained" type="submit" fullWidth color="primary">
            {status === "pending" ? <Spinner color="red" size={30} /> : "LOGIN"}
          </Button>
        </form>
      </FormProvider>
      <div className="footer">
        <Typography onClick={() => navigate("/register")} className="text">
          Don't have an account ? Sign Up
        </Typography>
      </div>
    </>
  );
};

export default LoginForm;
