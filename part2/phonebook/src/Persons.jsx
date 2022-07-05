import React from "react";

export default function Persons({ persons, onDelete }) {
  return (
    <div>
      <ul>
        {persons.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}
            <button onClick={() => onDelete(p)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
