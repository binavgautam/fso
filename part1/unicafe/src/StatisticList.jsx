import React from "react";

export default function StatisticList({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}
