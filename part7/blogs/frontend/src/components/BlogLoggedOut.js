import React from "react";
import { useSelector } from "react-redux";

export default function BlogLoggedOut() {
  const blogs = useSelector(({ blogs }) => blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <h2 key={blog.id}>{blog.title} </h2>
      ))}
    </div>
  );
}
