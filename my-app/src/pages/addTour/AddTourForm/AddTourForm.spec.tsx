import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import AddTourForm from "./AddTourForm";
import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { EntitieProps } from "../../../features/posts/types";

const addPost = jest.fn();
const editPost = jest.fn();

const currentPost: EntitieProps = {
  _id: "62aa294e34bef8254dc56595",
  user: {
    _id: "62aa294334bef8254dc5658e",
    firstname: "batu",
    lastname: "kır",
  },
  title: "dsa",
  description: "dsa",
  category: "beach",
  tags: ["a", "b"],
  postImage: "5835be20-5485-4ad7-8503-23e9a191e2d8-1655318862553.jpg",
  likes: ["62aa294334bef8254dc5658e"],
  dislikes: ["62aa294334bef8254dc51907"],
  createdAt: "2022-06-15T18:47:42.639+00:00",
  updatedAt: "2022-06-15T18:47:42.639+00:00",
};

describe("Add Tour", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddTourForm addPost={addPost} />
        </Provider>
      </BrowserRouter>
    );
  });

  describe("form validation add", () => {
    afterEach(cleanup);
    it("if valid add", async () => {
      const newFile = new File(["hello"], "hello.png", {
        type: "image/png",
      });

      const title = await screen.findByTestId("title");
      const tags = await screen.findByTestId("tags");
      const description = await screen.findByTestId("description");
      const category = await screen.findByTestId("category");
      const file = await screen.findByTestId("file");

      const form = await screen.findByTestId("form");

      const titleInput = title.querySelector("input");
      const tagsInput = tags.querySelector("input");
      const categoryInput = category.querySelector("input");

      if (titleInput && tagsInput && categoryInput) {
        fireEvent.change(tagsInput, {
          target: { value: "tags" },
        });
        fireEvent.change(titleInput, {
          target: { value: "title" },
        });
        fireEvent.change(description, {
          target: { value: "description" },
        });
        fireEvent.change(categoryInput, { target: { value: "sea" } });
        fireEvent.change(file, { target: { files: [newFile] } });
        fireEvent.submit(form);
        await waitFor(() => expect(addPost).toHaveBeenCalled());
      }
    });
    it("if not valid", async () => {
      const newFile = new File(["hello"], "hello.png", {
        type: "image/txt",
      });

      const file = await screen.findByTestId("file");
      const form = await screen.findByTestId("form");

      fireEvent.change(file, { target: { files: [newFile] } });
      fireEvent.submit(form);

      await waitFor(() =>
        expect(screen.getByText(/Unsupported File Format/i)).toBeInTheDocument()
      );
    });
  });
});

describe("edit Tour", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AddTourForm currentPost={currentPost} editPost={editPost} />
        </Provider>
      </BrowserRouter>
    );
  });

  describe("form validation edit", () => {
    afterEach(cleanup);
    it("if valid edit", async () => {
      const newFile = new File(["hello"], "hello.png", {
        type: "image/png",
      });

      const title = await screen.findByTestId("title");
      const tags = await screen.findByTestId("tags");
      const description = await screen.findByTestId("description");
      const category = await screen.findByTestId("category");
      const file = await screen.findByTestId("file");

      const form = await screen.findByTestId("form");

      const titleInput = title.querySelector("input");
      const tagsInput = tags.querySelector("input");
      const categoryInput = category.querySelector("input");

      if (titleInput && tagsInput && categoryInput) {
        fireEvent.change(tagsInput, {
          target: { value: "tags" },
        });
        fireEvent.change(titleInput, {
          target: { value: "title" },
        });
        fireEvent.change(description, {
          target: { value: "description" },
        });
        fireEvent.change(categoryInput, { target: { value: "sea" } });
        fireEvent.change(file, { target: { files: [newFile] } });
        fireEvent.submit(form);
        await waitFor(() => expect(editPost).toHaveBeenCalled());
      }
    });
  });
});
