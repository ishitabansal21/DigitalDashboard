import React, { useState, useEffect } from "react";

function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
        Pomodoro Timer
      </h2>
      <div className="text-6xl font-bold text-center mb-6 text-indigo-600">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className={`px-6 py-2 rounded-full font-semibold ${
            isActive ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
          onClick={toggleTimer}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          className="px-6 py-2 rounded-full bg-gray-300 text-gray-800 font-semibold"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
