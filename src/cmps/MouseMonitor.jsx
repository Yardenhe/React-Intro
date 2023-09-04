import { useEffect, useState, useRef } from "react";

export function MouseMonitor(props) {
  const [isOn, setIsOn] = useState(true);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (isOn)
      document.onmousemove = (ev) => {
        setPos({ x: ev.clientX, y: ev.clientY });
      };
    else setPos({ x: 0, y: 0 });
    return () => {
      document.onmousemove = null;
    };
  }, [isOn]);

  return (
    <section className="mouse-container">
      <h1>Mouse Position</h1>
      <h2>
        X: {pos.x} Y: {pos.y}
      </h2>
      <button onClick={() => setIsOn((prev) => !prev)}>
        {isOn ? "Pause" : "Resume"}
      </button>
    </section>
  );
}
