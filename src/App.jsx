import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          let seconds = prevTime.seconds + 1;
          let minutes = prevTime.minutes;
          let hours = prevTime.hours;

          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }

          if (minutes === 60) {
            minutes = 0;
            hours += 1;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else if (!isRunning) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  function resetTimer() {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
  }

  return (
    <main>
      <h2>Stopwatch</h2>
      <div className="stopwatch-wrapper">
        <div>
          <span>
            {time.hours.toString().padStart(2, "0")}:
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="button-stack">
        {isRunning ? (
          <button onClick={() => setIsRunning(false)}>Stop</button>
        ) : (
          <button onClick={() => setIsRunning(true)}>Start</button>
        )}

        <button onClick={resetTimer}>Reset</button>
      </div>
    </main>
  );
}

export default App;
