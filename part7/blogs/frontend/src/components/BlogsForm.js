import { useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { createBlogAction } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function BlogsForm({ toggleBlogForm }) {
  const title = useField();
  const author = useField();
  const url = useField();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
      };
      console.log(newBlog);
      const result = dispatch(createBlogAction(newBlog));
      dispatch(setNotification("New Blog added"));
      if (result) {
        title.reset();
        author.reset();
        url.reset();
        toggleBlogForm();
      }
    } catch (e) {
      dispatch(setNotification("Can not add new blog", "error"));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input {...title.fields} />
        </div>
        <div>
          Author
          <input {...author.fields} />
        </div>
        <div>
          Url
          <input {...url.fields} />
        </div>
        <button id="addBlog" type="submit">
          Add blog
        </button>
      </form>
    </div>
  );
}
