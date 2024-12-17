import React from "react";

const Background = ({top, left}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1000 1000"
      className={` absolute top-[${top}px] left-[${left}px] w-full h-full -z-10 scale-150 md:scale-100`}
    >
      <defs>
        <filter
          id="blur"
          x="-500"
          y="-500"
          width="2000"
          height="2000"
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
        </filter>
        <radialGradient
          id="radial-gradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="20%"
          fy="40%"
        >
          <stop offset="0%" stopColor="#354543" />
          <stop offset="100%" stopColor="rgba(65,55,81,1)" />
        </radialGradient>
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="30"
            result="noisy"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" in2="noisy" mode="multiply" />
        </filter>
        <clipPath id="shape">
          <path
            fill="currentColor"
            d="M935.5,776Q803,952,586,976.5Q369,1001,209.5,800.5Q50,600,198.5,381Q347,162,564.5,223Q782,284,925,442Q1068,600,935.5,776Z"
          />
        </clipPath>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="#09090b" />
      <g>
        <g filter="url(#blur)">
          <g
            // transform="translate(111.06483536295877, 98.4162318646093)"
            opacity="0.7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="750"
              height="750"
              viewBox="0 0 500 500"
            >
              <path
                fill="url(#radial-gradient)"
                d="M935.5,776Q803,952,586,976.5Q369,1001,209.5,800.5Q50,600,198.5,381Q347,162,564.5,223Q782,284,925,442Q1068,600,935.5,776Z"
              />
            </svg>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Background;
