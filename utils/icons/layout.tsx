import React from "react";

export const BackgroundPattern = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <pattern
        id="nodes"
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="50" cy="50" r="1" fill="#8B735B" />
        <line
          x1="50"
          y1="50"
          x2="0"
          y2="0"
          stroke="#8B735B"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="50"
          x2="100"
          y2="0"
          stroke="#8B735B"
          strokeWidth="0.5"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="100"
          stroke="#8B735B"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#nodes)" />
  </svg>
);

export const Squares2X2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

export const Close = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const CheckBadge = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const InformationCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);


