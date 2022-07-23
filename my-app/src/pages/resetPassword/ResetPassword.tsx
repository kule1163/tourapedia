import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { schema } from "./FormValidation";
import NestedInput from "../../components/handleFormInput/nestedInput/NestedInput";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetPassword } from "../../features/auth/asyncThunks";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";

interface Inputs {
  newPassword: string;
  newPassword2: string;
}

interface ResetPasswordProps {
  submit?: () => void;
}

const ResetPassword = ({ submit }: ResetPasswordProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { resetToken } = useParams();

  const user = useAppSelector((state) => state.auth.user);
  const forgetStatus = useAppSelector((state) => state.auth.forgetStatus);

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { newPassword, newPassword2 } = data;

    const formData = new FormData();

    formData.append("newPassword", newPassword);

    if (newPassword === newPassword2 && resetToken) {
      dispatch(resetPassword({ formData, navigate, resetToken }));

      methods.reset();

      if (submit) {
        submit();
      }
    }
  };

  return (
    <>
      <div className="max">
        <div className="log-reg-container">
          <div className="log-reg-box">
            <FormProvider {...methods}>
              <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="input-box">
                  <NestedInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                    errorMessage={
                      methods.formState.errors?.newPassword?.message
                    }
                  />
                </div>
                <div className="input-box">
                  <NestedInput
                    label="Confirm Password"
                    name="newPassword2"
                    type="password"
                    errorMessage={
                      methods.formState.errors?.newPassword2?.message
                    }
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {forgetStatus === "pending" ? (
                    <Spinner color="red" size={30} />
                  ) : (
                    "submit"
                  )}
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
