import React from "react";
import GoogleSlide from "./components/GoogleSlide";
import PomodoroTimer from "./components/Pomodoro";
import MusicPlayer from "./components/MusicPlayer";
import GoogleSheet from "./components/GoogleSheet";
import GoogleForm from "./components/GoogleForm";
import GoogleFitWidget from "./components/Fitness";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Digital Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <GoogleSlide />
        <GoogleForm />
        <GoogleSheet />
        <GoogleFitWidget />
        <PomodoroTimer />
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
