interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  subLabel?: string;
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb',
  label,
  subLabel,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 90) return '#10b981'; // green
    if (val >= 70) return '#3b82f6'; // blue
    if (val >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const actualColor = color === 'auto' ? getColor(value) : color;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={actualColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <span className="text-2xl text-gray-900">{value}</span>
          <span className="text-sm text-gray-600 ml-0.5">%</span>
        </div>
        {label && <span className="text-xs text-gray-600 mt-1">{label}</span>}
        {subLabel && <span className="text-xs text-gray-500">{subLabel}</span>}
      </div>
    </div>
  );
}