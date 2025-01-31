import React from "react";
import { Link } from "react-router-dom";

const Title = () => {
  return(
    <div>
      <Link
        to="/"
        className="block text-2xl font-bold transition-all duration-200 text-center text-gray-500 hover:text-pink-400"
      >
        SuME
      </Link>
    </div>
  )
}

export default Title