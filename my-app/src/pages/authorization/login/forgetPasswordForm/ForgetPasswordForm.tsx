import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { schema } from "./FormValidation";
import NestedInput from "../../../../components/handleFormInput/nestedInput/NestedInput";
import { Typography, Button } from "@mui/material";
import { forgetPassword } from "../../../../features/auth/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setForgetStatus } from "../../../../features/auth/authSlice";
import "./styles.scss";
import Spinner from "../../../../components/spinner/Spinner";

interface Inputs {
  email: string;
}

interface ForgetPasswordFormProps {
  submit?: () => void;
}

const ForgetPasswordForm = ({ submit }: ForgetPasswordFormProps) => {
  const dispatch = useAppDispatch();

  const forgetStatus = useAppSelector((state) => state.auth.forgetStatus);

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email } = data;

    const formData = new FormData();

    formData.append("email", email);

    if (email) {
      dispatch(forgetPassword(formData));

      methods.reset();

      if (submit) {
        submit();
      }
    }
  };

  useEffect(() => {
    dispatch(setForgetStatus("idle"));
  }, []);

  return (
    <>
      {forgetStatus === "succeeded" ? (
        <div className="forget-password-form-container">
          <div className="info-box">
            <Typography className="text">
              Please check your email. We send a reset link to reset your
              password
            </Typography>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="input-box">
              <NestedInput
                label="Email"
                name="email"
                type="text"
                errorMessage={methods.formState.errors?.email?.message}
              />
            </div>

            <Button type="submit" variant="contained" color="primary" fullWidth>
              {forgetStatus === "pending" ? (
                <Spinner color="red" size={30} />
              ) : (
                "submit"
              )}
            </Button>
          </form>
        </FormProvider>
      )}
    </>
  );
};

export default ForgetPasswordForm;
