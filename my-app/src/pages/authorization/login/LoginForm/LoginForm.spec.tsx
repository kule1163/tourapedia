import React from "react";
import {
  screen,
  render,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../../app/store";
import LoginForm from "./LoginForm";
import { BrowserRouter, Route } from "react-router-dom";
import "@testing-library/jest-dom";

const login = jest.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LoginForm login={login} />
        </Provider>
      </BrowserRouter>
    );
  });

  it("email", () => {
    const email = screen.getByTestId("email");
    if (email) {
      const input = email.querySelector("input");
      if (input) {
        fireEvent.change(input, {
          target: { value: "batuhankir1163@gmail.com" },
        });
        expect(input.value).toBe("batuhankir1163@gmail.com");
      }
    }
  });
  it("password", () => {
    const password = screen.getByTestId("password");
    if (password) {
      const input = password.querySelector("input");
      if (input) {
        fireEvent.change(input, {
          target: { value: "password" },
        });
        expect(input.value).toBe("password");
      }
    }
  });

  describe("form validation", () => {
    afterEach(cleanup);
    it("if valid", async () => {
      const password = await screen.findByTestId("password");
      const email = await screen.findByTestId("email");
      const form = await screen.findByTestId("form");

      const passInput = password.querySelector("input");
      const emailInput = email.querySelector("input");

      if (passInput && emailInput) {
        fireEvent.change(emailInput, {
          target: { value: "batuhankir1163@gmail.com" },
        });
        fireEvent.change(passInput, {
          target: { value: "password" },
        });

        fireEvent.submit(form);
        await waitFor(() => expect(login).toHaveBeenCalled());
      }
    });
    it("if not valid", async () => {
      const email = await screen.findByTestId("email");
      const form = await screen.findByTestId("form");

      if (email) {
        const emailInput = email.querySelector("input");

        if (emailInput) {
          fireEvent.change(emailInput, {
            target: { value: "batuhankir1163gmail.com" },
          });

          fireEvent.submit(form);

          await waitFor(() => expect(screen.getByText(/Email is not valid/i)));
        }
      }
    });
  });
});
