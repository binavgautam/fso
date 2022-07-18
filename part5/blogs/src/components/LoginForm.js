import { useState } from "react";
import PropTypes from "prop-types";

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    const res = await handleLogin(newUser);
    if (res) {
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
