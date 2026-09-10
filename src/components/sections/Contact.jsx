import { useState } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '3D WebGL Experience',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <SectionHeading
        badge="04 // INITIATE DIALOGUE"
        title="Ready to build something iconic? Let's start the conversation."
        subtitle="We collaborate with ambitious clients worldwide. Tell us about your timeline, vision, and goals."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
        {/* Left Form Card */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          {submitted ? (
            <div className="py-16 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center text-accent-cyan mb-2 shadow-glow-cyan">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Transmission Received</h3>
              <p className="text-zinc-400 max-w-md text-sm">
                Thank you, {formData.name}. Our creative technical team will review your brief and respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', service: '3D WebGL Experience', message: '' });
                }}
                className="mt-6 text-xs font-mono uppercase tracking-widest text-accent-cyan hover:underline"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-dark-900/80 border border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-dark-900/80 border border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Project Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    '3D WebGL Experience',
                    'Next-Gen Web App',
                    'Brand Identity & 3D',
                    'Award Campaign',
                  ].map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setFormData({ ...formData, service: srv })}
                      className={`text-left px-4 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                        formData.service === srv
                          ? 'border-accent-cyan bg-accent-cyan/15 text-white shadow-glow-cyan'
                          : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Project Details / Scope
                </label>
                <textarea
                  rows={4}
                  placeholder="Share a brief overview of your product, anticipated timeline, and creative expectations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-dark-900/80 border border-white/10 focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors resize-none"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" icon={<Send size={16} />}>
                Send Brief
              </Button>
            </form>
          )}
        </div>

        {/* Right Info Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Direct Channels
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              We respond to inquiries within one business day. NDA provided upon request for confidential ventures.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href="mailto:hello@kinetix-agency.design"
                className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/10 hover:border-accent-cyan/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-white/5 text-accent-cyan group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">General Inquiries</div>
                  <div className="text-sm font-medium text-white group-hover:text-accent-cyan transition-colors">
                    hello@kinetix-agency.design
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/10">
                <div className="p-3 rounded-xl bg-white/5 text-accent-lime">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Studio Locations</div>
                  <div className="text-sm font-medium text-white">
                    San Francisco • Zurich • Tokyo
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/10">
                <div className="p-3 rounded-xl bg-white/5 text-accent-cyan">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Current Capacity</div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Accepting 2 new client engagements
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-white/15 bg-white/5">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
              Guaranteed SLA
            </div>
            <p className="text-xs text-zinc-400 leading-normal">
              All production code comes with 100% test coverage, comprehensive 3D asset optimization reports, and 60 days post-launch warranty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
