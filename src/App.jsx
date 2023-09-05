import { useState } from "react";

import { AnimalList } from "./cmps/AnimalList";
import { SeasonClock } from "./cmps/SeasonClock";
import { CountDown } from "./cmps/CountDown";
import { WatcherApp } from "./cmps/WatcherApp";
import { MouseMonitor } from "./cmps/MouseMonitor";

const animalInfos = [
  { type: "Malayan Tiger", count: 787 },
  { type: "Mountain Gorilla", count: 212 },
  { type: "Fin Whale", count: 28 },
];

export function App() {
  const [page, setPage] = useState("Animals");

  function onSetPage(ev, page) {
    ev.preventDefault();
    setPage(page);
  }

  return (
    <section className="main-app">
      <header className="container">
        <h1>Rare Animalsssss</h1>
        <nav>
          <a href="" onClick={(ev) => onSetPage(ev, "Animals")}>
            Animals
          </a>{" "}
          |
          <a href="" onClick={(ev) => onSetPage(ev, "SeasonClock")}>
            Season Clock
          </a>{" "}
          |
          <a href="" onClick={(ev) => onSetPage(ev, "CountDown")}>
            Count Down
          </a>{" "}
          |
          <a href="" onClick={(ev) => onSetPage(ev, "MouseMonitor")}>
            Mouse Monitor
          </a>
          |
          <a href="" onClick={(ev) => onSetPage(ev, "WatcherApp")}>
            Watcher App
          </a>
        </nav>
      </header>

      <main className="container">
        {page === "Animals" && <AnimalList animals={animalInfos} />}
        {page === "SeasonClock" && <SeasonClock />}
        {page === "CountDown" && (
          <CountDown
            startFrom={15}
            toTime={Date.now() + 1000 * 10}
            onDone={() => {
              console.log("Done!");
            }}
          />
        )}
        {page === "WatcherApp" && <WatcherApp />}
        {page === "MouseMonitor" && <MouseMonitor />}
      </main>
    </section>
  );
}
