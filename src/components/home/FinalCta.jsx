import React from 'react';
import { PillButton } from '../ui/UIComponents';
import { ArrowRight, ShieldCheck, Flame } from 'lucide-react';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

export const FinalCta = ({ setActivePage }) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-transparent via-bg-deep/60 to-bg-deep border-t-2 border-cream/20">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Flame className="w-4 h-4 text-gold animate-bounce" />
          The Sharks Are Waiting
        </div>

        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-tight">
          <span className="comic-shadow-gold-blue block sm:inline">Ready to go </span>
          <span className="comic-shadow-purple-cream">Wild?</span>
        </h2>

        <p className="text-lg sm:text-xl text-comicWhite/90 max-w-2xl mx-auto font-medium leading-relaxed italic">
          "You don't need a billion-dollar idea. You just need to convince the Sharks that you have one."
        </p>

        <p className="text-base text-comicWhite/75 max-w-xl mx-auto font-medium">
          Gather your squad of 2–5, lock in your team name, and step up to the deck. Quiz fast, shop smart, pitch bold.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <PillButton
            variant="gold"
            size="xl"
            onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}
            icon={<ArrowRight className="w-5 h-5 text-ink" />}
          >
            Register Your Team →
          </PillButton>

          <PillButton
            variant="outline"
            size="xl"
            onClick={() => setActivePage('rules')}
            icon={<ShieldCheck className="w-5 h-5 text-gold" />}
          >
            Review The Rules
          </PillButton>
        </div>

        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-xs font-mono-code text-cream/80">
          <div className="bg-ink/30 p-3 rounded-xl border border-cream/15">
            🃏 Live Card Shop
          </div>
          <div className="bg-ink/30 p-3 rounded-xl border border-cream/15">
            🤖 AI Tools Allowed
          </div>
          <div className="bg-ink/30 p-3 rounded-xl border border-cream/15">
            🦈 Shark Tank Finale
          </div>
        </div>

      </div>
    </section>
  );
};
