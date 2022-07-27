import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogService";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
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
export const { setBlogs, addBlog, like, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlogAction = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.createBlog(newBlog);
    dispatch(addBlog(blog));
  };
};

export const likeBlogAction = (id, blog) => {
  const updated = { ...blog, likes: blog.likes + 1 };
  return async (dispatch) => {
    const response = await blogService.updateBlog(id, updated);
    dispatch(like(response));
  };
};

export const removeBlogAction = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(remove(id));
  };
};
