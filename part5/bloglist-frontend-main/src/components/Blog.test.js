import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog", () => {
  const blog = {
    title: "Blog Title",
    author: "Blog Author",
    url: "Blog URL",
    likes: 0,
    user: {
      username: "Blog User",
      name: "Blog User Name",
      id: "Blog User ID",
    },
    id: "Blog ID",
  };
  test("renders title/author but not whole blog", () => {
    const component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent("Blog Title");
    expect(component.container).toHaveTextContent("Blog Author");
    expect(component.container).not.toHaveTextContent("Blog URL");
    expect(component.container).not.toHaveTextContent("Blog User");
    expect(component.container).not.toHaveTextContent("Blog User Name");
    expect(component.container).not.toHaveTextContent("Blog User ID");
    expect(component.container).not.toHaveTextContent("Blog ID");
  });
});
