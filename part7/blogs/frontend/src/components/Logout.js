export default function Logout({ setUser, toggleLogin }) {
  const handleCLick = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
    toggleLogin();
  };
  return (
    <div>
      <button onClick={handleCLick}>Logout</button>
    </div>
  );
}
