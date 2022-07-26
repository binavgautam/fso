import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogService";

const blogSlice = createSlice({
  name: "blogs",
  initialState: "",
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog() {},
    like(state, action) {
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
    },
    remove(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export default blogSlice.reducer;
export const { setBlogs, create, like, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = () => {
  return async (dispatch) => {
    const blog = await blogService.createBlog();
    dispatch(create(blog));
  };
};

export const likeBlog = (id, blog) => {
  const updated = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    const response = await blogService.updateBlog(updated);
    dispatch(like(response));
  };
};
export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(remove(id));
  };
};
