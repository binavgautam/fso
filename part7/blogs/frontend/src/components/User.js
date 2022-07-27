export default function User({ user }) {
  if (!user) return null;
  return (
    <div>
      <h2>{user.username}</h2>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </div>
  );
}
