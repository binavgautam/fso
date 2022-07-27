import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Users() {
  const users = useSelector(({ users }) => users);

  console.log(users);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>users</th>
            <th>blogs</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
