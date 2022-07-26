import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { logout } from "../reducers/userReducer";

export default function Logout() {
  const dispatch = useDispatch();
  const handleCLick = () => {
    dispatch(logout());
    dispatch(setNotification("Logged Out"));
  };
  return (
    <div>
      <button onClick={handleCLick}>Logout</button>
    </div>
  );
}
