import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogExpanded from "./BlogExpanded";

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
  test("renders title/author/url/likes after expanding blog to expanded blog", () => {
    const component = render(
      <div className="Blog" key={blog.id}>
        <Blog key={blog.id} blog={blog} />
        <Togglable buttonLabel="view" buttonHideLabel="hide">
          <BlogExpanded blog={blog} />
        </Togglable>
      </div>
    );
    const button = component.getByText("view");
    act(() => {
      button.click();
    });

    expect(component.container).toHaveTextContent("Blog Title");
    expect(component.container).toHaveTextContent("Blog Author");
    expect(component.container).toHaveTextContent("Blog URL");
    expect(component.container).toHaveTextContent("Blog User");
    expect(component.container).toHaveTextContent("Blog User Name");
  });
});
