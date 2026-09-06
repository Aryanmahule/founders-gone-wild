import React, { useState } from 'react';
import { PillButton } from '../ui/UIComponents';
import { CheckCircle2, Clock, UploadCloud, Sparkles, Globe, Terminal } from 'lucide-react';
import { soundFX } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const DashboardPage = ({ setActivePage }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete Round 1 Quiz and earn Founder Points', stage: 'Round 1', completed: false },
    { id: 2, text: 'Visit the Card Shop and select your Domain card', stage: 'Round 1', completed: false },
    { id: 3, text: 'Purchase your Crazy Object card', stage: 'Round 1', completed: false },
    { id: 4, text: 'Buy at least one Power-Up card (optional but smart)', stage: 'Round 1', completed: false },
    { id: 5, text: 'Define Problem Statement & Target Market', stage: 'Round 2', completed: false },
    { id: 6, text: 'Build Revenue Model & Pricing Strategy', stage: 'Round 2', completed: false },
    { id: 7, text: 'Design Pitch Deck (Canva / Figma / Gamma)', stage: 'Round 2', completed: false },
    { id: 8, text: 'Prepare 5–7 min pitch + Q&A defense', stage: 'Round 2', completed: false },
  ]);

  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleTask = (id) => {
    soundFX.playClick();
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!liveUrl.trim()) return;
    soundFX.playSuccess();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#F2C94C', '#6C3FA6', '#EDE6C4']
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-deep/90 border-2 border-cream/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-gold/20 text-gold px-3 py-1 rounded-full border border-gold/40">
            <Terminal className="w-3.5 h-3.5" />
            Squad Mission Control
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-comicWhite uppercase">
            Your Squad Dashboard
          </h1>
          <p className="text-xs font-mono-code text-cream/70">
            Track your progress across both rounds. Quiz → Shop → Build → Pitch.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] font-mono-code uppercase text-cream/70">Completion</div>
            <div className="font-mono-code text-3xl font-bold text-gold">{progressPercent}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Deliverables Checklist (7 cols) */}
        <div className="lg:col-span-7 bg-bg-deep/80 border-2 border-cream/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-cream/20 pb-4">
            <h3 className="font-display text-2xl text-gold uppercase flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-gold" />
              Stage Deliverables Tracker
            </h3>
            <span className="text-xs font-mono-code bg-ink/40 text-cream px-3 py-1 rounded-lg border border-cream/20">
              {completedCount} / {tasks.length} Completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-ink/50 h-3 rounded-full overflow-hidden border border-cream/20">
            <div
              className="bg-gradient-to-r from-gold via-purple to-emerald-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Task List */}
          <div className="space-y-3 pt-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  task.completed
                    ? 'bg-ink/30 border-emerald-500/40 text-comicWhite/70'
                    : 'bg-bg-deep/90 border-cream/20 hover:border-gold/50 text-comicWhite'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="w-5 h-5 rounded accent-gold cursor-pointer"
                  />
                  <span className={`text-sm font-medium ${task.completed ? 'line-through text-cream/50' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <span className="text-[10px] font-mono-code font-bold uppercase bg-ink/50 text-cream px-2 py-0.5 rounded border border-cream/15">
                  {task.stage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Submission Vault & Project Links (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-bg-deep/80 border-2 border-cream/25 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-5">
            <h3 className="font-display text-2xl text-gold uppercase flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-gold" />
              Project Submission Vault
            </h3>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-code uppercase font-bold text-cream mb-1">
                  Live Prototype / Demo URL *
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50" />
                  <input
                    type="url"
                    required
                    placeholder="https://hyper-toaster.vercel.app"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-ink/40 border border-cream/25 rounded-xl text-xs font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code uppercase font-bold text-cream mb-1">
                  GitHub / Codebase Repository
                </label>
                <div className="relative">
                  <Terminal className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/50" />
                  <input
                    type="url"
                    placeholder="https://github.com/hypertoaster/core"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-ink/40 border border-cream/25 rounded-xl text-xs font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <PillButton
                  type="submit"
                  variant="gold"
                  size="md"
                  className="w-full"
                >
                  {submitted ? "Submission Recorded! Update Link" : "Submit For Stage 2 Review →"}
                </PillButton>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-900/60 border border-emerald-500/50 rounded-xl text-xs font-mono-code text-emerald-200 text-center">
                  ✅ Prototype URL successfully broadcast to jury!
                </div>
              )}
            </form>
          </div>

          {/* Quick Info Box */}
          <div className="bg-ink/40 border-2 border-gold/30 rounded-3xl p-6 backdrop-blur-md space-y-3 text-xs font-mono-code text-cream/80">
            <div className="font-display text-base text-gold uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Next Checkpoint
            </div>
            <p>
              Round 2 pitch slots are assigned after Round 1 results. Make sure your pitch deck works without internet-gated walls and your Q&A defense covers all 7 rubric areas.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
