import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogsForm from "./BlogsForm";
import userEvent from "@testing-library/user-event";

test("<BlogNoteForm/>", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogsForm createBlog={createBlog} />);

  const input = screen.getAllByRole("textbox");
  const send = screen.getByText("Add blog");

  await user.type(input[0], "testing form");
  await user.type(input[1], "tester");
  await user.type(input[2], "test");
  await user.click(send);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing form");
});
