import React from "react";

export default function Input({ text, value, onChange }) {
  return (
    <div>
      {text}
      <input value={value} onChange={onChange} />
    </div>
  );
}
