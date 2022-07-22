import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

export default function Filter({ filter }) {
  const dispatch = useDispatch();
  return (
    <div>
      filter
      <input onChange={(e) => dispatch(setFilter(e.target.value))} />
    </div>
  );
}
