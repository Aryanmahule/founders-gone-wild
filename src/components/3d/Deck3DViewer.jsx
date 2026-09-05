import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCw, Eye, Sparkles, Layers } from 'lucide-react';

export const Deck3DViewer = ({
  scrollProgress = 0,
  interactive = false,
  className = '',
  showControls = true,
  autoPlay = false
}) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [mode, setMode] = useState('canvas'); // 'canvas' or 'video'
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const framesRef = useRef([]);
  const totalFrames = 240;

  // Preload frames
  useEffect(() => {
    let mounted = true;
    const images = [];

    // Preload first frame immediately
    const firstImg = new Image();
    firstImg.src = `/frames/ezgif-frame-001.jpg`;
    firstImg.onload = () => {
      if (mounted) {
        images[0] = firstImg;
        setLoadedCount(prev => Math.max(prev, 1));
        drawFrame(1);
      }
    };

    // Preload remaining frames in batches
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        if (!mounted) return;
        images[i - 1] = img;
        setLoadedCount(prev => prev + 1);
      };
    }

    framesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback((frameNumber) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const targetIdx = Math.max(1, Math.min(totalFrames, Math.round(frameNumber))) - 1;
    const img = framesRef.current[targetIdx] || framesRef.current[0];

    if (img && img.complete && img.naturalWidth > 0) {
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [totalFrames]);

  // Sync with scrollProgress if not manually dragging or playing
  useEffect(() => {
    if (!isPlaying && !isDragging && mode === 'canvas') {
      const targetFrame = Math.max(1, Math.min(totalFrames, Math.round(scrollProgress * (totalFrames - 1)) + 1));
      setCurrentFrameIndex(targetFrame);
      drawFrame(targetFrame);
    }
  }, [scrollProgress, isPlaying, isDragging, mode, drawFrame, totalFrames]);

  // Handle autoplay loop in canvas mode
  useEffect(() => {
    if (!isPlaying || mode !== 'canvas') return;

    let animId;
    let lastTime = performance.now();
    const fps = 30;
    const interval = 1000 / fps;

    const loop = (currentTime) => {
      const delta = currentTime - lastTime;
      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        setCurrentFrameIndex(prev => {
          const next = prev >= totalFrames ? 1 : prev + 1;
          drawFrame(next);
          return next;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, mode, drawFrame, totalFrames]);

  // Drag interaction for 3D scrub
  const handleMouseDown = (e) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0]?.clientX) || 0);
    setIsPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !interactive) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const diffX = clientX - dragStartX;
    const sensitivity = 0.5;
    const frameDelta = Math.round(diffX * sensitivity);

    if (Math.abs(frameDelta) >= 1) {
      setCurrentFrameIndex(prev => {
        let next = prev + frameDelta;
        while (next < 1) next += totalFrames;
        while (next > totalFrames) next -= totalFrames;
        drawFrame(next);
        return next;
      });
      setDragStartX(clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`relative w-full max-w-[540px] mx-auto select-none group ${className}`}>
      {/* Glow highlight behind deck */}
      <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-purple/20 to-comicBlue/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Main Container */}
      <div 
        className="relative bg-bg rounded-2xl overflow-hidden border-2 border-cream/25 shadow-2xl transition-all duration-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Canvas for 3D Frame Scrubbing */}
        <canvas
          ref={canvasRef}
          className={`w-full h-auto aspect-[16/9] object-contain block cursor-grab active:cursor-grabbing ${mode === 'canvas' ? 'block' : 'hidden'}`}
          width={1280}
          height={720}
        />

        {/* Video mode fallback */}
        <video
          ref={videoRef}
          src="/fgw-deck-explode.mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-auto aspect-[16/9] object-contain block bg-bg ${mode === 'video' ? 'block' : 'hidden'}`}
        />

        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
          <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider bg-ink/75 backdrop-blur-md text-gold px-2.5 py-1 rounded-md border border-gold/30 flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            3D Exploded Deck
          </span>
          <span className="font-mono-code text-[10px] text-cream/90 bg-bg-deep/85 px-2 py-0.5 rounded border border-cream/20">
            {mode === 'canvas' ? `Frame ${currentFrameIndex}/${totalFrames}` : 'HD Video Loop'}
          </span>
        </div>

        {/* Interactive Scrub Hint */}
        {interactive && !isDragging && (
          <div className="absolute bottom-3 right-3 pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono-code bg-ink/75 text-cream px-2.5 py-1 rounded-md border border-cream/25 backdrop-blur-md">
            <RotateCw className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '4s' }} />
            Drag or scroll to explode
          </div>
        )}
      </div>

      {/* Control Bar */}
      {showControls && (
        <div className="mt-3 flex items-center justify-between gap-3 bg-bg-deep/80 backdrop-blur-md border border-cream/20 px-3.5 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (mode === 'video') setMode('canvas');
                setIsPlaying(!isPlaying);
              }}
              className="p-1.5 rounded-lg bg-cream/15 hover:bg-gold hover:text-ink text-cream transition-colors"
              title={isPlaying ? "Pause" : "Play Loop"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                const nextMode = mode === 'canvas' ? 'video' : 'canvas';
                setMode(nextMode);
                if (nextMode === 'video') setIsPlaying(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream/10 hover:bg-cream/20 text-cream text-[11px] font-mono-code transition-colors border border-cream/20"
            >
              <Layers className="w-3.5 h-3.5 text-gold" />
              {mode === 'canvas' ? '3D Canvas' : 'Video Loop'}
            </button>
          </div>

          {/* Scrub Slider in canvas mode */}
          {mode === 'canvas' && (
            <div className="flex-1 mx-2 flex items-center gap-2">
              <input
                type="range"
                min="1"
                max={totalFrames}
                value={currentFrameIndex}
                onChange={(e) => {
                  setIsPlaying(false);
                  const val = Number(e.target.value);
                  setCurrentFrameIndex(val);
                  drawFrame(val);
                }}
                className="w-full h-1.5 bg-cream/25 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>
          )}

          <div className="text-[11px] font-mono-code text-cream/70 whitespace-nowrap">
            {loadedCount < totalFrames ? `Loading ${Math.round((loadedCount / totalFrames) * 100)}%` : 'Ready'}
          </div>
        </div>
      )}
    </div>
  );
};
