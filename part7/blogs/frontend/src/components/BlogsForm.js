import { useState } from "react";

export default function BlogsForm({ createBlog, toggleBlogForm }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBLog = {
      title: title,
      author: author,
      url: url,
    };
    const result = await createBlog(newBLog);
    if (result) {
      setTitle("");
      setAuthor("");
      setUrl("");
      toggleBlogForm();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            value={title}
            id="title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            id="author"
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            id="url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        <button id="addBlog" type="submit">
          Add blog
        </button>
      </form>
    </div>
  );
}
