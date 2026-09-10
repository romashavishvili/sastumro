import { useRef } from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  onClick,
  href,
  ...props
}) {
  const btnRef = useRef(null);

  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full select-none overflow-hidden group';

  const sizeStyles = {
    sm: 'px-5 py-2 text-xs uppercase tracking-widest gap-2',
    md: 'px-7 py-3 text-sm uppercase tracking-wider gap-2.5',
    lg: 'px-9 py-4 text-base tracking-wider gap-3',
  };

  const variants = {
    primary:
      'bg-accent-cyan text-black font-semibold shadow-glow-cyan hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-[0.98]',
    secondary:
      'border border-white/20 bg-white/5 text-white hover:border-accent-cyan/80 hover:bg-accent-cyan/10 hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]',
    lime:
      'bg-accent-lime text-black font-semibold shadow-glow-lime hover:bg-white hover:scale-[1.03] active:scale-[0.98]',
    ghost:
      'text-zinc-400 hover:text-white hover:bg-white/5',
  };

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
      {/* Light sheen effect on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
