import { Shield, Zap, Eye, Cpu } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  const pillars = [
    {
      icon: <Cpu className="text-accent-cyan" size={24} />,
      title: 'WebGL & Shader Mastery',
      desc: 'Custom fragment and vertex shaders engineered for buttery 120 FPS performance on all platforms.',
    },
    {
      icon: <Zap className="text-accent-lime" size={24} />,
      title: 'Real-time Kinetic UI',
      desc: 'Seamless GSAP scroll pipelines synchronized with responsive 3D viewport spatial cameras.',
    },
    {
      icon: <Eye className="text-accent-cyan" size={24} />,
      title: 'Editorial Art Direction',
      desc: 'Award-caliber typographic hierarchy and spatial layouts that captivate venture-backed audiences.',
    },
    {
      icon: <Shield className="text-white" size={24} />,
      title: 'Enterprise Scalability',
      desc: 'Production-ready React 19 architecture with strict accessibility and sub-second load times.',
    },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <SectionHeading
        badge="01 // PHILOSOPHY"
        title="We don't build generic web pages. We engineer interactive digital worlds."
        subtitle="Born at the intersection of avant-garde visual art and high-throughput computational geometry, Kinetix builds interfaces that command attention and drive conversions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        {/* Left Editorial Manifesto */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xl sm:text-2xl text-zinc-200 font-light leading-relaxed">
            In an era of template fatigue, your brand’s digital presence must be visceral. We construct spatial WebGL experiences that captivate the senses without sacrificing responsive performance or conversion metrics.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed">
            Every cubic coordinate, light reflection, and scroll interpolation is intentionally sculpted. By pairing Three.js with React 19 and custom GPU pipelines, we deliver interactive storytelling that cements market leadership.
          </p>

          <div className="pt-4 flex flex-wrap gap-2.5">
            {[
              'Three.js / WebGL',
              'React Three Fiber',
              'GLSL Shaders',
              'GSAP ScrollTrigger',
              'Spatial Audio',
              'Tailwind CSS',
              'Creative Direction',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 hover:border-accent-cyan/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Pillars Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col gap-3 group"
            >
              <div className="p-2.5 w-fit rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-accent-cyan/50 transition-all duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
