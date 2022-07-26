import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlogAction, removeBlogAction } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogLoggedIn = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const [showBlog, setShowBlog] = useState(false);

  const toggleBlog = () => {
    setShowBlog(!showBlog);
  };

  // const toDelete = (blog) => {
  //   const blogId = blog.id;
  //   if (window.confirm(`Do you want to delete ${blog.title} ?`)) {
  //     deleteBlog(blog, blogId);
  //   }
  // };

  // const toUpdate = (blog) => {
  //   const blogId = blog.id;
  //   const updatedBlog = {
  //     ...blog,
  //     likes: blog.likes + 1,
  //   };
  //   likeBlog(updatedBlog, blogId);
  // };

  const likeBlog = (id, blog) => {
    try {
      dispatch(likeBlogAction(id, blog));
      dispatch(setNotification("Blog Liked", "success"));
    } catch (error) {
      console.log(error);
      dispatch(setNotification(error, "error"));
    }
  };

  const deleteBlog = (id, blogDelete) => {
    if (blogDelete.user.username !== user.username) {
      dispatch(setNotification("Sorry, You cannot delete this blog!", "error"));
      return;
    }
    try {
      dispatch(removeBlogAction(id));
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
            <button
              id="like"
              type="button"
              onClick={() => likeBlog(blog.id, blog)}
            >
              like
            </button>
          </p>
          <p>-by {blog.author}</p>
          <button
            id="delete"
            type="button"
            onClick={() => deleteBlog(blog.id, blog)}
          >
            delete
          </button>
        </>
      )}
    </div>
  );
};

export default BlogLoggedIn;
