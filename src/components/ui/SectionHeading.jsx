export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}) {
  const alignClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-12 md:mb-16 max-w-3xl ${alignClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
