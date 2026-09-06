import React, { useState } from 'react';
import { FlipCard } from './FlipCard';
import { PillButton } from '../ui/UIComponents';
import { OBJECT_CARDS, DOMAIN_CARDS } from '../../data/cardsData';
import { soundFX } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCw, CheckCircle2 } from 'lucide-react';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

export const DrawYourFate = ({ setActivePage }) => {
  const [objectCard, setObjectCard] = useState(OBJECT_CARDS[0]);
  const [techCard, setTechCard] = useState(DOMAIN_CARDS[0]);
  const [isFlipped, setIsFlipped] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [acceptedFate, setAcceptedFate] = useState(false);
  const [drawCount, setDrawCount] = useState(1);

  const drawNewCards = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setIsFlipped(false);
    soundFX.playFlip();

    setTimeout(() => {
      const randomObj = OBJECT_CARDS[Math.floor(Math.random() * OBJECT_CARDS.length)];
      const randomTech = DOMAIN_CARDS[Math.floor(Math.random() * DOMAIN_CARDS.length)];
      setObjectCard(randomObj);
      setTechCard(randomTech);
      setDrawCount(prev => prev + 1);
      setAcceptedFate(false);

      setTimeout(() => {
        setIsFlipped(true);
        setIsDrawing(false);
        soundFX.playFlip();
      }, 400);
    }, 500);
  };

  const handleAcceptFate = () => {
    soundFX.playSuccess();
    setAcceptedFate(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F2C94C', '#6C3FA6', '#EDE6C4', '#2F6FA8']
    });
  };

  const startupName = `${objectCard.title.split(' ')[0]}${techCard.title.split(' ')[0]}.ai`;
  const elevatorPitch = `A ${techCard.title.toLowerCase()} startup built around the humble ${objectCard.title.toLowerCase()} — because someone has to.`;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Sparkles className="w-4 h-4 text-gold" />
          The Arena Generator
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Simulate Your</span>{' '}
          <span className="comic-shadow-purple-cream">Card Draw</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Preview what a Domain + Crazy Object combination looks like. In the real event, cards are bought with Founder Points earned in the Round 1 quiz.
        </p>
      </div>

      {/* 2-Card Arena */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 py-4">

        {/* Object Card */}
        <div className="w-full max-w-[320px] flex flex-col items-center gap-3">
          <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
            <span>[Card 01]</span> Crazy Object
          </div>
          <FlipCard
            card={objectCard}
            type="object"
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </div>

        {/* Collision icon */}
        <div className="flex flex-col items-center justify-center p-3 rounded-full bg-ink/50 border-2 border-cream/30 text-gold shadow-lg">
          <span className="font-display text-3xl">💥</span>
          <span className="text-[10px] font-mono-code uppercase font-bold text-cream">Collision</span>
        </div>

        {/* Domain Card */}
        <div className="w-full max-w-[320px] flex flex-col items-center gap-3">
          <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-purple flex items-center gap-1.5">
            <span>[Card 02]</span> Domain
          </div>
          <FlipCard
            card={techCard}
            type="tech"
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />
        </div>

      </div>

      {/* Pitch thesis box */}
      <div className="max-w-3xl mx-auto bg-bg-deep/80 border-2 border-cream/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream/20 pb-4">
          <div>
            <span className="text-[11px] font-mono-code uppercase font-bold text-gold tracking-widest">
              Synthesized Collision Concept
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-comicWhite uppercase">
              {startupName}
            </h3>
          </div>
          <span className="text-xs font-mono-code bg-ink/40 text-cream px-3 py-1 rounded-full border border-cream/20">
            Draw #{drawCount}
          </span>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono-code uppercase text-cream/70 font-bold">
            The Pitch Thesis:
          </div>
          <p className="text-base sm:text-lg text-cream font-medium leading-relaxed bg-ink/30 p-4 rounded-2xl border border-cream/15">
            "{elevatorPitch}"
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <PillButton
              variant={acceptedFate ? "outline" : "gold"}
              size="md"
              onClick={handleAcceptFate}
              icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            >
              {acceptedFate ? "Fate Accepted! Lock in Squad" : "Accept Challenge"}
            </PillButton>

            <PillButton
              variant="outline"
              size="md"
              onClick={drawNewCards}
              disabled={isDrawing}
              icon={<RotateCw className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />}
            >
              {isDrawing ? "Drawing..." : "Reroll Combo"}
            </PillButton>
          </div>

          {acceptedFate && (
            <PillButton
              variant="purple"
              size="md"
              onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}
            >
              Register Squad With This Fate →
            </PillButton>
          )}
        </div>
      </div>

    </div>
  );
};
