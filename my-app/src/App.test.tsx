import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Router, BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";

describe("App", () => {
  it("check routes", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/populer tags/i)).toBeInTheDocument();

    const login = screen.getAllByText(/login/i);

    const user = userEvent.setup();

    await user.click(login[0]);

    expect(screen.getByTestId(/login-form/i)).toBeInTheDocument();
  });

  it("landing on a bad page", () => {
    const history = createMemoryHistory();
    history.push("/some/bad/route");
    render(
      <Router location={history.location} navigator={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    expect(screen.getByAltText(/page not found/i)).toBeInTheDocument();
  });
});
