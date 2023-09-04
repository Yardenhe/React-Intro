import { useState, useRef, useEffect } from "react";

export function CountDown({ startFrom, toTime, onDone }) {
  // const [clock, setClock] = useState(startFrom);
  const [remainingTime, setRemainingTime] = useState(
    toTime ? toTime - Date.now() : Math.max(0, startFrom * 1000)
  );

  //const intervalIdRef = useRef();
  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // useEffect(() => {
  //   console.log("Counter Mounted");
  //   intervalIdRef.current = setInterval(() => {
  //     if (clock > 0) setClock((prevCount) => prevCount - 1);
  //     else {
  //       onDone();

  //       clearInterval(intervalIdRef.current);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalIdRef.current);
  //   };
  // }, [clock]);

  useEffect(() => {
    if (remainingTime <= 0) {
      onDone();
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        const newRemainingTime = prevRemainingTime - 1000;
        if (newRemainingTime <= 0) {
          clearInterval(interval);
          onDone();
          return 0;
        }
        return newRemainingTime;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return (
    <table>
      <tbody>
        <tr>
          <td className={clock < 7 ? "red" : " "}>
            {formatTime(remainingTime)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
