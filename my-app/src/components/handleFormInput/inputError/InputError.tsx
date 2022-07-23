import React from "react";
import { FieldError } from "react-hook-form";
import { Typography } from "@mui/material";

interface InputErrorProps {
  errorMessage: string | undefined;
}

const InputError = ({ errorMessage }: InputErrorProps) => {
  return (
    <>
      {errorMessage && (
        <Typography className="error-text">
          <span className="dash">*</span>
          {errorMessage}
        </Typography>
      )}
    </>
  );
};

export default InputError;
