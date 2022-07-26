import { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import userService from "../services/userService";
import User from "./User";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((res) => setUsers(res));
  }, []);

  const match = useMatch("/user/:id");
  const user = match
    ? user.find((a) => a.id === Number(match.params.id))
    : null;

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
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              </Link>
            </div>
          ))}
        </tbody>
      </table>
      <Routes>
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  );
}
