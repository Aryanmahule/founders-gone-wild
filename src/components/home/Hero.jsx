import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PillButton, Chip } from '../ui/UIComponents';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EVENT_DETAILS } from '../../data/eventData';

const TOTAL_FRAMES = 240;
const FRAME_BG = '#598F83';
const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

function frameUrl(n) {
  return `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
}

// ─── Canvas component ────────────────────────────────────────────────────────
function DeckCanvas({ scrollProgress }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount >= 10;

  useEffect(() => {
    const images = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;
    let count = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      const idx = i - 1;
      img.onload = img.onerror = () => {
        images[idx] = img;
        count++;
        setLoadedCount(count);
      };
    }
  }, []);

  const drawFrame = useCallback((frame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frame) - 1));
    const img = imagesRef.current[idx];
    ctx.fillStyle = FRAME_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (img && img.complete && img.naturalWidth > 0) {
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    targetFrameRef.current = 1 + scrollProgress * (TOTAL_FRAMES - 1);
  }, [scrollProgress]);

  useEffect(() => {
    if (!ready) return;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) currentFrameRef.current += diff * 0.12;
      else currentFrameRef.current = targetFrameRef.current;
      drawFrame(currentFrameRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ready, drawFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ background: FRAME_BG }}>
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full transition-all duration-150" style={{ width: `${loadPercent}%` }} />
          </div>
          <span className="font-mono-code text-[10px] uppercase text-cream/50 tracking-widest">{loadPercent}%</span>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease' }} />
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export const Hero = ({ setActivePage, onOpenChaos }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const raw = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setScrollProgress(raw);
      const fadeStart = 0.82;
      setCanvasOpacity(raw >= fadeStart ? 1 - (raw - fadeStart) / (1 - fadeStart) : 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile: shorter section so scrolling past isn't a chore
  const sectionHeight = isMobile ? '360vh' : '520vh';

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative">
      <div className="sticky top-0 overflow-hidden" style={{ height: '100dvh' }}>

        {/* ── Layout ─────────────────────────────────────────────────── */}
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid lg:grid-cols-12 lg:gap-0 lg:items-center">

          {/* Left / top: text */}
          <div className="lg:col-span-6 xl:col-span-5 z-10 flex flex-col justify-center
                          pt-4 pb-2 sm:pt-6 sm:pb-3 lg:py-0
                          space-y-3 sm:space-y-5 lg:space-y-6">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono-code text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-cream shadow-sm self-start">
              <span>🃏</span>
              <span className="hidden sm:inline">Think Wild. Build Smart. Pitch Bold.</span>
              <span className="sm:hidden">Think Wild. Pitch Bold.</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[2.8rem] sm:text-5xl lg:text-7xl xl:text-8xl uppercase tracking-tight leading-[0.9] m-0">
              <span className="block comic-shadow-gold-blue">Founders</span>
              <span className="block comic-shadow-purple-cream mt-1">Gone Wild</span>
            </h1>

            {/* Subtitle — hidden on very small to save space */}
            <p className="hidden sm:block text-sm sm:text-base lg:text-lg font-medium text-comicWhite/90 max-w-lg leading-relaxed">
              Combine randomized cards into a wild startup idea, pitch it with AI tools, and defend it Shark Tank-style.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-1">
              <PillButton
                variant="gold"
                size="sm"
                onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}
                icon={<ArrowRight className="w-4 h-4 text-ink" />}
              >
                <span className="sm:hidden">Register</span>
                <span className="hidden sm:inline">Register Your Squad</span>
              </PillButton>
              <PillButton
                variant="outline"
                size="sm"
                onClick={() => setActivePage('fate')}
                icon={<Sparkles className="w-4 h-4 text-gold" />}
              >
                <span className="sm:hidden">Draw Fate</span>
                <span className="hidden sm:inline">Draw Your Fate</span>
              </PillButton>
            </div>

            {/* Stat chips — 2-col on mobile, 4-col on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
              {EVENT_DETAILS.stats.map((stat, idx) => (
                <Chip key={idx} val={stat.val} lab={stat.lab} sub={stat.sub} />
              ))}
            </div>
          </div>

          {/* Right / bottom: canvas */}
          <div
            className="lg:col-span-6 xl:col-span-7 flex-1 lg:h-full flex items-center justify-center min-h-0"
            style={{ opacity: canvasOpacity, transition: 'opacity 0.1s linear' }}
          >
            {/* On mobile use 45dvh, desktop 90vh */}
            <div className="w-full" style={{ height: isMobile ? '45dvh' : '90vh' }}>
              <DeckCanvas scrollProgress={scrollProgress} />
            </div>
          </div>

        </div>

        {/* Scroll nudge */}
        {scrollProgress < 0.02 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none animate-pulse-slow">
            <span className="font-mono-code text-[9px] sm:text-[10px] uppercase tracking-widest text-cream/50">
              Scroll to explode
            </span>
            <svg width="16" height="22" viewBox="0 0 18 26" fill="none" className="text-gold opacity-70">
              <rect x="6" y="0" width="6" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="5" r="1.8" fill="currentColor" />
              <path d="M3 18 L9 25 L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
          <div className="h-full bg-gold/60" style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.05s linear' }} />
        </div>

      </div>
    </section>
  );
};
