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
import { store } from "../../../app/store";
import Register from "./Register";
import { BrowserRouter, Route } from "react-router-dom";

const login = jest.fn();

describe("Register", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Register login={login} />
        </Provider>
      </BrowserRouter>
    );
  });

  describe("form validation", () => {
    afterEach(cleanup);
    it("if valid", async () => {
      const firstname = await screen.findByTestId("firstname");
      const lastname = await screen.findByTestId("lastname");
      const email = await screen.findByTestId("email");
      const password = await screen.findByTestId("password");
      const password2 = await screen.findByTestId("password2");

      const form = await screen.findByTestId("form");

      if (password && email && firstname && lastname && password2) {
        const firstnameInput = firstname.querySelector("input");
        const lastnameInput = lastname.querySelector("input");
        const emailInput = email.querySelector("input");
        const passInput = password.querySelector("input");
        const pass2Input = password2.querySelector("input");

        if (
          passInput &&
          emailInput &&
          firstnameInput &&
          lastnameInput &&
          pass2Input
        ) {
          fireEvent.change(firstnameInput, {
            target: { value: "batuhan" },
          });
          fireEvent.change(lastnameInput, {
            target: { value: "kır" },
          });
          fireEvent.change(emailInput, {
            target: { value: "batuhankir1163@gmail.com" },
          });
          fireEvent.change(passInput, {
            target: { value: "password" },
          });
          fireEvent.change(pass2Input, {
            target: { value: "password" },
          });
          fireEvent.submit(form);
          await waitFor(() => expect(login).toHaveBeenCalled());
        }
      }
    });
    it("if not valid", async () => {
      const password = await screen.findByTestId("password");
      const password2 = await screen.findByTestId("password2");
      const form = await screen.findByTestId("form");

      if (password && password2) {
        const passInput = password.querySelector("input");
        const pass2Input = password2.querySelector("input");
        if (passInput && pass2Input) {
          fireEvent.change(passInput, {
            target: { value: "password" },
          });
          fireEvent.change(pass2Input, {
            target: { value: "password2" },
          });

          fireEvent.submit(form);

          await waitFor(() =>
            expect(
              screen.getByText("Password does not match")
            ).toBeInTheDocument()
          );
        }
      }
    });
  });
});
