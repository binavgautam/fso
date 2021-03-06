import { useField } from "../hooks/useField";

const NewForm = ({ addNew }) => {
  const content = useField("");
  const author = useField("");
  const info = useField("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const reset = () => {
    content.reset();
    author.reset();
    info.reset();
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fields} />
        </div>
        <div>
          author
          <input {...author.fields} />
        </div>
        <div>
          url for more info
          <input {...info.fields} />
        </div>
        <button>create</button>
        <button type="button" onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default NewForm;
