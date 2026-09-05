import React from 'react';
import { PillButton } from '../ui/UIComponents';
import { Trophy, Clock } from 'lucide-react';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

export const LeaderboardPage = ({ setActivePage }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Trophy className="w-4 h-4 text-gold" />
          Hall of Fame
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Live Squad</span>{' '}
          <span className="comic-shadow-purple-cream">Leaderboard</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Rankings will be updated after each round. Scored on Innovation, Business Model, Branding, Presentation, Critical Thinking, Creativity, and Humor.
        </p>
      </div>

      {/* Coming soon podium */}
      <div className="flex flex-col items-center justify-center gap-8 py-16">

        {/* Podium placeholder */}
        <div className="grid grid-cols-3 gap-4 items-end max-w-lg w-full">
          {/* 2nd */}
          <div className="bg-bg-deep/70 border-2 border-cream/30 rounded-2xl p-5 text-center" style={{ height: '160px' }}>
            <div className="font-display text-3xl text-cream/40 mt-6">2nd</div>
            <div className="font-mono-code text-xs text-cream/30 uppercase mt-2">TBA</div>
          </div>
          {/* 1st */}
          <div className="bg-ink/70 border-4 border-gold rounded-2xl p-5 text-center" style={{ height: '200px' }}>
            <div className="text-3xl mt-4">👑</div>
            <div className="font-display text-3xl text-gold mt-2">1st</div>
            <div className="font-mono-code text-xs text-cream/40 uppercase mt-2">TBA</div>
          </div>
          {/* 3rd */}
          <div className="bg-bg-deep/70 border-2 border-purple/30 rounded-2xl p-5 text-center" style={{ height: '130px' }}>
            <div className="font-display text-3xl text-cream/40 mt-4">3rd</div>
            <div className="font-mono-code text-xs text-cream/30 uppercase mt-2">TBA</div>
          </div>
        </div>

        {/* Status message */}
        <div className="text-center space-y-3 max-w-md">
          <div className="inline-flex items-center gap-2 bg-ink/50 border border-cream/20 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-gold animate-pulse" />
            <span className="font-mono-code text-xs uppercase tracking-widest text-cream/70">
              Results posted after the event
            </span>
          </div>
          <p className="text-sm text-cream/60 font-medium">
            Rankings will go live here once Round 2 judging is complete. Check back after the Grand Pitch finale.
          </p>
        </div>

        {/* Rubric reminder */}
        <div className="bg-bg-deep/80 border-2 border-cream/20 rounded-3xl p-6 max-w-xl w-full backdrop-blur-md space-y-3">
          <div className="font-display text-lg text-gold uppercase text-center">Scoring Rubric</div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
            {[
              ['Innovation & Originality', '15 pts'],
              ['Business Model', '15 pts'],
              ['Branding & Marketing', '15 pts'],
              ['Presentation', '15 pts'],
              ['Critical Thinking', '15 pts'],
              ['Creativity', '15 pts'],
              ['Humor & Engagement', '10 pts'],
            ].map(([label, pts]) => (
              <div key={label} className="flex justify-between items-center bg-ink/30 px-3 py-1.5 rounded-lg">
                <span className="text-cream/80">{label}</span>
                <span className="text-gold font-bold">{pts}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <p className="text-sm text-cream/70 font-medium">
          Want your name on this board?
        </p>
        <PillButton variant="gold" size="lg" onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}>
          Register Your Squad →
        </PillButton>
      </div>

    </div>
  );
};
