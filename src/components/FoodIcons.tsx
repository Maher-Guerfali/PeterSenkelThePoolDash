export function PineappleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor">
      <path d="M32 8c-2 0-4 1-5 2.5C26 9 24 8 22 8c-1 0-2 .5-2.5 1.5C18 8.5 16.5 8 15 8c-2 0-3 1-3.5 2.5-.5-.3-1-.5-1.5-.5-2 0-3 2-3 4 0 1 .5 2 1 2.5C7 17 6 18.5 6 20c0 2 1.5 3.5 3.5 4 0 2.5 2 4.5 4.5 4.5h.5c1 2 3 3.5 5.5 3.5 1 0 2-.2 2.8-.7.8 1.2 2.2 2.2 3.7 2.5V48c0 4.5 2.5 8.5 6.5 10.5 4-2 6.5-6 6.5-10.5V33.8c1.5-.3 2.9-1.3 3.7-2.5.8.5 1.8.7 2.8.7 2.5 0 4.5-1.5 5.5-3.5h.5c2.5 0 4.5-2 4.5-4.5 2 0 3.5-1.5 3.5-4 0-1.5-1-3-2-3.5.5-.5 1-1.5 1-2.5 0-2-1-4-3-4-.5 0-1 .2-1.5.5C53 9 52 8 50 8c-1.5 0-3 .5-4.5 1.5C45 8.5 44 8 43 8c-2 0-4 1-5 2.5C37 9 35 8 33 8h-1zm0 4c1 0 2 .5 2.5 1.5 1-1 2.5-1.5 4-1.5.5 0 1 0 1.5.2-.5 1-1 2-1 3.3 0 2 1 3.5 2.5 4.5-1 1-2 2.5-2 4 0 1 .2 2 .7 2.8-1 .5-2 1.2-2.7 2.2-1-1-2.5-1.5-4-1.5-1 0-2 .2-2.8.7-.3-.5-.7-1-1.2-1.4.5-.8.8-1.8 1-2.8 1.5-1 2.5-2.5 2.5-4.5 0-1.3-.5-2.3-1-3.3.5-.2 1-.2 1.5-.2 1.5 0 3 .5 4 1.5.5-1 1.5-1.5 2.5-1.5z"/>
    </svg>
  );
}

export function CroissantIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor">
      <path d="M12 40c0-8 4-15 10-19-2-3-3-6-3-9 0-1 1-2 2-2s2 1 2 2c0 2 .5 4 1.5 6C27 16 30 15 33 15s6 1 8.5 3c1-2 1.5-4 1.5-6 0-1 1-2 2-2s2 1 2 2c0 3-1 6-3 9 6 4 10 11 10 19 0 1-1 2-2 2H14c-1 0-2-1-2-2zm6-2h28c-1-6-4-11-9-14l-2 4c-.5 1-1.5 1-2 0l-2-4c-5 3-8 8-9 14zm14-8c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/>
      <ellipse cx="20" cy="48" rx="4" ry="2" opacity="0.3"/>
      <ellipse cx="32" cy="50" rx="6" ry="2" opacity="0.3"/>
      <ellipse cx="44" cy="48" rx="4" ry="2" opacity="0.3"/>
    </svg>
  );
}

export function SushiIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor">
      <ellipse cx="32" cy="44" rx="24" ry="8" opacity="0.2"/>
      <path d="M8 32c0-8 10.7-14 24-14s24 6 24 14c0 4-4 7.5-10 10v4c0 2-6 4-14 4s-14-2-14-4v-4c-6-2.5-10-6-10-10z"/>
      <ellipse cx="32" cy="32" rx="20" ry="10" fill="hsl(350, 70%, 65%)"/>
      <path d="M20 30c2-2 6-3 12-3s10 1 12 3c-2 2-6 3-12 3s-10-1-12-3z" fill="hsl(350, 70%, 75%)" opacity="0.6"/>
      <circle cx="26" cy="31" r="1.5" fill="hsl(350, 70%, 80%)"/>
      <circle cx="32" cy="29" r="1.5" fill="hsl(350, 70%, 80%)"/>
      <circle cx="38" cy="31" r="1.5" fill="hsl(350, 70%, 80%)"/>
    </svg>
  );
}

export function LetterP({ className = '' }: { className?: string }) {
  return (
    <span className={`font-serif font-bold italic ${className}`} style={{ fontFamily: 'Georgia, serif' }}>
      P
    </span>
  );
}

export function ScriptL({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
      <path d="M16 48 Q 20 16, 32 16 Q 44 16, 44 28 Q 44 36, 36 40 Q 28 44, 28 52 Q 28 56, 36 56 Q 48 56, 48 48"/>
    </svg>
  );
}
