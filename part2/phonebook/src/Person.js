import React from "react";

const Person = ({ person }) => {
  return (
    <div class="arr">
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    </div>
  );
};

export default Person;
