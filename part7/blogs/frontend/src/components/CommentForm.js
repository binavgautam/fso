// import { useSelector } from "react-redux";
import { useField } from "../hooks/useField";
import blogService from "../services/blogService";

export default function CommentForm({ id, flag, setFlag }) {
  const comment = useField();
  //   const blog = useSelector(({ blogs }) => blogs.find((b) => b.id === id));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { comment: comment.value };
    console.log(newComment);
    console.log(id);
    await blogService.createComment(id, newComment);
    console.log("awaited");
    comment.reset();
    setFlag(!flag);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" {...comment.fields} />
        <button>add</button>
      </form>
    </div>
  );
}
