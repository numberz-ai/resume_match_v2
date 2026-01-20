import React, { useState } from 'react';
import logoImage from '../assets/logo.png';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 32 }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    // Fallback placeholder if image doesn't load
    return (
      <div
        className={`${className} bg-primary rounded flex items-center justify-center flex-shrink-0`}
        style={{ width: size, height: size }}
      >
        <span className="text-base font-medium text-white">R</span>
      </div>
    );
  }

  return (
    <img
      src={logoImage}
      alt="RecruiX Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
      onError={() => setImageError(true)}
    />
  );
}
