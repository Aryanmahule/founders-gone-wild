import React, { useState } from 'react';
import { ROUNDS_DATA } from '../../data/eventData';
import { PillButton } from '../ui/UIComponents';
import { Clock, CheckCircle2, ArrowRight, ShieldAlert, Award, Zap } from 'lucide-react';

export const RoundsPage = ({ setActivePage }) => {
  const [selectedRound, setSelectedRound] = useState(0);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Clock className="w-4 h-4 text-gold" />
          The 2-Round Gauntlet
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">How The Event</span>{' '}
          <span className="comic-shadow-purple-cream">Works</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Two rounds designed to push you from a randomized card combo to a fully pitched, investor-ready startup.
        </p>
      </div>

      {/* Round selector tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {ROUNDS_DATA.map((round, idx) => {
          const isSelected = selectedRound === idx;
          return (
            <button
              key={round.number}
              onClick={() => setSelectedRound(idx)}
              className={`p-6 rounded-3xl text-left border-2 transition-all backdrop-blur-md cursor-pointer ${
                isSelected
                  ? 'bg-bg-deep border-gold shadow-comic-gold'
                  : 'bg-ink/30 border-cream/20 hover:border-cream/40 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-3xl text-gold">ROUND {round.number}</span>
                <span className="font-mono-code text-xs font-bold text-cream/80 bg-ink/40 px-2.5 py-1 rounded-md border border-cream/20">
                  {round.phase}
                </span>
              </div>
              <h3 className="font-display text-xl uppercase text-comicWhite mb-2">
                {round.title}
              </h3>
              <p className="text-xs font-mono-code text-cream/70 italic">
                "{round.tagline}"
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed round view */}
      {(() => {
        const round = ROUNDS_DATA[selectedRound];
        return (
          <div className="bg-bg-deep/90 border-2 border-cream/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8 animate-fadeIn">

            {/* Round header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/20 pb-6">
              <div>
                <div className="font-mono-code text-xs font-bold uppercase tracking-widest text-gold mb-1">
                  {round.tag}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-comicWhite uppercase">
                  Round {round.number}: {round.title}
                </h2>
                <p className="text-sm text-cream/75 italic mt-1">"{round.tagline}"</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Overview & steps */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-lg text-gold uppercase mb-2">Overview</h4>
                  <p className="text-base text-comicWhite/90 leading-relaxed font-medium">
                    {round.summary}
                  </p>
                </div>

                {/* Step-by-step breakdown */}
                <div className="space-y-3">
                  <h4 className="font-display text-lg text-gold uppercase">How It Runs</h4>
                  {round.steps.map((s, i) => (
                    <div key={i} className="bg-ink/30 p-4 rounded-2xl border border-cream/15 flex gap-3">
                      <span className="font-display text-xl text-gold shrink-0">{i + 1}.</span>
                      <div>
                        <div className="font-mono-code text-xs font-bold uppercase text-cream mb-1">{s.step}</div>
                        <p className="text-sm text-cream/85 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-ink/30 p-5 rounded-2xl border border-cream/15 space-y-2">
                  <div className="font-mono-code text-xs uppercase font-bold text-cream flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-purple" />
                    Advancement Criteria
                  </div>
                  <p className="text-sm font-medium text-cream/90">
                    {round.gateCriteria}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-ink/40 p-6 rounded-2xl border border-cream/20 space-y-4">
                <h4 className="font-display text-lg text-gold uppercase flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold" />
                  What You Need to Do
                </h4>
                <div className="space-y-3">
                  {round.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-cream font-medium bg-bg-deep/50 p-3 rounded-xl border border-cream/10">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Round 2 extra: rubric preview */}
                {selectedRound === 1 && (
                  <div className="mt-4 pt-4 border-t border-cream/15 space-y-2">
                    <div className="font-mono-code text-xs uppercase font-bold text-gold">Rubric Breakdown (100 pts)</div>
                    {[
                      ['Innovation & Originality', 15],
                      ['Business Model', 15],
                      ['Branding & Marketing', 15],
                      ['Presentation', 15],
                      ['Critical Thinking', 15],
                      ['Creativity', 15],
                      ['Humor & Engagement', 10],
                    ].map(([label, pts]) => (
                      <div key={label} className="flex items-center justify-between text-xs text-cream/85">
                        <span>{label}</span>
                        <span className="font-mono-code font-bold text-gold">{pts} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream/20">
              <button
                disabled={selectedRound === 0}
                onClick={() => setSelectedRound(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-mono-code uppercase font-bold text-cream bg-ink/40 border border-cream/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/15 transition-colors"
              >
                ← Previous Round
              </button>

              <PillButton
                variant="gold"
                size="md"
                onClick={() => setActivePage('cards')}
              >
                Browse the Card Shop →
              </PillButton>

              <button
                disabled={selectedRound === ROUNDS_DATA.length - 1}
                onClick={() => setSelectedRound(prev => prev + 1)}
                className="px-4 py-2 rounded-xl text-xs font-mono-code uppercase font-bold text-cream bg-ink/40 border border-cream/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream/15 transition-colors"
              >
                Next Round →
              </button>
            </div>

          </div>
        );
      })()}

    </div>
  );
};
