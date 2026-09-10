import React from 'react';

export default function Logo({
  variant = 'horizontal',
  accentColor = 'var(--color-brass)',
  textColor = 'var(--color-text)',
  className = '',
  height = 42,
}) {
  if (variant === 'icon') {
    return (
      <svg
        width={height}
        height={height}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="ამარა სასტუმროს ემბლემა"
      >
        {/* Outer brass ring echoing 3D chandelier */}
        <circle cx="18" cy="18" r="15" stroke={accentColor} strokeWidth="1.6" />
        {/* Delicate inner concentric halo ring */}
        <circle
          cx="18"
          cy="18"
          r="10"
          stroke={accentColor}
          strokeWidth="0.8"
          strokeDasharray="2.5 2.5"
          strokeOpacity="0.75"
        />
        {/* Center optical sphere */}
        <circle cx="18" cy="18" r="3.2" fill={accentColor} />
        {/* Suspension stay */}
        <line x1="18" y1="0" x2="18" y2="3" stroke={accentColor} strokeWidth="1.4" />
      </svg>
    );
  }

  return (
    <svg
      height={height}
      viewBox="0 0 195 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="სასტუმრო ამარა ლოგო"
    >
      {/* Architectural Brass Ring Motif */}
      <g transform="translate(4, 4)">
        <circle cx="18" cy="18" r="15" stroke={accentColor} strokeWidth="1.6" />
        <circle
          cx="18"
          cy="18"
          r="10"
          stroke={accentColor}
          strokeWidth="0.8"
          strokeDasharray="2.5 2.5"
          strokeOpacity="0.7"
        />
        <circle cx="18" cy="18" r="3.2" fill={accentColor} />
        <line x1="18" y1="0" x2="18" y2="3" stroke={accentColor} strokeWidth="1.4" />
      </g>

      {/* Georgian Wordmark "ამარა" in refined serif */}
      <text
        x="48"
        y="25"
        fontFamily="'Noto Serif Georgian', 'Playfair Display', Georgia, serif"
        fontSize="21"
        fontWeight="600"
        fill={textColor}
        letterSpacing="0.06em"
      >
        ამარა
      </text>

      {/* Subtitle "სასტუმრო • თბილისი" */}
      <text
        x="49"
        y="37"
        fontFamily="'Noto Sans Georgian', 'Inter', sans-serif"
        fontSize="8.5"
        fontWeight="500"
        fill={accentColor}
        letterSpacing="0.22em"
      >
        სასტუმრო • თბილისი
      </text>
    </svg>
  );
}
