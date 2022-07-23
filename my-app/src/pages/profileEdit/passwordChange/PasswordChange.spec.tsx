import {
  screen,
  render,
  fireEvent,
  waitFor,
  findByText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import PasswordChange from "./PasswordChange";
import "@testing-library/jest-dom";

const submit = jest.fn();

describe("Password Change", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PasswordChange submit={submit} />
        </Provider>
      </BrowserRouter>
    );
  });

  it("form validation", async () => {
    fireEvent.change(screen.getByLabelText(/old password/i), {
      target: { value: "1907" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "1163" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "1163" },
    });

    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    await waitFor(() => expect(submit).toHaveBeenCalled());
  });

  it("password doesnt match", async () => {
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "1163" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "1160" },
    });

    fireEvent.click(screen.getByRole("button", { name: /change password/i }));

    expect(
      await screen.findByText(/Password does not match/i)
    ).toBeInTheDocument();
  });
});
