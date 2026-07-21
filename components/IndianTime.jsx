"use client";

import { useEffect, useState } from "react";

export default function IndianTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-[Cinzel] text-white">
      <div className="text-xs tracking-[0.4em] opacity-60">INDIA</div>
      <div className="text-lg tracking-[0.35em]">
        {time} <span className="opacity-60">IST</span>
      </div>
    </div>
  );
}