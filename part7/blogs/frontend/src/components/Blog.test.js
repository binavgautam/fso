import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogLoggedIn from "./BlogLoggedIn";

describe("<BlogLoggedIn/>", () => {
  let blog;
  let mockLikeHandler;
  let mockDeleteHandler;

  beforeEach(() => {
    blog = {
      title: "test blog",
      author: "tester",
      url: "test",
      user: { username: "root" },
      likes: 10,
    };

    mockLikeHandler = jest.fn();
    mockDeleteHandler = jest.fn();

    render(
      <BlogLoggedIn
        blog={blog}
        likeBlog={mockLikeHandler}
        deleteBlog={mockDeleteHandler}
      />
    ).container;
  });

  test("renders content", () => {
    const element = screen.getByText("test blog");
    expect(element).toBeDefined();
  });

  test("after clicking view, content is displayed", async () => {
    const user = userEvent.setup();
    const view = screen.getByText("view");

    await user.click(view);

    const element = screen.getByText("Url: test");
    expect(element).toBeDefined();
  });

  test("button click calls event handler correctly", async () => {
    const user = userEvent.setup();
    const view = screen.getByText("view");
    await user.click(view);

    const like = screen.getByText("like");
    await user.click(like);
    await user.click(like);
    expect(mockLikeHandler.mock.calls).toHaveLength(2);

    const deleteB = screen.getByText("delete");
    await user.click(deleteB);
    window.confirm = jest.fn().mockImplementation(() => true);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockDeleteHandler.mock.calls).toHaveLength(1);
  });
});
