import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];
  function transition(mode, replace = false) {
    if (!replace) {
      //Make a copy and add mode
      setHistory(prev => [...prev, mode]);
    } else {
      //replace the last element with new mode
      setHistory(prev => [...prev.slice(0, prev.length - 1), mode]);
    }
  }
  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  }
  return { mode, transition, back };
}