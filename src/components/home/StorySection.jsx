import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';

export const StorySection = ({ setActivePage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef([]);

  const steps = [
    {
      tag: "The Concept",
      title: "Can you sell the impossible?",
      desc: "Founder's Gone Wild is a startup pitch competition where randomized cards define your idea. Combine a wild object, a tech domain, and your team's creativity into a startup that actually makes sense — or at least sounds like it does.",
      icon: "🃏"
    },
    {
      tag: "Round 1 — Think Fast. Think Wild.",
      title: "Quiz for points. Shop for cards.",
      desc: "Answer quiz questions to earn Founder Points, then spend them in a live card shop. Domain cards, Crazy Object cards, Power-Ups — every purchase is a strategic bet. Minimum 3 cards to advance. Limited stock. Every choice matters.",
      icon: "🎲"
    },
    {
      tag: "Round 2 — The Grand Pitch",
      title: "Build it. Brand it. Defend it.",
      desc: "Shortlisted teams get prep time and full AI tool access to build a real startup proposal — business model, revenue logic, branding, financials. Then pitch live for 5–7 minutes and survive 5 minutes of investor Q&A.",
      icon: "⚡"
    },
    {
      tag: "The Finale — Shark Tank",
      title: "Convince the Sharks or go home.",
      desc: "Stand in front of the jury, negotiate equity, defend every assumption. The team that best balances wild creativity with airtight business logic walks away as champions. You don't need a billion-dollar idea — you just need to make them believe you have one.",
      icon: "🏆"
    }
  ];

  // IntersectionObserver: highlight the step currently in view
  useEffect(() => {
    const observers = [];
    stepsRef.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveStep(index);
          });
        },
        { threshold: 0.55 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t-2 border-cream/20">

      {/* Section header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-3.5 py-1.5 rounded-full text-cream mb-3">
          <Layers className="w-3.5 h-3.5 text-gold" />
          The Anatomy of an Exploded Deck
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">How The Event</span>{' '}
          <span className="comic-shadow-purple-cream">Unfolds</span>
        </h2>
      </div>

      {/* Scrolling steps — single centred column now that the canvas is gone */}
      <div className="space-y-6">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={idx}
              ref={(el) => (stepsRef.current[idx] = el)}
              className={`min-h-[55vh] flex flex-col justify-center transition-all duration-500 rounded-3xl p-6 sm:p-10 ${
                isActive
                  ? 'opacity-100 translate-y-0 bg-ink/30 border-2 border-gold/40 shadow-2xl backdrop-blur-md'
                  : 'opacity-30 translate-y-4 bg-transparent border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 font-mono-code text-xs font-bold uppercase tracking-widest text-gold mb-3">
                <span className="text-lg">{step.icon}</span>
                <span>{step.tag}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-comicWhite mb-4 leading-tight">
                {step.title}
              </h3>

              <p className="text-base sm:text-lg text-comicWhite/85 leading-relaxed mb-6 font-medium max-w-2xl">
                {step.desc}
              </p>

              {isActive && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code bg-gold text-ink font-bold px-3 py-1 rounded-full uppercase">
                    Layer {idx + 1} of 4 Active
                  </span>
                  {idx === 1 && (
                    <button
                      onClick={() => setActivePage('fate')}
                      className="text-xs font-mono-code text-gold underline hover:text-white uppercase font-bold"
                    >
                      Try Simulator →
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
