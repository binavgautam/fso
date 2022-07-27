import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogsReducer";
import { loggedIn } from "./reducers/loginReducer";
import { Link, Routes, Route, useMatch } from "react-router-dom";
import Users from "./components/Users";
import { initializeUsers } from "./reducers/userReducer";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(loggedIn());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const padding = {
    padding: 5,
  };

  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  const userMatch = useMatch("/users/:id");
  const blogMatch = useMatch("/blogs/:id");

  const user = userMatch
    ? users.find((a) => a.id === userMatch.params.id)
    : null;
  const blog = blogMatch
    ? blogs.find((a) => a.id === blogMatch.params.id)
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
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<User user={user} />}></Route>
        <Route path="/blogs/:id" element={<Blog blog={blog} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
