import React from "react";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const unicafe = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <div>good: {unicafe.good}</div>
      <button onClick={(e) => dispatch({ type: "GOOD" })}>good</button>
      <div>ok: {unicafe.ok}</div>
      <button onClick={(e) => dispatch({ type: "OK" })}>ok</button>
      <div>bad: {unicafe.bad}</div>
      <button onClick={(e) => dispatch({ type: "BAD" })}>bad</button>
      <br />
      <button onClick={(e) => dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
}

export default App;
