import { useDispatch, useSelector } from "react-redux";
import { likeBlogAction, removeBlogAction } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import Comments from "./Comments";

export default function Blog({ blog }) {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

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

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Url: {blog.url}</p>
      <p>
        Likes: {blog.likes}
        <button id="like" type="button" onClick={() => likeBlog(blog.id, blog)}>
          like
        </button>
      </p>
      <p>-by {blog.author}</p>
      <Comments blogComments={blog.comments} id={blog.id} />
      <button
        id="delete"
        type="button"
        onClick={() => deleteBlog(blog.id, blog)}
      >
        delete
      </button>
    </div>
  );
}
