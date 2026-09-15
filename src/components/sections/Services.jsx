import { Box, Code2, Globe2, Layers, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function Services() {
  const services = [
    {
      num: '01',
      icon: <Box size={28} className="text-accent-cyan" />,
      title: '3D WebGL & Interactive Experiences',
      description:
        'Transform static products into mesmerizing spatial 3D showcases. We build bespoke Three.js scenes, procedural physics, and GLSL shaders optimized for all viewports.',
      tags: ['R3F / Drei', 'GLSL Shaders', 'Digital Twins', 'Product Configurator'],
      accent: 'border-accent-cyan/20 hover:border-accent-cyan/60 hover:shadow-glow-cyan',
    },
    {
      num: '02',
      icon: <Code2 size={28} className="text-accent-lime" />,
      title: 'Next-Gen Frontend Engineering',
      description:
        'Ultra-fast, buttery-smooth client applications built on React 19 and modern build architectures. Zero jank, sub-second TTFB, and rock-solid state management.',
      tags: ['React 19', 'Vite & Next.js', 'GSAP ScrollTrigger', 'Headless CMS'],
      accent: 'border-accent-lime/20 hover:border-accent-lime/60 hover:shadow-glow-lime',
    },
    {
      num: '03',
      icon: <Layers size={28} className="text-accent-cyan" />,
      title: 'Avant-Garde Brand Systems',
      description:
        'Visual identities forged for high-growth tech companies. Comprehensive digital design tokens, kinetic typography guidelines, and spatial interaction principles.',
      tags: ['Design Systems', 'Kinetic Typography', '3D Asset Libraries', 'Figma Tokens'],
      accent: 'border-accent-cyan/20 hover:border-accent-cyan/60 hover:shadow-glow-cyan',
    },
    {
      num: '04',
      icon: <Globe2 size={28} className="text-accent-lime" />,
      title: 'Award-Winning Web Campaigns',
      description:
        'Product launches, investor teaser sites, and immersive storytelling campaigns crafted to win FWA, Awwwards, and CSSDA honors while multiplying engagement.',
      tags: ['Viral Launch Sites', 'Spatial Audio', 'Storytelling Flow', 'Analytics & Funnels'],
      accent: 'border-accent-lime/20 hover:border-accent-lime/60 hover:shadow-glow-lime',
    },
  ];

  return (
    <section id="services" className="relative py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <SectionHeading
        badge="02 // CAPABILITIES"
        title="Engineered to disrupt markets and outshine standard templates."
        subtitle="We partner with visionary founders and global brands to architect high-impact interactive systems."
      />

      {/* 4 Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`glass-panel glass-panel-hover p-8 sm:p-10 rounded-3xl relative flex flex-col justify-between overflow-hidden group transition-all duration-500 border ${service.accent}`}
          >
            {/* Ambient Corner Accent Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-cyan/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <span className="font-mono text-xl font-bold text-zinc-600 group-hover:text-white transition-colors duration-300">
                  {service.num}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-accent-cyan transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-zinc-400 font-light text-base leading-relaxed mb-8">
                {service.description}
              </p>
            </div>

            <div>
              {/* Deliverable Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {service.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1 rounded-full group-hover:text-zinc-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Indicator */}
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-accent-cyan tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Case Studies</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
