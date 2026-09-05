import React, { useState, useEffect } from 'react';
import { CHAOS_CARDS } from '../../data/cardsData';
import { PillButton } from '../ui/UIComponents';
import { Zap, AlertTriangle, RotateCw, X, Sparkles, Skull } from 'lucide-react';
import { soundFX } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const ChaosModal = ({ isOpen, onClose }) => {
  const [activeChaos, setActiveChaos] = useState(CHAOS_CARDS[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      soundFX.playChaos();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#6C3FA6', '#F2C94C', '#EDE6C4']
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDrawChaos = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    soundFX.playChaos();

    setTimeout(() => {
      const randomChaos = CHAOS_CARDS[Math.floor(Math.random() * CHAOS_CARDS.length)];
      setActiveChaos(randomChaos);
      setIsSpinning(false);
      soundFX.playSuccess();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md animate-fadeIn">
      {/* Container */}
      <div className="relative bg-bg-deep border-4 border-gold rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-cream hover:text-gold transition-colors font-mono-code font-bold text-lg z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Chaos Header Badge */}
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-purple/90 text-comicWhite px-4 py-1.5 rounded-full border border-purple shadow-comic-purple">
          <Zap className="w-4 h-4 text-gold animate-bounce" />
          <span>CHAOS PROTOCOL STRIKE</span>
        </div>

        {/* Comic Skull & Title */}
        <div className="space-y-2">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-ink/60 border-2 border-purple flex items-center justify-center text-4xl shadow-inner animate-float">
            {activeChaos.icon}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-gold uppercase tracking-tight">
            {activeChaos.title}
          </h2>
          <div className="text-xs font-mono-code uppercase font-bold text-purple bg-ink/40 px-3 py-1 rounded-full border border-purple/30 inline-block">
            Severity: {activeChaos.severity}
          </div>
        </div>

        {/* Modifier Detail */}
        <div className="bg-ink/50 border-2 border-cream/20 rounded-2xl p-5 text-left space-y-3">
          <div>
            <div className="text-[10px] font-mono-code uppercase font-bold text-gold">
              Active Modifier:
            </div>
            <p className="text-sm sm:text-base text-comicWhite font-medium leading-relaxed">
              "{activeChaos.modifier}"
            </p>
          </div>

          <div className="pt-2 border-t border-cream/15">
            <div className="text-[10px] font-mono-code uppercase font-bold text-red-400">
              Mandatory Rule Impact:
            </div>
            <p className="text-xs text-cream/90 font-medium">
              {activeChaos.effect}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <PillButton
            variant="outline"
            size="md"
            onClick={handleDrawChaos}
            disabled={isSpinning}
            icon={<RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />}
          >
            {isSpinning ? "Selecting Chaos..." : "Roll New Chaos Card"}
          </PillButton>

          <PillButton
            variant="gold"
            size="md"
            onClick={onClose}
          >
            Accept Fate & Dismiss
          </PillButton>
        </div>

      </div>
    </div>
  );
};
