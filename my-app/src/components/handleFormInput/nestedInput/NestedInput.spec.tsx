import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import NestedInput from "./NestedInput";
import "@testing-library/jest-dom";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: () => ({
    register: () => jest.fn(),
  }),
}));

describe("Input error", () => {
  it("error message", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NestedInput
            label="test"
            name="test"
            type="text"
            errorMessage="error message"
          />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/test/i)).toBeInTheDocument();
    expect(screen.getByText("error message")).toBeInTheDocument();
  });

  it("without error message", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <NestedInput
            label="test"
            name="test"
            type="text"
            errorMessage={undefined}
          />
        </Provider>
      </BrowserRouter>
    );

    expect(screen.queryByText("error message")).not.toBeInTheDocument();
  });
});
