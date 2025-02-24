import React, { useState, useEffect } from "react";
import "./App.css";

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "The journey of a thousand miles begins with a single step.",
  "Difficulties in life are intended to make us better, not bitter.",
  "It always seems impossible until it's done.",
  "One step at a time, one day at a time, you got this!"
];

function App() {
  const [streak, setStreak] = useState(parseInt(localStorage.getItem("streak")) || 0);
  const [quote, setQuote] = useState("");
  const [animation, setAnimation] = useState(""); // Stores the animation class

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  const increaseStreak = () => {
    if (streak < 30) {
      setStreak(streak + 1);
      setAnimation("shake"); // Apply shake animation
      setTimeout(() => setAnimation(""), 1000); // Remove animation after 1 sec
    }
  };

  const resetStreak = () => {
    setAnimation("fall"); // Apply fall animation
    setTimeout(() => {
      setStreak(0);
      setAnimation(""); // Remove animation after 5 sec
    }, 5000);
  };

  return (
    <div className={`container fade-in ${animation}`}>
      <img src="/miku.jpg" alt="Nakano Miku" className="miku" />
      <h1>Stay Strong!</h1>
      <p id="quote">{quote}</p>
      <h2>Current Streak: {streak} days</h2>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(streak / 30) * 100}%` }}></div>
      </div>

      <button className="success" onClick={increaseStreak}>I Got This</button>
      <button className="fail" onClick={resetStreak}>I Failed</button>

      {streak === 30 && (
        <div className="reward">
          <h2>🎉 Congratulations! You reached 30 days! I am sooo proud of you 🎉</h2>
          <img src="/mikumikubeam.jpg" alt="Miku Reward" className="reward-image" />
          <audio autoPlay>
            <source src="/miku_voice.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
}

export default App;
