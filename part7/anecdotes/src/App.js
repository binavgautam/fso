import { useState } from "react";
import Menu from "./components/Menu";

const App = () => {
  const [notification, setNotification] = useState("");
  return (
    <div>
      <Menu />
    </div>
  );
};

export default App;
