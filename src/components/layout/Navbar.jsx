import React, { useState, useEffect } from 'react';
import { PillButton } from '../ui/UIComponents';
import { Sparkles, Zap, Menu, X, ShieldAlert, Award, Layers, Users, BookOpen, Clock, Compass } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export const Navbar = ({ activePage, setActivePage, onOpenChaos }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Switch from transparent to blurred after user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Set initial state in case page is already scrolled
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'fate', label: 'Draw Fate', icon: <Sparkles className="w-4 h-4 text-gold" /> },
    { id: 'rules', label: 'Rules', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'rounds', label: 'Rounds', icon: <Clock className="w-4 h-4" /> },
    { id: 'cards', label: 'Cards Library', icon: <Layers className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award className="w-4 h-4" /> },
    { id: 'judges', label: 'Judges', icon: <Users className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Zap className="w-4 h-4" /> },
  ];

  const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

  const handleNavClick = (id) => {
    soundFX.playClick();
    if (id === 'register') {
      window.open(REGISTER_URL, '_blank', 'noopener,noreferrer');
      setMobileMenuOpen(false);
      return;
    }
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-bg-deep/90 backdrop-blur-md border-cream/25 shadow-lg'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Mark */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-ink/60 border border-gold/40 shadow-inner group-hover:border-gold transition-colors">
              <span className="w-3.5 h-3.5 rounded-full bg-gold shadow-[0_0_14px_#F2C94C] animate-pulse" />
              <span className="absolute -top-1 -right-1 text-xs">🃏</span>
            </div>
            <div>
              <div className="font-display text-2xl tracking-wider text-gold drop-shadow-sm flex items-center gap-1.5">
                FGW
                <span className="text-[11px] font-mono-code font-bold text-cream/75 bg-ink/40 px-1.5 py-0.5 rounded border border-cream/20">
                  V2.0
                </span>
              </div>
              <div className="text-[9px] font-mono-code uppercase tracking-widest text-comicWhite/70">
                Founders Gone Wild
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all select-none ${
                    isActive
                      ? 'bg-cream/20 text-gold border border-gold/40 shadow-sm'
                      : 'text-comicWhite/85 hover:text-gold hover:bg-cream/10'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Chaos Trigger Button */}
            <button
              onClick={() => {
                soundFX.playChaos();
                onOpenChaos();
              }}
              className="flex items-center gap-1.5 bg-purple/80 hover:bg-purple text-comicWhite text-xs font-mono-code font-bold uppercase px-3.5 py-2 rounded-full border border-purple/60 shadow-comic-purple transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <Zap className="w-3.5 h-3.5 text-gold animate-bounce" />
              <span>Chaos Strike</span>
            </button>

            {/* Register Pill CTA */}
            <PillButton
              variant="gold"
              size="sm"
              onClick={() => handleNavClick('register')}
            >
              Register Squad →
            </PillButton>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => {
                soundFX.playChaos();
                onOpenChaos();
              }}
              className="p-2 rounded-lg bg-purple text-comicWhite text-xs border border-cream/30"
              title="Trigger Chaos Card"
            >
              <Zap className="w-4 h-4 text-gold" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-ink/40 text-cream hover:text-gold border border-cream/20"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-bg-deep/95 border-b-2 border-cream/30 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                    isActive
                      ? 'bg-gold text-ink font-extrabold shadow-comic-gold'
                      : 'bg-ink/30 text-comicWhite/90 border border-cream/15'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <PillButton
              variant="gold"
              size="md"
              className="w-full"
              onClick={() => handleNavClick('register')}
            >
              Register Your Squad Now
            </PillButton>
          </div>
        </div>
      )}
    </nav>
  );
};
