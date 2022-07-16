import { useState } from "react";

export default function BlogsForm({ createBlog, toggleBlogForm }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  ///const [likes, setLikes] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBLog = {
      title: title,
      author: author,
      url: url,
      //likes: likes,
    };
    const result = await createBlog(newBLog);
    if (result) {
      setTitle("");
      setAuthor("");
      setUrl("");
      toggleBlogForm();
      //setLikes(0);
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
            name="Title"
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
            name="Author"
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
            name="Url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        {/* <div>
          Likes
          <button type="button" onClick={() => setLikes(likes - 1)}>
            -
          </button>
          {likes}
          <button type="button" onClick={() => setLikes(likes + 1)}>
            +
          </button>
        </div> */}
        <button type="submit">Add blog</button>
      </form>
    </div>
  );
}
