import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) =>
    blogs.slice().sort((a, b) => b.likes - a.likes)
  );
  const user = useSelector(({ user }) => user);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      {blogs.map((blog) => (
        <h2 key={blog.id}>
          <div style={blogStyle}>
            {user ? (
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            ) : (
              <>{blog.title}</>
            )}
          </div>
        </h2>
      ))}
    </div>
  );
};

export default BlogList;
