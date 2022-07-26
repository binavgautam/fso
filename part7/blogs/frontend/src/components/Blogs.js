import { useState } from "react";
import { useSelector } from "react-redux";
import BlogLoggedIn from "./BlogLoggedIn";
import BlogLoggedOut from "./BlogLoggedOut";
import BlogsForm from "./BlogsForm";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

export default function Blogs({ createBlog, blogs, likeBlog, deleteBlog }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(true);

  const user = useSelector(({ user }) => user);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleBlogForm = () => {
    setShowBlogForm(!showBlogForm);
  };

  return (
    <div>
      {!user ? (
        <>
          {!showLogin ? (
            <>
              <p>Login to add/view Blogs</p>
              <button id="loginFormButton" type="button" onClick={toggleLogin}>
                Login
              </button>
              {blogs.map((blog) => (
                <BlogLoggedOut key={blog.id} blog={blog} />
              ))}
            </>
          ) : (
            <>
              <LoginForm />
              <button type="button" onClick={toggleLogin}>
                Cancel
              </button>
            </>
          )}
        </>
      ) : (
        <>
          {console.log("here")}
          <h2>
            Hello {user.username}! <Logout />
          </h2>
          {blogs.map((blog) => (
            <BlogLoggedIn
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
            />
          ))}
          {!showBlogForm ? (
            <>
              <BlogsForm
                createBlog={createBlog}
                toggleBlogForm={toggleBlogForm}
              />
              <button type="button" onClick={toggleBlogForm}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button id="newBlog" type="button" onClick={toggleBlogForm}>
                Add New Blog
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
