import React, { useState } from 'react';
import { RULES_DATA } from '../../data/eventData';
import { PillButton } from '../ui/UIComponents';
import { BookOpen, Search, CheckCircle } from 'lucide-react';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

export const RulesPage = ({ setActivePage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Team', 'Concept', 'Tools', 'Deadlines', 'Originality', 'Balance', 'Conduct', 'Cards'];

  const filteredRules = RULES_DATA.filter((rule) => {
    const matchesSearch =
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || rule.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <BookOpen className="w-4 h-4 text-gold" />
          The Founder's Codex
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Rules &</span>{' '}
          <span className="comic-shadow-purple-cream">Commandments</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Eight rules. Zero loopholes. Read them, own them, survive the Sharks.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-bg-deep/70 p-4 rounded-2xl border border-cream/20 backdrop-blur-md">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/60" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ink/40 border border-cream/25 rounded-xl text-xs font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-gold text-ink shadow-sm'
                  : 'bg-ink/30 text-cream/80 hover:bg-cream/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-bg-deep/85 border-2 border-cream/25 rounded-3xl p-6 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-gold/60 transition-colors group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2 rounded-2xl bg-ink/40 border border-cream/20 group-hover:scale-110 transition-transform">
                  {rule.icon}
                </span>
                <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider bg-cream/15 text-gold px-2.5 py-1 rounded-md border border-gold/30">
                  {rule.badge}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl text-comicWhite uppercase tracking-tight mb-2">
                  {rule.title}
                </h3>
                <p className="text-sm text-comicWhite/80 leading-relaxed font-medium">
                  {rule.description}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-cream/15 flex items-center justify-between text-[11px] font-mono-code text-cream/70">
              <span className="uppercase">{rule.category}</span>
              <span className="text-emerald-300 flex items-center gap-1 font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Enforced
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Rubric summary box */}
      <div className="bg-ink/40 border-2 border-gold/40 rounded-3xl p-8 max-w-3xl mx-auto backdrop-blur-md space-y-5">
        <h3 className="font-display text-2xl text-gold uppercase text-center">
          Judging Rubric — 100 Points Total
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'Innovation & Originality', pts: 15 },
            { label: 'Business Model', pts: 15 },
            { label: 'Branding & Marketing', pts: 15 },
            { label: 'Presentation', pts: 15 },
            { label: 'Critical Thinking', pts: 15 },
            { label: 'Creativity', pts: 15 },
            { label: 'Humor & Engagement', pts: 10 },
          ].map(({ label, pts }) => (
            <div key={label} className="bg-bg-deep/60 p-3 rounded-xl border border-cream/15 text-center">
              <div className="font-display text-xl text-gold">{pts}</div>
              <div className="text-[10px] font-mono-code uppercase text-cream/70 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-ink/40 border-2 border-gold/40 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-4 backdrop-blur-md">
        <h3 className="font-display text-2xl text-gold uppercase">
          Ready to play by the rules?
        </h3>
        <p className="text-sm text-cream/90 font-medium">
          Squad registration takes less than 2 minutes. Lock in your team before slots fill up.
        </p>
        <PillButton variant="gold" size="md" onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}>
          Proceed to Squad Registration →
        </PillButton>
      </div>

    </div>
  );
};
