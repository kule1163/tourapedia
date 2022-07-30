import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import { EntitieProps } from "../../../features/posts/types";
import SingleFilteredPost from "./SingleFilteredPost";
import "@testing-library/jest-dom";

const filteredPost: EntitieProps = {
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
  postImage: {
    url: "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg",
    public_id: "default",
  },
  likes: ["62aa294334bef8254dc5658e"],
  dislikes: ["62aa294334bef8254dc51907"],
  createdAt: "2022-06-15T18:47:42.639+00:00",
  updatedAt: "2022-06-15T18:47:42.639+00:00",
};

describe("Filtered Posts", () => {
  it("filtered posts", async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SingleFilteredPost filteredPost={filteredPost} />
        </Provider>
      </BrowserRouter>
    );
    expect(((await screen.findByRole("img")) as HTMLImageElement).src).toBe(
      "https://res.cloudinary.com/da30n9tw5/image/upload/v1659043847/cld-sample-2.jpg"
    );
  });
});
