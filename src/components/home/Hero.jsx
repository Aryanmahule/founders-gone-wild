import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PillButton, Chip } from '../ui/UIComponents';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EVENT_DETAILS } from '../../data/eventData';

// ─── Frame config ────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
// Matches the teal background of the new edited frames so the deck floats seamlessly
const FRAME_BG = '#598F83';

function frameUrl(n) {
  return `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
}

// ─── Frame canvas component ──────────────────────────────────────────────────
function DeckCanvas({ scrollProgress }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const ready = loadedCount >= 10;

  // Preload all frames
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

  // Draw a frame
  const drawFrame = useCallback((frame) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frame) - 1));
    const img = imagesRef.current[idx];

    // Fill bg first so no transparent edges ever show through
    ctx.fillStyle = FRAME_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalWidth > 0) {
      // Contain-fit: show whole image, no crop
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
    }
  }, []);

  // Resize canvas to fill its container
  const containerRef = useRef(null);
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

  // Update target frame from scroll progress
  useEffect(() => {
    targetFrameRef.current = 1 + scrollProgress * (TOTAL_FRAMES - 1);
  }, [scrollProgress]);

  // Eased RAF loop
  useEffect(() => {
    if (!ready) return;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.12;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }
      drawFrame(currentFrameRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [ready, drawFrame]);

  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div ref={containerRef} className="w-full h-full relative" style={{ background: FRAME_BG }}>
      {/* Loading bar */}
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <div className="w-40 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-150"
              style={{ width: `${loadPercent}%` }}
            />
          </div>
          <span className="font-mono-code text-[10px] uppercase text-cream/50 tracking-widest">
            {loadPercent}%
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </div>
  );
}

// ─── Hero section ────────────────────────────────────────────────────────────
const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

export const Hero = ({ setActivePage }) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  // canvasOpacity fades out as the animation nears its end
  const [canvasOpacity, setCanvasOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const viewH = window.innerHeight;
      // scrollable range = sectionH - viewH
      const scrollable = sectionH - viewH;
      const scrolled = -rect.top;
      const raw = Math.min(Math.max(scrolled / scrollable, 0), 1);
      setScrollProgress(raw);

      // Fade canvas out in the last 15% of the scroll range
      const fadeStart = 0.82;
      if (raw >= fadeStart) {
        const fadeProgress = (raw - fadeStart) / (1 - fadeStart);
        setCanvasOpacity(1 - fadeProgress);
      } else {
        setCanvasOpacity(1);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /*
     * Tall section: 500vh gives enough scroll room for the animation.
     * The inner sticky div pins to the viewport while the user scrolls
     * through that 500vh, then unpins naturally when past it.
     */
    <section ref={sectionRef} style={{ height: '520vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Full-width two-column layout inside the sticky viewport */}
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center">

          {/* ── Left column: text content (stays visible throughout) ───── */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6 z-10 py-8 lg:py-0">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-3.5 py-1.5 rounded-full text-cream shadow-sm">
              <span>🃏</span>
              <span>Think Wild. Build Smart. Pitch Bold.</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight leading-[0.92] m-0">
              <span className="block comic-shadow-gold-blue">Founders</span>
              <span className="block comic-shadow-purple-cream mt-1">Gone Wild</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-comicWhite/90 max-w-lg leading-relaxed">
              Can you convince us to invest in the impossible? Combine randomized cards into a wild startup idea, build a real pitch using AI tools, and defend it Shark Tank-style in front of live investors.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <PillButton
                variant="gold"
                size="lg"
                onClick={() => window.open(REGISTER_URL, '_blank', 'noopener,noreferrer')}
                icon={<ArrowRight className="w-5 h-5 text-ink" />}
              >
                Register Your Squad
              </PillButton>
              <PillButton
                variant="outline"
                size="lg"
                onClick={() => setActivePage('fate')}
                icon={<Sparkles className="w-5 h-5 text-gold" />}
              >
                Draw Your Fate
              </PillButton>
            </div>

            {/* Stat chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {EVENT_DETAILS.stats.map((stat, idx) => (
                <Chip key={idx} val={stat.val} lab={stat.lab} sub={stat.sub} />
              ))}
            </div>
          </div>

          {/* ── Right column: scroll-driven frame canvas ────────────────── */}
          <div
            className="lg:col-span-6 xl:col-span-7 h-full flex items-center justify-center"
            style={{
              opacity: canvasOpacity,
              transition: 'opacity 0.1s linear',
            }}
          >
            {/* Canvas container — sized to match the viewport height on the right */}
            <div className="w-full" style={{ height: '90vh', maxHeight: '90vh' }}>
              <DeckCanvas scrollProgress={scrollProgress} />
            </div>
          </div>

        </div>

        {/* Scroll nudge — only shown when user hasn't scrolled yet */}
        {scrollProgress < 0.02 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none animate-pulse-slow">
            <span className="font-mono-code text-[10px] uppercase tracking-widest text-cream/50">
              Scroll to explode the deck
            </span>
            <svg width="18" height="26" viewBox="0 0 18 26" fill="none" className="text-gold opacity-70">
              <rect x="6" y="0" width="6" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="5" r="1.8" fill="currentColor" />
              <path d="M3 18 L9 25 L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}

        {/* Thin scroll progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
          <div
            className="h-full bg-gold/60"
            style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.05s linear' }}
          />
        </div>

      </div>
    </section>
  );
};
