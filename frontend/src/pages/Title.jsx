import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Title = ( {isClick} ) => {
  const Summary = "Summary";
  const Su = "Su";
  const MEETING = "MEETING";
  const ME = "ME";
  const [Su_text, Su_setText] = useState(Su);
  const [ME_text, ME_setText] = useState(ME);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    let timeout;

    if (isHovered && !isClick) {
      // 마우스 올릴 때 확장
      timeout = animateText(Su, Summary, Su_setText);
      timeout = animateText(ME, MEETING, ME_setText);
    } else if(!isClick) {
      // 마우스 내릴 때 축소
      timeout = animateText(Summary, Su, Su_setText);
      timeout = animateText(MEETING, ME, ME_setText);
    }

    return () => clearTimeout(timeout);
  }, [isHovered, isClick]);

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

  return(
    <div className="lg:w-full">
      <Link
        className="relative h-12 flex items-center justify-center"
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
    </div>
  )
}

export default Title