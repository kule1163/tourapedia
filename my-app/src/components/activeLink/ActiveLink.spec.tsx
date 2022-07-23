import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import ActiveLink from "./ActiveLink";
import "@testing-library/jest-dom";

describe("active link", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ActiveLink to="/" />
        </Provider>
      </BrowserRouter>
    );
  });

  it("activelink test", () => {
    expect(screen.getByTestId("active-link")).toHaveStyle(
      "color: rgb(244, 67, 54)"
    );
  });
});
