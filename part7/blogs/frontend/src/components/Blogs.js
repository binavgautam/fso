import { useState } from "react";
import { useSelector } from "react-redux";
import BlogList from "./BlogList";
import BlogsForm from "./BlogsForm";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

export default function Blogs() {
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
              <BlogList />
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
          <h2>
            Hello {user.username}! <Logout />
          </h2>
          <BlogList />
          {!showBlogForm ? (
            <>
              <BlogsForm toggleBlogForm={toggleBlogForm} />
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
