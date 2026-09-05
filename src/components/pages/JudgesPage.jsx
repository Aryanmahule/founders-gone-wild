import React from 'react';
import { JUDGES_DATA } from '../../data/eventData';
import { PillButton } from '../ui/UIComponents';
import { Users } from 'lucide-react';

export const JudgesPage = ({ setActivePage }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Users className="w-4 h-4 text-gold" />
          The Jury Panel
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Judges &</span>{' '}
          <span className="comic-shadow-purple-cream">Mentors</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Meet the faculty and coordinators who will evaluate your pitch in the Grand Finale.
        </p>
      </div>

      {/* Judges grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {JUDGES_DATA.map((judge) => (
          <div
            key={judge.id}
            className="bg-bg-deep/85 border-2 border-cream/25 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-gold/60 transition-all duration-300 group"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-ink/50 border-2 border-gold/40 flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform">
                  {judge.avatar}
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase text-comicWhite">{judge.name}</h3>
                  <div className="text-xs font-mono-code text-gold font-bold">{judge.role}</div>
                  <div className="text-[11px] text-cream/70 mt-0.5">Focus: {judge.focus}</div>
                </div>
              </div>

              <div className="bg-ink/35 p-4 rounded-2xl border border-cream/15 italic text-sm text-cream/90 font-medium">
                "{judge.quote}"
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cream/15 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {judge.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono-code bg-cream/10 text-cream px-2 py-0.5 rounded border border-cream/20">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono-code text-gold font-bold">Jury Panel</span>
            </div>
          </div>
        ))}
      </div>

      {/* Judging criteria */}
      <div className="bg-ink/40 border-2 border-gold/40 rounded-3xl p-8 max-w-4xl mx-auto backdrop-blur-md space-y-6">
        <h3 className="font-display text-3xl text-gold uppercase text-center">What the Jury Scores</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: 'Innovation & Originality', pts: 15, icon: '💡' },
            { label: 'Business Model',            pts: 15, icon: '📊' },
            { label: 'Branding & Marketing',      pts: 15, icon: '🎨' },
            { label: 'Presentation',              pts: 15, icon: '🎤' },
            { label: 'Critical Thinking',         pts: 15, icon: '🧠' },
            { label: 'Creativity',                pts: 15, icon: '✨' },
            { label: 'Humor & Engagement',        pts: 10, icon: '😂' },
          ].map(({ label, pts, icon }) => (
            <div key={label} className="bg-bg-deep/60 p-4 rounded-2xl border border-cream/20 text-center space-y-1">
              <div className="text-2xl">{icon}</div>
              <div className="font-display text-2xl text-gold">{pts}</div>
              <div className="text-[10px] font-mono-code uppercase text-cream/70 leading-tight">{label}</div>
            </div>
          ))}
          {/* Total */}
          <div className="bg-gold/20 border-2 border-gold p-4 rounded-2xl text-center space-y-1">
            <div className="text-2xl">🏆</div>
            <div className="font-display text-2xl text-gold">100</div>
            <div className="text-[10px] font-mono-code uppercase text-gold leading-tight">Total Points</div>
          </div>
        </div>
      </div>

    </div>
  );
};
