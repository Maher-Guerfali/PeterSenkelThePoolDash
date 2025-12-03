interface DashedBorderProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const DashedBorder = ({ orientation = 'horizontal', className = '' }: DashedBorderProps) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`w-full h-[1px] bg-pink ${className}`} />
    );
  }

  return (
    <div className={`w-[1px] h-full bg-pink ${className}`} />
  );
};
