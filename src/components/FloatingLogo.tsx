interface FloatingLogoProps {
  className?: string;
}

export const FloatingLogo = ({ className = '' }: FloatingLogoProps) => {
  return (
    <div
      className={`${className}`}
      style={{
        animation: 'gentleSwing 6s ease-in-out infinite',
        transformOrigin: 'center',
      }}
    >
      <img
        src="/logo.png"
        alt="Nanasook Logo"
        className="w-16 h-16 object-contain drop-shadow-lg"
      />
    </div>
  );
};
