import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../../../app/store";
import CommentForm from "./CommentForm";

const submit = jest.fn();

describe("Comment Form", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <CommentForm submit={submit} />
        </Provider>
      </BrowserRouter>
    );
  });

  it("form validation", async () => {
    fireEvent.change(await screen.findByPlaceholderText("add comment ..."), {
      target: { value: "FENERBAHCE" },
    });

    expect(await screen.findByPlaceholderText("add comment ...")).toHaveValue(
      "FENERBAHCE"
    );

    fireEvent.click(await screen.findByTestId("submit"));

    await waitFor(() => expect(submit).toHaveBeenCalled());
  });
});
