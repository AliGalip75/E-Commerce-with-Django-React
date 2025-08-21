import { Link } from 'react-router-dom';
import React from "react";

const Logo = React.memo(() => {
  return (
    <Link to="/">
      <div className="drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-40 fill-black dark:fill-white transition-all duration-300"
        >
          <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
            <path d="M1791 5088 c-5 -13 -407 -1153 -894 -2534 -488 -1381 -889 -2518 -893 -2528 -6 -16 26 -17 582 -14 643 4 624 3 749 65 157 79 307 267 386 483 47 131 1591 4513 1597 4533 4 16 -37 17 -757 17 l-761 0 -9 -22z"/>
            <path d="M3510 4504 c-6 -16 -178 -501 -381 -1079 l-370 -1050 322 -915 c177 -503 336 -946 354 -985 104 -227 257 -376 455 -441 50 -16 108 -18 644 -22 565 -3 588 -3 582 15 -4 10 -363 1026 -798 2258 -434 1232 -792 2242 -794 2244 -2 2 -8 -9 -14 -25z"/>
          </g>
        </svg>
      </div>
    </Link>
  );
});

export default Logo;