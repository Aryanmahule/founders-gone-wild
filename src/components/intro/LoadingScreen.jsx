import React, { useEffect, useState } from 'react';

const STEPS = [
  'Shuffling the deck...',
  'Waking up the Sharks...',
  'Loading wild ideas...',
  'Almost ready to pitch...',
];

export const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Drive progress from 0 → 100 over ~2.2s
    const start = performance.now();
    const duration = 2200;

    const tick = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - raw) * (1 - raw);
      setProgress(Math.round(eased * 100));
      setStepIndex(Math.min(Math.floor(eased * STEPS.length), STEPS.length - 1));

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        // Hold at 100% briefly, then fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 600); // match fade-out duration
        }, 300);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#3F6B62',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Sunburst pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-conic-gradient(from 0deg, rgba(237,230,196,0.05) 0deg 6deg, transparent 6deg 12deg)',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 70%)',
        }}
      />

      {/* Floating card icon */}
      <div className="relative mb-8 animate-float">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl border-4 border-gold/60"
          style={{ background: '#132420' }}
        >
          🃏
        </div>
        {/* Glow ring */}
        <div
          className="absolute inset-0 rounded-3xl animate-ping"
          style={{
            boxShadow: '0 0 0 0 rgba(242,201,76,0.4)',
            border: '2px solid rgba(242,201,76,0.3)',
          }}
        />
      </div>

      {/* Title */}
      <div className="text-center mb-2 space-y-1">
        <h1
          className="font-display text-5xl sm:text-6xl uppercase tracking-tight"
          style={{
            color: '#F2C94C',
            textShadow: '3px 3px 0 #2F6FA8, 5px 5px 0 rgba(19,36,32,0.35)',
          }}
        >
          Founders
        </h1>
        <h1
          className="font-display text-5xl sm:text-6xl uppercase tracking-tight"
          style={{
            color: '#6C3FA6',
            textShadow: '3px 3px 0 #EDE6C4, 5px 5px 0 rgba(19,36,32,0.35)',
          }}
        >
          Gone Wild
        </h1>
      </div>

      {/* Tagline */}
      <p className="font-mono-code text-xs uppercase tracking-widest text-cream/60 mb-10">
        Think Wild. Build Smart. Pitch Bold.
      </p>

      {/* Progress bar */}
      <div className="w-64 sm:w-80 space-y-3">
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #F2C94C, #6C3FA6)',
              transition: 'width 0.05s linear',
              boxShadow: '0 0 10px rgba(242,201,76,0.6)',
            }}
          />
        </div>

        {/* Step label + percent */}
        <div className="flex items-center justify-between">
          <span className="font-mono-code text-[11px] text-cream/60 uppercase tracking-wider">
            {STEPS[stepIndex]}
          </span>
          <span className="font-mono-code text-[11px] text-gold font-bold">
            {progress}%
          </span>
        </div>
      </div>

      {/* Bottom credit */}
      <div className="absolute bottom-6 font-mono-code text-[10px] uppercase tracking-widest text-cream/30">
        Founder's Gone Wild — Season 1
      </div>
    </div>
  );
};
