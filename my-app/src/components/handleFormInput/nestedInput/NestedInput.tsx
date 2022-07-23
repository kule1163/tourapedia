import React from "react";
import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import "./styles.scss";
import InputError from "../inputError/InputError";

interface NestedInputProps {
  type: string;
  label: string;
  name: string;
  errorMessage: string | undefined;
}

const NestedInput = ({ label, name, type, errorMessage }: NestedInputProps) => {
  const { register } = useFormContext();

  return (
    <div className=".nested-input-container">
      <TextField
        data-testid={name}
        size="small"
        label={label}
        {...register(name)}
        variant="outlined"
        type={type}
        fullWidth
        error={errorMessage ? true : false}
      />
      {errorMessage && <InputError errorMessage={errorMessage} />}
    </div>
  );
};

export default NestedInput;
