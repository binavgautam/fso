import { useState } from "react";
import BlogLoggedIn from "./BlogLoggedIn";
import BlogLoggedOut from "./BlogLoggedOut";
import BlogsForm from "./BlogsForm";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

export default function Blogs({
  user,
  handleLogin,
  createBlog,
  setUser,
  blogs,
  likeBlog,
  deleteBlog,
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(true);

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
              <button type="button" onClick={toggleLogin}>
                Login
              </button>
              {blogs.map((blog) => (
                <BlogLoggedOut key={blog.id} blog={blog} />
              ))}
            </>
          ) : (
            <>
              <LoginForm handleLogin={handleLogin} />
              <button type="button" onClick={toggleLogin}>
                Cancel
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <h2>
            Hello {user.username}!{" "}
            <Logout setUser={setUser} toggleLogin={toggleLogin} />
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
              <button type="button" onClick={toggleBlogForm}>
                Add New Note
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
