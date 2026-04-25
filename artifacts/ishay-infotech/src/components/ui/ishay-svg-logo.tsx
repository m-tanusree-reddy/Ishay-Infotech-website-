import React from "react";

const IshaySVGLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M40 30C40 46.5685 26.5685 60 10 60C-6.56854 60 -20 46.5685 -20 30C-20 13.4315 -6.56854 0 10 0C26.5685 0 40 13.4315 40 30Z" fill="url(#paint0_linear)" />
    <path d="M20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30C0 24.4771 4.47715 20 10 20C15.5228 20 20 24.4771 20 30Z" fill="white" />
    <text x="50" y="42" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="42" fill="currentColor" letterSpacing="-1">
      i<tspan fill="#2563eb">SHAY</tspan>
    </text>
    <defs>
      <linearGradient id="paint0_linear" x1="-20" y1="0" x2="40" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

export default IshaySVGLogo;