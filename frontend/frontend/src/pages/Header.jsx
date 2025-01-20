import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const Summary = "Summary";
  const Su = "Su";
  const MEETING = "MEETING";
  const ME = "ME";
  const [Su_text, Su_setText] = useState(Su);
  const [ME_text, ME_setText] = useState(ME);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeout;

    if (isHovered) {
      // 마우스 올릴 때 확장
      timeout = animateText(Su, Summary, Su_setText);
      timeout = animateText(ME, MEETING, ME_setText);
    } else {
      // 마우스 내릴 때 축소
      timeout = animateText(Summary, Su, Su_setText);
      timeout = animateText(MEETING, ME, ME_setText);
    }

    return () => clearTimeout(timeout);
  }, [isHovered]);

  const animateText = (start, end, callback) => {
    const steps = [];
    const maxLength = Math.max(start.length, end.length);

    if (start.length <= end.length) {
      // 확장 애니메이션
      for (let i = 2; i <= maxLength; i++) {
        steps.push(end.substring(0, i));
      }
    } else {
      // 축소 애니메이션
      for (let i = start.length; i >= 2; i--) {
        steps.push(start.substring(0, i));
      }
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        callback(steps[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return interval;
  };

  return (
    <header className="bg-gray-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          className="relative w-64 h-12 flex items-center justify-center hover:bg-gray-500 rounded-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          to="/"
        >
          <Link
            to="/"
            className="block text-white text-xl font-bold transition-all duration-300 text-center"
          >
            {Su_text}
            {ME_text}
          </Link>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <Link
            to="/main"
            className="text-white text-sm font-medium hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
          >
            Main
          </Link>
          <Link
            to="/login"
            className="text-white text-sm font-medium hover:bg-gray-600 px-4 py-2 rounded transition duration-300"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
