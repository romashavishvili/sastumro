import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';
import Button from './Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-dark-950/75 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-cyan to-accent-lime p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-dark-950 rounded-xl flex items-center justify-center">
              <span className="font-mono font-bold text-accent-cyan text-base tracking-tighter">
                K<span className="text-white">X</span>
              </span>
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-wider text-white">
            KINETIX<span className="text-accent-cyan">.</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200 relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-cyan transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA & Status Pill */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Q2 Projects</span>
          </div>

          <Button href="#contact" variant="primary" size="sm" icon={<ArrowUpRight size={14} />}>
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-dark-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-semibold text-zinc-200 hover:text-accent-cyan py-2 border-b border-white/5 flex items-center justify-between"
              >
                {link.name}
                <ArrowUpRight size={18} className="text-zinc-500" />
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Q2 Projects</span>
            </div>
            <Button
              href="#contact"
              variant="primary"
              size="md"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Start a Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
