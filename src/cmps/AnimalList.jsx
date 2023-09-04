import React from "react";
const { useEffect, useRef, useState } = React;

export function AnimalList(props) {
  console.log("props", props);
  const animals = props.animals;

  return (
    <section className="animal-list">
      <table>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.type}>
              <td>{animal.type}</td>
              <td>{animal.count}</td>
              <td>
                <a href={`https://www.google.com/search?q=${animal.type}`}>
                  Search
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
