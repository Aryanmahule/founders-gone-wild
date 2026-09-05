import React from 'react';
import { soundFX } from '../../utils/audio';

export const PillButton = ({
  children,
  variant = 'gold',
  size = 'md',
  onClick,
  className = '',
  icon = null,
  disabled = false,
  type = 'button'
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    soundFX.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles = "inline-flex items-center justify-center font-body font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer select-none rounded-full disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
    xl: "px-9 py-4 text-lg gap-3"
  };

  const variants = {
    gold: "bg-gold text-ink shadow-comic-gold hover:shadow-comic-gold-lg hover:-translate-y-0.5 active:translate-y-0.5 border-2 border-transparent",
    purple: "bg-purple text-comicWhite shadow-comic-purple hover:-translate-y-0.5 active:translate-y-0.5 border-2 border-transparent",
    outline: "bg-transparent text-comicWhite border-2 border-cream/70 hover:border-gold hover:bg-cream/10 hover:-translate-y-0.5 active:translate-y-0.5",
    deep: "bg-bg-deep text-comicWhite border-2 border-cream/30 shadow-comic-deep hover:border-gold hover:-translate-y-0.5",
    danger: "bg-red-500 text-white shadow-[0_4px_0_#991b1b] hover:-translate-y-0.5 border-2 border-transparent"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variants[variant] || variants.gold} ${className}`}
    >
      {icon && <span className="inline-block text-base">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export const Chip = ({ val, lab, sub, icon, className = '' }) => {
  return (
    <div className={`bg-ink/35 border border-cream/35 rounded-2xl px-4 py-2.5 min-w-[120px] backdrop-blur-sm hover:border-gold/60 transition-colors ${className}`}>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-lg">{icon}</span>}
        <div className="font-display text-2xl text-gold leading-none">{val}</div>
      </div>
      <div className="text-[11px] uppercase tracking-wider text-comicWhite/80 mt-1 font-mono-code font-bold">
        {lab}
      </div>
      {sub && <div className="text-[10px] text-cream/60 mt-0.5">{sub}</div>}
    </div>
  );
};

export const ComicHeadline = ({
  line1 = "Founders",
  line2 = "Gone Wild",
  tag = "🃏 One deck. Zero rules.",
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      {tag && (
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-3.5 py-1.5 rounded-full text-cream mb-6">
          {tag}
        </div>
      )}
      <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight leading-[0.95] mb-5">
        <span className="block comic-shadow-gold-blue mb-1.5">{line1}</span>
        <span className="block comic-shadow-purple-cream">{line2}</span>
      </h1>
    </div>
  );
};
