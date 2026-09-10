import { ExternalLink, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function Showcase() {
  const projects = [
    {
      name: 'CYBERPULSE',
      category: 'WebGL Metaverse Interface',
      year: '2025',
      awards: ['Awwwards SOTD', 'FWA of the Day'],
      gradient: 'from-blue-600/30 via-cyan-500/20 to-transparent',
    },
    {
      name: 'AETHER ORBIT',
      category: 'Spatial Audio & 3D Configurator',
      year: '2025',
      awards: ['CSSDA Best UI/UX', 'Dev Award'],
      gradient: 'from-emerald-600/30 via-lime-500/20 to-transparent',
    },
    {
      name: 'NEO-CHRONO',
      category: 'Horology Interactive Archive',
      year: '2024',
      awards: ['Awwwards Developer Site'],
      gradient: 'from-purple-600/30 via-indigo-500/20 to-transparent',
    },
  ];

  return (
    <section id="showcase" className="relative py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <SectionHeading
        badge="03 // SELECTED ARCHIVE"
        title="Works recognized by the world's most prestigious design institutions."
        subtitle="Every project is engineered as a bespoke digital benchmark."
      />

      {/* Interactive Project List */}
      <div className="flex flex-col gap-4 mt-8">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group relative glass-panel p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden border border-white/10 hover:border-accent-cyan/50 transition-all duration-400 cursor-pointer"
          >
            {/* Background Hover Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${proj.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent-cyan tracking-widest uppercase">
                  {proj.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono">• {proj.year}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300">
                {proj.name}
              </h3>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3">
              {proj.awards.map((award, aIdx) => (
                <div
                  key={aIdx}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 group-hover:border-accent-cyan/40 transition-colors"
                >
                  <Star size={11} className="text-accent-cyan fill-accent-cyan" />
                  <span>{award}</span>
                </div>
              ))}
              <div className="p-2 rounded-full border border-white/20 group-hover:border-accent-cyan group-hover:bg-accent-cyan group-hover:text-black transition-all duration-300 ml-2">
                <ExternalLink size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
