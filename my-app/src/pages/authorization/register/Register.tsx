import React, { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { FaUserCircle } from "react-icons/fa";
import "./styles.scss";
import NestedInput from "../../../components/handleFormInput/nestedInput/NestedInput";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./FormValidation";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { register } from "../../../features/auth/asyncThunks";
import Spinner from "../../../components/spinner/Spinner";
import { resetAuth } from "../../../features/auth/authSlice";

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
  file: FileList;
}

interface RegisterProps {
  login?: () => void;
}

const Register = ({ login }: RegisterProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);
  const methods = useForm<Inputs>({ resolver: yupResolver(schema) });
  const message = useAppSelector((state) => state.auth.message);

  const profilePhoto = methods.watch("file");

  useEffect(() => {
    dispatch(resetAuth());
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { firstname, lastname, email, password, password2, file } = data;

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePhoto", file[0]);

    if (password !== password2) {
      console.log("password doesnt match");
    } else {
      dispatch(register({ formData, navigate }));
      methods.reset();
    }

    if (login) {
      login();
    }
  };

  return (
    <div className="max">
      <div className="log-reg-container">
        <div className="log-reg-box">
          <div className="sign-box">
            {profilePhoto && profilePhoto.length > 0 ? (
              <img
                className="profile-photo"
                src={URL.createObjectURL(profilePhoto[0])}
              />
            ) : (
              <FaUserCircle style={{ width: 40, height: 40 }} />
            )}
            <Typography>Sign Up</Typography>
          </div>
          <FormProvider {...methods}>
            <form
              data-testid="form"
              className="form"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="input-box">
                <input type="file" {...methods.register("file")} />
              </div>
              <div className="half-box">
                <div className="input-box">
                  <NestedInput
                    label="First Name"
                    name="firstname"
                    type="text"
                    errorMessage={methods.formState.errors?.firstname?.message}
                  />
                </div>
                <div className="input-box">
                  <NestedInput
                    label="Last Name"
                    name="lastname"
                    type="text"
                    errorMessage={methods.formState.errors?.lastname?.message}
                  />
                </div>
              </div>
              <div className="input-box">
                <NestedInput
                  label="Email"
                  name="email"
                  type="text"
                  errorMessage={methods.formState.errors?.email?.message}
                />
              </div>
              <div className="input-box">
                <NestedInput
                  label="Password"
                  name="password"
                  type="password"
                  errorMessage={methods.formState.errors?.password?.message}
                />
              </div>
              <div className="input-box">
                <NestedInput
                  label="Password Confirm"
                  name="password2"
                  type="password"
                  errorMessage={methods.formState.errors?.password2?.message}
                />
              </div>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                {status === "pending" ? (
                  <Spinner color="red" size={30} />
                ) : (
                  "register"
                )}
              </Button>
              {status === "failed" && (
                <div className="info-box">
                  <Typography>*</Typography>
                  <Typography>{message}</Typography>
                </div>
              )}
            </form>
          </FormProvider>
          <div className="footer">
            <Typography onClick={() => navigate("/login")} className="text">
              Already have an account ? Sign In
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
