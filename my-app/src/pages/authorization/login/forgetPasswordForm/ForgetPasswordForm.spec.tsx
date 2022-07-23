import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../app/store";
import ForgetPasswordForm from "./ForgetPasswordForm";
import "@testing-library/jest-dom";

const submit = jest.fn();

describe("Forget Password Form", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ForgetPasswordForm submit={submit} />
        </Provider>
      </BrowserRouter>
    );
  });

  it("form submit", async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "batuhankir1163@gmail.com" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /submit/i,
      })
    );

    await waitFor(() => expect(submit).toHaveBeenCalled());
  });

  it("required form element", async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /submit/i,
      })
    );

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("verify email type", async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "batuhankir1163gmail.com" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /submit/i,
      })
    );

    expect(
      await screen.findByText("email must be a valid email")
    ).toBeInTheDocument();
  });
});
