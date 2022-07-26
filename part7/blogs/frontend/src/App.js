import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogsReducer";
import { loggedIn } from "./reducers/userReducer";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(loggedIn());
  }, []);

  const padding = {
    padding: 5,
  };

  const match = useMatch("/user/:id");
  const user = match
    ? user.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Blogs</h1>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <Link style={padding} to="/">
          blogs
        </Link>
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
