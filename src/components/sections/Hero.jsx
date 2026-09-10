import { ArrowUpRight, ChevronDown, Sparkles, Play } from 'lucide-react';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 max-w-7xl mx-auto z-20 pointer-events-none">
      {/* Top Tagline & Badge */}
      <div className="flex flex-col items-start pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 backdrop-blur-md mb-6 pointer-events-auto">
          <Sparkles size={14} className="text-accent-cyan animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-widest text-accent-cyan uppercase">
            Awwwards Site of the Day Candidate
          </span>
        </div>

        {/* Oversized Editorial Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter text-white leading-[0.92] max-w-5xl">
          DIGITAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-lime">
            GRAVITY
          </span>
          <span className="text-accent-cyan">.</span>
        </h1>

        {/* Subtitle & Mission Description */}
        <p className="mt-8 text-lg sm:text-xl md:text-2xl text-zinc-300 font-light max-w-xl leading-relaxed">
          We blend high-performance WebGL 3D, creative direction, and bespoke software to construct digital dimensions that convert.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto">
          <Button href="#services" variant="primary" size="lg" icon={<ArrowUpRight size={18} />}>
            Explore Services
          </Button>
          <Button href="#contact" variant="secondary" size="lg">
            Start a Project
          </Button>
        </div>
      </div>

      {/* Hero Bottom Bar: Metrics & Scroll Indicator */}
      <div className="pt-16 sm:pt-20 border-t border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pointer-events-auto">
        {/* Metric Badges */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10">
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white">40+</div>
            <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">
              Global Accolades
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-accent-cyan">99.8%</div>
            <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">
              Engine Performance
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-accent-lime">$120M+</div>
            <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider mt-1">
              Client Value Added
            </div>
          </div>
        </div>

        {/* Interactive Scroll Cue */}
        <a
          href="#about"
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-accent-cyan transition-colors group cursor-pointer"
        >
          <span>Scroll to Discover</span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent-cyan transition-colors">
            <ChevronDown size={14} className="animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
}
