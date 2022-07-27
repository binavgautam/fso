// import { useState } from "react";
import { login } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useField } from "../hooks/useField";
import { setNotification } from "../reducers/notificationReducer";

export default function LoginForm() {
  const username = useField("");
  const password = useField("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username.value,
      password: password.value,
    };
    // const res =
    dispatch(login(newUser));
    dispatch(setNotification("Successfully logged in"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input {...username.fields} />
        </div>
        <div>
          Password
          <input {...password.fields} />
        </div>
        <button id="loginButton" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
