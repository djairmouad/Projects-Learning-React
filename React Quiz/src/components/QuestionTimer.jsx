import { useEffect, useState } from "react";

export default function QuestionTimer({ Timer, onTimeout,mode }) {
  const [remainingTime, setRemainingTime] = useState(Timer);

  useEffect(() => {
    console.log("Setting Timeout");
    const timeoutId = setTimeout(() => {
      onTimeout();
    }, Timer);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onTimeout, Timer]);

  useEffect(() => {
    console.log("Setting Interval");
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <progress id="question-time" max={Timer} value={remainingTime} className={mode}/>;
}
