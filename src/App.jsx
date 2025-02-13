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
    <main className="text-center mt-10">
      <h1 className="text-center text-xl mb-4 font-bold font-['Poppins']">
        Stopwatch
      </h1>
      <div className="flex justify-center items-center border-2 border-dotted border-[#242424] h-[250px] w-[250px] rounded-full mx-auto">
        <div>
          <span className="text-4xl font-bold font-['Poppins']">
            {time.hours.toString().padStart(2, "0")}:
            {time.minutes.toString().padStart(2, "0")}:
            {time.seconds.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex gap-2.5 mt-4 justify-center">
        {isRunning ? (
          <button
            onClick={() => setIsRunning(false)}
            className="w-24 py-2.5 bg-white border border-[#242424] font-['Poppins'] text-base cursor-pointer transition-all duration-300 ease-out hover:bg-[#242424] hover:text-white"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => setIsRunning(true)}
            className="w-24 py-2.5 bg-white border border-[#242424] font-['Poppins'] text-base cursor-pointer transition-all duration-300 ease-out hover:bg-[#242424] hover:text-white"
          >
            Start
          </button>
        )}

        <button
          onClick={resetTimer}
          className="w-24 py-2.5 bg-white border border-[#242424] font-['Poppins'] text-base cursor-pointer transition-all duration-300 ease-out hover:bg-[#242424] hover:text-white"
        >
          Reset
        </button>
      </div>
    </main>
  );
}

export default App;
