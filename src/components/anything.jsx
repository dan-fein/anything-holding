"use client";

import React, { useEffect, useState, useMemo } from "react";

export default function AnythingComponent() {
  const [wordCount, setWordCount] = useState(50);

  useEffect(() => {
    const calculateWordCount = () => {
      const width = window.innerWidth;

      if (width > 1200) {
        setWordCount(50); // Desktop
      } else if (width > 768) {
        setWordCount(30); // Tablet
      } else {
        setWordCount(15); // Mobile
      }
    };

    calculateWordCount();
    window.addEventListener("resize", calculateWordCount);

    return () => window.removeEventListener("resize", calculateWordCount);
  }, []);

  const words = useMemo(
    () =>
      Array.from({ length: wordCount }, () => ({
        color: `hsl(0, 0%, ${Math.random() * 10 + 5}%)`,
        fontSize: `${Math.random() * 3 + 1}rem`,
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        rotation: `${Math.random() * 360}deg`,
      })),
    [wordCount]
  );

  return (
    <div className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      {words.map((style, i) => (
        <span
          key={i}
          className="absolute font-bold text-black"
          style={{
            color: style.color,
            fontSize: style.fontSize,
            top: style.top,
            left: style.left,
            transform: `rotate(${style.rotation})`,
          }}
        >
          Anything
        </span>
      ))}
    </div>
  );
}
