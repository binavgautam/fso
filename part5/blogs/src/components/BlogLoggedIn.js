import { useState } from "react";

const BlogLoggedIn = ({ blog, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showBlog, setShowBlog] = useState(false);

  const toggleBlog = () => {
    setShowBlog(!showBlog);
  };
  return (
    <div style={blogStyle}>
      {!showBlog ? (
        <>
          <p>
            <h3>{blog.title}</h3>
            <button type="button" onClick={toggleBlog}>
              view
            </button>
          </p>
        </>
      ) : (
        <>
          <p>
            <h3>{blog.title}</h3>
            <button type="button" onClick={toggleBlog}>
              hide
            </button>
          </p>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button type="button">like</button>
          </p>
          <p>-by {blog.author}</p>
          <button type="button">delete</button>
        </>
      )}
    </div>
  );
};

export default BlogLoggedIn;
