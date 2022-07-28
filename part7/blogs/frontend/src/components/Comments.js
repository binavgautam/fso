import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { initializeBlogs } from "../reducers/blogsReducer";
import blogService from "../services/blogService";

export default function Comments({ blogComments, id }) {
  const commentForm = useField();
  const [comments, setComments] = useState(blogComments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { comment: commentForm.value };
    await blogService.createComment(id, newComment);
    setComments(comments.concat(commentForm.value));
    commentForm.reset();
  };

  return (
    <div>
      <h3>comments:</h3>
      {comments.map((c) => (
        <li key={c}>{c}</li>
      ))}
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" {...commentForm.fields} />
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
}
