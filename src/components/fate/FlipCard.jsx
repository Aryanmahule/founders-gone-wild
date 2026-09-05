import React from 'react';
import { soundFX } from '../../utils/audio';

export const FlipCard = ({
  card,
  type = 'object', // 'object' | 'tech'
  isFlipped = true,
  onFlip
}) => {
  const isObject = type === 'object';

  const glowBorder = isObject
    ? 'border-gold shadow-[0_0_25px_rgba(242,201,78,0.35)]'
    : 'border-comicBlue shadow-[0_0_25px_rgba(47,111,168,0.5)]';

  const badgeColor = isObject
    ? 'bg-gold text-ink'
    : 'bg-comicBlue text-comicWhite';

  const handleCardClick = () => {
    soundFX.playFlip();
    if (onFlip) onFlip();
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-full max-w-[320px] aspect-[5/7] perspective-1000 cursor-pointer group select-none transition-transform duration-300 hover:-translate-y-2"
    >
      <div
        className={`w-full h-full duration-700 preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Back (Unflipped) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-bg-deep border-4 border-cream/40 p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden">
          {/* Back sunburst & logo */}
          <div className="absolute inset-0 bg-repeating-conic opacity-15 pointer-events-none" />
          <div className="w-full flex justify-between items-center text-xs font-mono-code text-cream/70">
            <span>FGW DECK</span>
            <span>{isObject ? 'OBJECT' : 'TECH'}</span>
          </div>

          <div className="text-center space-y-3 my-auto">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-ink/40 border-2 border-gold/40 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
              🃏
            </div>
            <div className="font-display text-2xl text-gold uppercase tracking-wider">
              {isObject ? 'Crazy Object' : 'Domain Card'}
            </div>
            <div className="text-xs font-mono-code text-comicWhite/70">
              Click to Reveal Fate
            </div>
          </div>

          <div className="text-[10px] font-mono-code uppercase tracking-widest text-cream/50">
            Founders Gone Wild
          </div>
        </div>

        {/* Card Front (Flipped) */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-ink/90 border-4 ${glowBorder} p-6 flex flex-col justify-between shadow-2xl backdrop-blur-xl`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono-code font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${badgeColor}`}>
              {isObject ? 'Crazy Object' : 'Domain Card'}
            </span>
            <span className="text-[11px] font-mono-code text-gold font-bold">
              {card?.rarity || 'Rare'}
            </span>
          </div>

          {/* Center Visual & Title */}
          <div className="text-center space-y-3 my-auto">
            <div className="text-6xl my-2 filter drop-shadow-md animate-float">
              {card?.icon || '⚡'}
            </div>
            <h3 className="font-display text-2xl text-comicWhite uppercase tracking-tight leading-tight">
              {card?.title || 'Unknown Card'}
            </h3>
            <div className="text-xs font-mono-code text-gold font-bold uppercase tracking-wider">
              {card?.category}
            </div>
            <p className="text-xs text-comicWhite/80 leading-relaxed italic px-2">
              "{card?.tagline}"
            </p>
          </div>

          {/* Bottom Prompt / Trait */}
          <div className="bg-bg-deep/60 p-3 rounded-xl border border-cream/20 text-left">
            <div className="text-[10px] font-mono-code uppercase font-bold text-cream mb-0.5">
              {isObject ? 'Object Quirk' : 'Ideation Hook'}
            </div>
            <div className="text-xs text-cream/90 font-medium line-clamp-2">
              {isObject ? card?.quirk : card?.promptHook}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
