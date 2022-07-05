import React from "react";

export default function Search({ value, onChange }) {
  return (
    <div>
      search :
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}
