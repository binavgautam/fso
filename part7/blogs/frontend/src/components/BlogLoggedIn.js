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

  const toDelete = (blog) => {
    const blogId = blog.id;
    if (window.confirm(`Do you want to delete ${blog.title} ?`)) {
      deleteBlog(blog, blogId);
    }
  };

  const toUpdate = (blog) => {
    const blogId = blog.id;
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(updatedBlog, blogId);
  };

  return (
    <div style={blogStyle}>
      {!showBlog ? (
        <div className="togglableContent">
          <p>
            {blog.title}
            <button id="view" type="button" onClick={toggleBlog}>
              view
            </button>
          </p>
        </div>
      ) : (
        <>
          <p>
            {blog.title}
            <button type="button" onClick={toggleBlog}>
              hide
            </button>
          </p>
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button id="like" type="button" onClick={() => toUpdate(blog)}>
              like
            </button>
          </p>
          <p>-by {blog.author}</p>
          <button id="delete" type="button" onClick={() => toDelete(blog)}>
            delete
          </button>
        </>
      )}
    </div>
  );
};

export default BlogLoggedIn;
