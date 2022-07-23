import React from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

interface SpinnerProps {
  color?: string;
  size?: number;
}

const Spinner = ({ color, size }: SpinnerProps) => {
  return (
    <ClipLoader
      data-testid="spinner"
      color={color ? color : "blue"}
      size={size ? size : 150}
    />
  );
};

export default Spinner;
