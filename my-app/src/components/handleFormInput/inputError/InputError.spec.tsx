import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import InputError from "./InputError";
import "@testing-library/jest-dom";

describe("Input error", () => {
  it("error message", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <InputError errorMessage="error message" />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByText("error message")).toBeInTheDocument();
  });
});
