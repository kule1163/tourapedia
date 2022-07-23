import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import Login from "./Login";
import "@testing-library/jest-dom";

describe("Login", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
  });

  it("form toggle(true) sign in form to forget password form", async () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: /forget password\?/i,
      })
    );

    expect(
      await screen.findByRole("button", {
        name: /sign in/i,
      })
    ).toBeInTheDocument();
  });

  it("form toggle(false) forget password form to sign in form", async () => {
    fireEvent.click(
      screen.getByRole("button", {
        name: /sign in/i,
      })
    );

    expect(
      await screen.findByRole("button", {
        name: /forget password\?/i,
      })
    ).toBeInTheDocument();
  });
});
