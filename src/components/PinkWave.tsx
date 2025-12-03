export function PinkWave({ className = '' }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 30" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0 15 Q 12.5 0, 25 15 T 50 15 T 75 15 T 100 15" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
