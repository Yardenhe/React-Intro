import { useState, useRef, useEffect } from "react";

export function CountDown({ startFrom, onDone }) {
  const [clock, setClock] = useState(startFrom);

  const intervalIdRef = useRef();

  useEffect(() => {
    console.log("Counter Mounted");
    intervalIdRef.current = setInterval(() => {
      if (clock > 0) setClock((prevCount) => prevCount - 1);
      else {
        onDone();

        clearInterval(intervalIdRef.current);
      }
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [clock]);

  return (
    <table>
      <tbody>
        <tr>
          <td className={clock < 7 ? "red" : " "}>{clock}</td>
        </tr>
      </tbody>
    </table>
  );
}
