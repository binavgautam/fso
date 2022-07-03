import React from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, id) => (
        <Part key={id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

export default function Course({ courses }) {
  return (
    <div>
      {courses.map((course) => (
        <>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
          <br />
        </>
      ))}
    </div>
  );
}
