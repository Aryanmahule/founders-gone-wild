import React from 'react';
import { PillButton } from '../ui/UIComponents';
import { Users, ArrowRight } from 'lucide-react';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

const TEAM = [
  {
    name: 'Sarthak Pandey',
    role: 'Event Coordinator',
    emoji: '🎯',
    color: 'border-gold/60 hover:border-gold',
    glow: 'hover:shadow-[0_0_30px_rgba(242,201,76,0.25)]',
    badge: 'bg-gold text-ink',
    desc: 'The architect behind Founder\'s Gone Wild — driving vision, strategy, and every moving part of the event.',
  },
  {
    name: 'Stephen Dhanvajir',
    role: 'Co-Coordinator',
    emoji: '⚡',
    color: 'border-purple/60 hover:border-purple',
    glow: 'hover:shadow-[0_0_30px_rgba(108,63,166,0.35)]',
    badge: 'bg-purple text-comicWhite',
    desc: 'Co-piloting operations, pitch dynamics, and making sure every team finds their chaos card.',
  },
  {
    name: 'Aryan Mahule',
    role: 'Technical Head',
    emoji: '💻',
    color: 'border-comicBlue/60 hover:border-comicBlue',
    glow: 'hover:shadow-[0_0_30px_rgba(47,111,168,0.35)]',
    badge: 'bg-comicBlue text-comicWhite',
    desc: 'Building the digital backbone — from the website and card systems to all tech infrastructure powering the event.',
  },
  {
    name: 'Rachit Ghule',
    role: 'Management Head',
    emoji: '🗂️',
    color: 'border-emerald-400/60 hover:border-emerald-400',
    glow: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.25)]',
    badge: 'bg-emerald-500 text-white',
    desc: 'Orchestrating logistics, team coordination, and keeping every round running on schedule.',
  },
  {
    name: 'Tanay Patil',
    role: 'Finance & Documentation',
    emoji: '📊',
    color: 'border-cream/40 hover:border-cream',
    glow: 'hover:shadow-[0_0_30px_rgba(237,230,196,0.2)]',
    badge: 'bg-cream/20 text-cream border border-cream/30',
    desc: 'Managing budgets, prize pools, sponsorships, and keeping every detail documented to the last rupee.',
  },
];

export const TeamPage = ({ setActivePage }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">

      {/* ── Header ── */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Users className="w-4 h-4 text-gold" />
          The People Behind the Wild
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Meet The</span>{' '}
          <span className="comic-shadow-purple-cream">Team</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          The squad that dreamed up the chaos, built the cards, and made Founder's Gone Wild happen.
        </p>
      </div>

      {/* ── Team Cards ── */}
      {/* Top row: 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM.slice(0, 3).map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>

      {/* Bottom row: 2 cards centred */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {TEAM.slice(3).map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>

      {/* ── Closing CTA ── */}
      <div className="text-center space-y-4 pt-4 border-t border-cream/20">
        <p className="font-mono-code text-sm text-cream/70 italic max-w-xl mx-auto">
          "You don't need a billion-dollar idea. You just need to convince the Sharks that you have one."
        </p>
        <PillButton
          variant="gold"
          size="lg"
          onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}
          icon={<ArrowRight className="w-5 h-5 text-ink" />}
        >
          Register Your Squad →
        </PillButton>
      </div>

    </div>
  );
};

function MemberCard({ member }) {
  return (
    <div
      className={`
        relative bg-bg-deep/85 border-2 ${member.color} ${member.glow}
        rounded-3xl p-7 shadow-xl backdrop-blur-md
        flex flex-col gap-5
        transition-all duration-300 group
      `}
    >
      {/* Subtle background watermark */}
      <div className="absolute top-4 right-5 text-6xl opacity-[0.06] pointer-events-none select-none font-display">
        {member.emoji}
      </div>

      {/* Avatar + Role badge */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-ink/60 border-2 border-cream/20 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform shrink-0">
          {member.emoji}
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase text-comicWhite tracking-tight leading-tight">
            {member.name}
          </h3>
          <span className={`inline-block mt-1 text-[11px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${member.badge}`}>
            {member.role}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-comicWhite/80 leading-relaxed font-medium">
        {member.desc}
      </p>

      {/* Decorative bottom line */}
      <div className="mt-auto pt-4 border-t border-cream/10 flex items-center justify-between text-[10px] font-mono-code text-cream/40 uppercase tracking-widest">
        <span>Founder's Gone Wild</span>
        <span>Season 1</span>
      </div>
    </div>
  );
}
