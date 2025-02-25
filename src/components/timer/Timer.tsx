// components/Timer.tsx
import { useState, useEffect } from "react";

interface TimerProps {
  expiryDate?: string; // Make expiryDate optional
}

const Timer: React.FC<TimerProps> = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!expiryDate) {
      return; // Do nothing if no expiry date is provided
    }

    const calculateTimeLeft = (expiryDate: string) => {
      const now = new Date().getTime();
      const end = new Date(expiryDate).getTime();
      const distance = end - now;

      if (distance <= 0) return null;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    const updateTimer = () => {
      const result = calculateTimeLeft(expiryDate);
      setTimeLeft(result || { days: 0, hours: 0, minutes: 0, seconds: 0 });
    };

    updateTimer(); // Initial call to set the time left
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return (
    <div className="flex items-center justify-center space-x-1 rounded-lg text-zinc-800 md:space-x-3">
      <div className="flex flex-col items-center rounded-md border border-black bg-zinc-200 p-2">
        <span className="text-2xl font-bold md:text-4xl">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase md:text-sm">Days</span>
      </div>
      <p className="text-4xl font-bold">:</p>
      <div className="flex flex-col items-center rounded-md border border-black bg-zinc-200 p-2">
        <span className="text-2xl font-bold md:text-4xl">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase md:text-sm">Hours</span>
      </div>
      <p className="text-4xl font-bold">:</p>
      <div className="flex flex-col items-center rounded-md border border-black bg-zinc-200 p-2">
        <span className="text-2xl font-bold md:text-4xl">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase md:text-sm">Minutes</span>
      </div>
      <p className="text-4xl font-bold">:</p>
      <div className="flex flex-col items-center rounded-md border border-black bg-zinc-200 p-2">
        <span className="text-2xl font-bold md:text-4xl">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-xs uppercase md:text-sm">Seconds</span>
      </div>
    </div>
  );
};

export default Timer;
