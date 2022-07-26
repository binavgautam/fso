import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { setNotification } from "./reducers/notificationReducer";
import { loggedIn } from "./reducers/userReducer";
import blogService from "./services/blogService";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    dispatch(loggedIn());
  }, []);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  // const handleLogin = async (newUser) => {
  //   try {
  //     dispatch(login(newUser));
  //     dispatch(setNotification("Successfully logged in"));
  //     return true;
  //   } catch (exception) {
  //     dispatch(setNotification("Wrong credentials", "error"));
  //     return false;
  //   }
  // };

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog);
      console.log(blog);
      blog.user = user;
      setBlogs(blogs.concat(blog));
      dispatch(setNotification("New Blog added"));
      return true;
    } catch (exception) {
      dispatch(setNotification("Can not add new blog", "error"));
      return false;
    }
  };

  const likeBlog = async (blog, id) => {
    try {
      const updatedBlog = await blogService.updateBlog(id, blog);
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
      dispatch(setNotification("Blog Liked", "success"));
    } catch (error) {
      console.log(error);
      dispatch(setNotification(error, "error"));
    }
  };

  const deleteBlog = async (blogDelete, id) => {
    if (blogDelete.user.username !== user.username) {
      dispatch(setNotification("Sorry, You cannot delete this blog!", "error"));
      return;
    }
    try {
      console.log(id);
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((p) => p !== blogDelete));
      dispatch(setNotification(`${blogDelete.title} deleted successfully`));
    } catch (error) {
      dispatch(
        setNotification(
          `${blogDelete.name} does not exist. Please refresh`,
          "error"
        )
      );
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Blogs
        createBlog={createBlog}
        blogs={sortedBlogs}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  );
};

export default App;
