import { screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import Dashboard from "./Dashboard";
import "@testing-library/jest-dom";

describe("Dashboard", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>
    );
  });

  it("delete button test", async () => {
    expect(
      await screen.findByText(/you dont have any tour lets your first tour/i)
    ).toBeInTheDocument();
  });
});
