import React, { useState, useEffect, useRef } from "react";
import { utilService } from "../services/util.service";

function getSeason(date) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) {
    return "spring";
  } else if (month >= 5 && month <= 7) {
    return "summer";
  } else if (month >= 8 && month <= 10) {
    return "autumn";
  } else {
    return "winter";
  }
}

export function SeasonClock(props) {
  const [isDark, setIsDark] = useState(false);
  const [date, setDate] = useState(new Date());
  const month = utilService.getMonthName(date);
  const day = utilService.getDayName(date);
  const season = getSeason(date);
  const imageSrc = `/img/${season}.png`;

  const [clock, setClock] = useState(new Date().getTime());

  const intervalIdRef = useRef();

  useEffect(() => {
    console.log("Counter Mounted");
    intervalIdRef.current = setInterval(() => {
      setClock((prevCount) => prevCount + 1000);
    }, 1000);
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  return (
    <button
      onClick={() => setIsDark((prevIsDarck) => !prevIsDarck)}
      className={"season-clock" + (isDark ? " dark" : " ")}
    >
      <h1>
        {month}({season})
      </h1>
      <img src={imageSrc} />
      <h2>{day}</h2>
      <h1>{new Date(clock).toLocaleString()}</h1>
    </button>
  );
}
