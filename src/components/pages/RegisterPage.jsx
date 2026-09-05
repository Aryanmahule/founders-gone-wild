import React, { useState } from 'react';
import { PillButton } from '../ui/UIComponents';
import { Sparkles, Users, CheckCircle2, ShieldAlert, ArrowRight, UserPlus, Trash2, Trophy } from 'lucide-react';
import { soundFX } from '../../utils/audio';
import confetti from 'canvas-confetti';

export const RegisterPage = ({ setActivePage }) => {
  const [squadName, setSquadName] = useState('');
  const [projectTrack, setProjectTrack] = useState('Neuro-Hardware');
  const [captainEmail, setCaptainEmail] = useState('');
  const [members, setMembers] = useState([
    { name: '', role: 'Team Lead', email: '' },
    { name: '', role: 'Strategist / Business', email: '' },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const tracks = [
    'AI & Machine Learning',
    'Blockchain & Web3',
    'Augmented Reality',
    'Biotechnology',
    'IoT & Smart Devices',
    'Space Technology',
    'Clean Energy',
    'EdTech',
    'HealthTech',
    'FinTech',
  ];

  const handleAddMember = () => {
    if (members.length >= 5) {
      setErrorMessage('Squad maximum is 5 members.');
      return;
    }
    setErrorMessage('');
    soundFX.playClick();
    setMembers([...members, { name: '', role: 'Fullstack Engineer', email: '' }]);
  };

  const handleRemoveMember = (idx) => {
    if (members.length <= 2) {
      setErrorMessage('Squad minimum is 2 members.');
      return;
    }
    setErrorMessage('');
    soundFX.playClick();
    setMembers(members.filter((_, i) => i !== idx));
  };

  const handleMemberChange = (idx, field, value) => {
    const updated = [...members];
    updated[idx][field] = value;
    setMembers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!squadName.trim()) {
      setErrorMessage('Please provide a squad name.');
      return;
    }
    if (!captainEmail.trim() || !captainEmail.includes('@')) {
      setErrorMessage('Please provide a valid captain contact email.');
      return;
    }
    const hasEmptyName = members.some(m => !m.name.trim());
    if (hasEmptyName) {
      setErrorMessage('Please fill in names for all 2–5 team members.');
      return;
    }

    setErrorMessage('');
    soundFX.playSuccess();
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F2C94C', '#6C3FA6', '#EDE6C4', '#2F6FA8']
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Users className="w-4 h-4 text-gold" />
          Squad Enrollment Protocol
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Register Your</span>{' '}
          <span className="comic-shadow-purple-cream">Team</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Lock in your crew of 2–5 members. One quiz. One card shop. One shot at the Sharks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Registration Form (7 cols) */}
        <div className="lg:col-span-7 bg-bg-deep/85 border-2 border-cream/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Squad Name & Track */}
            <div className="space-y-4">
              <h3 className="font-display text-xl text-gold uppercase flex items-center gap-2">
                <span>1.</span> Squad Identity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-code uppercase font-bold text-cream mb-1.5">
                    Squad / Syndicate Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HyperToaster Syndicate"
                    value={squadName}
                    onChange={(e) => setSquadName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-ink/40 border border-cream/30 rounded-xl text-sm font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code uppercase font-bold text-cream mb-1.5">
                    Primary Focus Track *
                  </label>
                  <select
                    value={projectTrack}
                    onChange={(e) => setProjectTrack(e.target.value)}
                    className="w-full px-4 py-2.5 bg-ink/40 border border-cream/30 rounded-xl text-sm font-body text-cream focus:outline-none focus:border-gold"
                  >
                    {tracks.map(t => <option key={t} value={t} className="bg-bg-deep text-cream">{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-code uppercase font-bold text-cream mb-1.5">
                  Captain / Lead Contact Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="captain@squad.dev"
                  value={captainEmail}
                  onChange={(e) => setCaptainEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-ink/40 border border-cream/30 rounded-xl text-sm font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Member Roster */}
            <div className="space-y-4 pt-4 border-t border-cream/20">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-gold uppercase flex items-center gap-2">
                  <span>2.</span> Team Roster ({members.length}/5)
                </h3>
                {members.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center gap-1.5 text-xs font-mono-code font-bold uppercase text-gold hover:text-white bg-ink/30 px-3 py-1 rounded-lg border border-gold/40"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Add Member
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {members.map((member, idx) => (
                  <div key={idx} className="bg-ink/30 p-4 rounded-2xl border border-cream/15 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono-code text-cream/70 font-bold uppercase">
                      <span>Member #{idx + 1} {idx === 0 && '(Team Lead / Captain)'}</span>
                      {idx > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={member.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-bg-deep/70 border border-cream/20 rounded-xl text-sm font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. Lead Hacker)"
                        value={member.role}
                        onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-bg-deep/70 border border-cream/20 rounded-xl text-sm font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-900/60 border border-red-500/50 text-red-200 text-xs font-mono-code flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2">
              <PillButton
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                icon={<ArrowRight className="w-5 h-5 text-ink" />}
              >
                Confirm Squad & Issue Pass →
              </PillButton>
            </div>

          </form>

        </div>

        {/* Live Ticket & Badge Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono-code uppercase font-bold text-gold tracking-wider text-center lg:text-left">
            Live Squad Pass Preview:
          </div>

          <div className="bg-ink/90 border-4 border-gold rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
            {/* Background watermarks */}
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 pointer-events-none">
              🃏
            </div>

            <div className="flex items-center justify-between border-b border-cream/20 pb-4">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-gold font-bold">
                  FGW OFFICIAL PASS
                </span>
                <h3 className="font-display text-2xl text-comicWhite uppercase">
                  {squadName.trim() || 'Your Squad Name'}
                </h3>
              </div>
              <span className="text-2xl">⚡</span>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono-code uppercase text-cream/70">
                Track Designation:
              </div>
              <div className="text-sm font-mono-code font-bold text-gold bg-bg-deep/80 px-3 py-1.5 rounded-xl border border-cream/20 inline-block">
                {projectTrack}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono-code uppercase text-cream/70">
                Registered Founders ({members.filter(m => m.name.trim()).length || 0}):
              </div>
              <div className="space-y-1 text-xs text-cream/90 font-medium">
                {members.map((m, i) => (
                  <div key={i} className="flex justify-between items-center bg-bg-deep/40 px-2.5 py-1 rounded-lg">
                    <span>{m.name.trim() || `Founder #${i + 1}`}</span>
                    <span className="text-[10px] text-gold font-mono-code">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-cream/20 flex justify-between items-center text-[10px] font-mono-code text-cream/60">
              <span>STATUS: {isSubmitted ? 'CONFIRMED ✅' : 'PENDING LOCK'}</span>
              <span>1-DAY EVENT READY</span>
            </div>
          </div>
        </div>

      </div>

      {/* Submission Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-bg-deep border-4 border-gold rounded-3xl max-w-md w-full p-8 shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-4xl animate-bounce">
              🎉
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-code uppercase font-bold text-gold">
                Registration Confirmed
              </span>
              <h2 className="font-display text-3xl uppercase text-comicWhite">
                Welcome, {squadName}!
              </h2>
              <p className="text-xs text-cream/80 leading-relaxed font-medium">
                Your squad is locked into the Founders Gone Wild arena. Your mission dashboard has been initialized.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <PillButton
                variant="gold"
                size="md"
                onClick={() => setActivePage('dashboard')}
              >
                Go to Squad Mission Dashboard →
              </PillButton>
              <PillButton
                variant="outline"
                size="sm"
                onClick={() => setActivePage('fate')}
              >
                Practice Fate Draw
              </PillButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
