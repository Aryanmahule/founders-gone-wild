import React from 'react';
import { Trophy } from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  return (
    <footer className="relative bg-bg-deep border-t-2 border-cream/25 pt-10 sm:pt-16 pb-8 sm:pb-12 overflow-hidden text-comicWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2-col on mobile, 4-col on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🃏</span>
              <div className="font-display text-2xl text-gold">FGW</div>
            </div>
            <p className="text-sm text-comicWhite/80 leading-relaxed">
              Founder's Gone Wild is a 1-day startup pitch competition where randomized cards collide with wild ideas — and the best pitch wins.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono-code text-cream/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Season 1 Live Registration
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2 sm:space-y-3">
            <div className="font-display text-base sm:text-lg text-gold uppercase tracking-wider">Navigation</div>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-bold uppercase tracking-wider text-comicWhite/85">
              {[
                { label: 'Home', page: 'home' },
                { label: 'Draw Fate', page: 'fate' },
                { label: 'Rules', page: 'rules' },
                { label: 'Rounds', page: 'rounds' },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button onClick={() => { setActivePage(page); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Arena */}
          <div className="space-y-2 sm:space-y-3">
            <div className="font-display text-base sm:text-lg text-gold uppercase tracking-wider">Arena</div>
            <ul className="space-y-1.5 sm:space-y-2 text-xs font-bold uppercase tracking-wider text-comicWhite/85">
              {[
                { label: 'Cards Library', page: 'cards' },
                { label: 'Leaderboard', page: 'leaderboard' },
                { label: 'Judges', page: 'judges' },
                { label: 'Dashboard', page: 'dashboard' },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button onClick={() => { setActivePage(page); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors text-left">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Dossier */}
          <div className="col-span-2 md:col-span-1 space-y-2 sm:space-y-3 bg-ink/30 p-4 sm:p-5 rounded-2xl border border-cream/20">
            <div className="font-display text-base sm:text-lg text-gold uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold" />
              Event Dossier
            </div>
            <div className="space-y-1.5 text-xs font-mono-code text-cream/90">
              <div><strong className="text-gold">Prize Pool:</strong> TBA</div>
              <div><strong className="text-gold">Squad Size:</strong> 2–5 Members</div>
              <div><strong className="text-gold">Format:</strong> 1-Day Event</div>
              <div><strong className="text-gold">Rounds:</strong> 2 Rounds</div>
            </div>
          </div>

        </div>

        <div className="pt-6 sm:pt-8 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code text-comicWhite/60 text-center">
          <div>© {new Date().getFullYear()} Founder's Gone Wild — Think Wild. Build Smart. Pitch Bold.</div>
          <div>Built with React + Vite</div>
        </div>

      </div>
    </footer>
  );
};
