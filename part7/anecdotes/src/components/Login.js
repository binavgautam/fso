import React from "react";

export default function Login({ login }) {
  const onSubmit = (e) => {
    e.preventDefault();
    login(e.target.username.value);
  };
  return (
    <div>
      <h1>Login to create new anecdotes</h1>
      <form onSubmit={onSubmit}>
        username
        <input name="username" />
      </form>
    </div>
  );
}
