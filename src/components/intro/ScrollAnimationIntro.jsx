import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_BG = '#050005';
// How many frames to preload before showing canvas (first N frames)
const PRELOAD_THRESHOLD = 10;

function padIndex(n) {
  return String(n).padStart(3, '0');
}

function frameUrl(n) {
  return `/frames/ezgif-frame-${padIndex(n)}.jpg`;
}

export const ScrollAnimationIntro = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]); // array index 0 = frame 1
  const currentFrameRef = useRef(1); // actual displayed frame (float, eased)
  const targetFrameRef = useRef(1);  // where scroll wants us to be
  const rafRef = useRef(null);
  const sectionRef = useRef(null);
  const completedRef = useRef(false);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false); // first PRELOAD_THRESHOLD frames loaded
  const [fadeOut, setFadeOut] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ─── Preload all frames ────────────────────────────────────────────────────
  useEffect(() => {
    const images = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;
    let loadedSoFar = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      const idx = i - 1;
      img.onload = () => {
        images[idx] = img;
        loadedSoFar++;
        setLoadedCount(loadedSoFar);
        if (loadedSoFar === PRELOAD_THRESHOLD) {
          setReady(true);
        }
      };
      img.onerror = () => {
        loadedSoFar++;
        setLoadedCount(loadedSoFar);
        if (loadedSoFar === PRELOAD_THRESHOLD) setReady(true);
      };
    }
  }, []);

  // ─── Draw a frame onto the canvas ─────────────────────────────────────────
  const drawFrame = useCallback((frameNum) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameNum) - 1));
    const img = imagesRef.current[idx];

    ctx.fillStyle = FRAME_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (img && img.complete && img.naturalWidth > 0) {
      // Cover-fit: maintain 16/9 aspect, center in canvas
      const cw = canvas.width;
      const ch = canvas.height;
      const iRatio = img.naturalWidth / img.naturalHeight;
      const cRatio = cw / ch;
      let dw, dh, dx, dy;
      if (iRatio > cRatio) {
        // image wider than canvas — fit height
        dh = ch;
        dw = dh * iRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        // image taller — fit width
        dw = cw;
        dh = dw / iRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    }
  }, []);

  // ─── Resize canvas to match viewport ──────────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // ─── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollTop = window.scrollY;
      const sectionHeight = section.offsetHeight;
      const viewH = window.innerHeight;
      // Scrollable distance inside the sticky section = sectionHeight - viewH
      const scrollable = sectionHeight - viewH;
      const raw = Math.min(Math.max(scrollTop / scrollable, 0), 1);

      setScrollProgress(raw);
      // Map 0–1 to frame 1–240
      targetFrameRef.current = 1 + raw * (TOTAL_FRAMES - 1);

      // When user has scrolled past the section trigger completion
      if (raw >= 0.995 && !completedRef.current) {
        completedRef.current = true;
        setFadeOut(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 700); // matches fade-out duration
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ready, onComplete]);

  // ─── RAF easing loop ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;

    const loop = () => {
      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      // Exponential ease — 14% of remaining distance per frame
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current = current + diff * 0.14;
      } else {
        currentFrameRef.current = target;
      }

      drawFrame(currentFrameRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, drawFrame]);

  // ─── Loading percent ───────────────────────────────────────────────────────
  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Tall scroll-trigger section — 500vh gives plenty of scroll range */}
      <div
        ref={sectionRef}
        style={{ height: '500vh', background: FRAME_BG }}
        className="relative"
      >
        {/* Sticky fullscreen canvas */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: '100vh', background: FRAME_BG }}
        >
          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: FRAME_BG, display: ready ? 'block' : 'none' }}
          />

          {/* Loading screen */}
          {!ready && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              style={{ background: FRAME_BG }}
            >
              <div className="font-display text-3xl sm:text-4xl text-gold uppercase tracking-widest">
                Loading Arena
              </div>
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-200 rounded-full"
                  style={{ width: `${loadPercent}%` }}
                />
              </div>
              <div className="font-mono-code text-xs text-cream/60 uppercase tracking-widest">
                {loadPercent}% — preloading frames
              </div>
            </div>
          )}

          {/* Scroll nudge hint — visible until user starts scrolling */}
          {ready && scrollProgress < 0.03 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-pulse-slow">
              <span className="font-mono-code text-xs uppercase tracking-widest text-cream/60">
                Scroll to explode the deck
              </span>
              <svg width="20" height="28" viewBox="0 0 20 28" fill="none" className="text-gold">
                <rect x="7" y="0" width="6" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="6" r="2" fill="currentColor" className="animate-bounce" />
                <path d="M4 20 L10 27 L16 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Progress bar at bottom edge */}
          {ready && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
              <div
                className="h-full bg-gold transition-none"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          )}

          {/* Fade-out overlay for transition */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background: FRAME_BG,
              opacity: fadeOut ? 1 : 0,
            }}
          />
        </div>
      </div>
    </>
  );
};
