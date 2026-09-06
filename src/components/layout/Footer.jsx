import React from 'react';
import { Sparkles, Terminal, Shield, Trophy } from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  return (
    <footer className="relative bg-bg-deep border-t-2 border-cream/25 pt-16 pb-12 overflow-hidden text-comicWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🃏</span>
              <div className="font-display text-2xl text-gold">FGW</div>
            </div>
            <p className="text-sm text-comicWhite/80 leading-relaxed">
              Founders Gone Wild is a 1-day startup pitch competition where randomized cards collide with wild ideas — and the best pitch wins.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono-code text-cream/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Season 1 Live Registration
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="font-display text-lg text-gold uppercase tracking-wider">Navigation</div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-comicWhite/85">
              <li>
                <button onClick={() => { setActivePage('home'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Home & 3D Deck
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('fate'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Draw Your Fate Simulator
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('rules'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Rules & Commandments
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('rounds'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  The 3 Epic Rounds
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <div className="font-display text-lg text-gold uppercase tracking-wider">Intel & Arena</div>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-comicWhite/85">
              <li>
                <button onClick={() => { setActivePage('cards'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Cards Library & Rarities
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('leaderboard'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Live Podium & Leaderboard
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('judges'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Venture Judges & Mentors
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('dashboard'); window.scrollTo(0, 0); }} className="hover:text-gold transition-colors">
                  Squad Mission Control
                </button>
              </li>
            </ul>
          </div>

          {/* Event Specs */}
          <div className="space-y-3 bg-ink/30 p-5 rounded-2xl border border-cream/20">
            <div className="font-display text-lg text-gold uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gold" />
              Event Dossier
            </div>
            <div className="space-y-1.5 text-xs font-mono-code text-cream/90">
              <div><strong className="text-gold">Prize Pool:</strong> ₹3,000 Cash + Cloud Credits</div>
              <div><strong className="text-gold">Squad Size:</strong> 2–5 Members</div>
              <div><strong className="text-gold">Format:</strong> 1-Day Event</div>
              <div><strong className="text-gold">Ownership:</strong> 100% Hacker IP</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-comicWhite/60">
          <div>© {new Date().getFullYear()} Founder's Gone Wild — Think Wild. Build Smart. Pitch Bold.</div>
          <div className="flex items-center gap-4">
            <span>Built with React + Vite + 3D Deck Engine</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
