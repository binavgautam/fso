import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import blogService from "./services/blogService";
import loginService from "./services/loginService";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.tokenSetter(user.token);
    }
  }, []);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const notification = (message, type) => {
    setNotif({ message, type });
    setTimeout(() => {
      setNotif(null);
    }, 1000);
  };

  const handleLogin = async (newUser) => {
    try {
      const user = await loginService.login(newUser);
      console.log(user);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.tokenSetter(user.token);
      setUser(user);
      notification("Successfully logged in");
      return true;
    } catch (exception) {
      notification("Wrong credentials", "error");
      return false;
    }
  };

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog);
      console.log(blog);
      blog.user = user;
      setBlogs(blogs.concat(blog));
      notification("New Blog added");
      return true;
    } catch (exception) {
      notification("Can not add new blog", "error");
      return false;
    }
  };

  const likeBlog = async (blog, id) => {
    try {
      const updatedBlog = await blogService.updateBlog(id, blog);

      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
      notification("Blog Liked", "success");
    } catch (error) {
      console.log(error.response.data.error);
      notification(error.response.data.error, "error");
    }
  };

  const deleteBlog = async (blogDelete, id) => {
    if (blogDelete.user.username !== user.username) {
      notification("Sorry, You cannot delete this blog!", "error");
      return;
    }
    try {
      console.log(id);
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((p) => p !== blogDelete));
      notification(`${blogDelete.title} deleted successfully`, "success");
    } catch (error) {
      notification(
        `${blogDelete.name} does not exist. Please refresh`,
        "error"
      );
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      {notif && <Notification message={notif.message} type={notif.type} />}
      <Blogs
        user={user}
        handleLogin={handleLogin}
        createBlog={createBlog}
        setUser={setUser}
        blogs={sortedBlogs}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  );
};

export default App;
