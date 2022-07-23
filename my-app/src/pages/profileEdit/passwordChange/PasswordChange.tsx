import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import NestedInput from "../../../components/handleFormInput/nestedInput/NestedInput";
import {
  changePassword,
  resetPassword,
} from "../../../features/auth/asyncThunks";
import { schema } from "./FormValidation";
import { Button, Typography } from "@mui/material";
import Spinner from "../../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";

interface Inputs {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
}

interface PasswordChangeProps {
  submit?: () => void;
}

const PasswordChange = ({ submit }: PasswordChangeProps) => {
  const dispatch = useAppDispatch();
  const changeStatus = useAppSelector((state) => state.auth.changeStatus);
  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { newPassword, newPassword2, oldPassword } = data;

    const formData = new FormData();

    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    if (newPassword === newPassword2) {
      dispatch(changePassword({ formData, navigate }));

      methods.reset();

      if (submit) {
        submit();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="input-box">
          <NestedInput
            label="Old Password"
            name="oldPassword"
            type="password"
            errorMessage={methods.formState.errors?.oldPassword?.message}
          />
        </div>
        <div className="input-box">
          <NestedInput
            label="New Password"
            name="newPassword"
            type="password"
            errorMessage={methods.formState.errors?.newPassword?.message}
          />
        </div>
        <div className="input-box">
          <NestedInput
            label="Confirm Password"
            name="newPassword2"
            type="password"
            errorMessage={methods.formState.errors?.newPassword2?.message}
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          change password
        </Button>
      </form>
    </FormProvider>
  );
};

export default PasswordChange;
