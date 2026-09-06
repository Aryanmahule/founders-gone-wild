import React, { useState } from 'react';
import { DOMAIN_CARDS, OBJECT_CARDS, POWERUP_CARDS } from '../../data/cardsData';
import { PillButton } from '../ui/UIComponents';
import { Layers, Search } from 'lucide-react';
import { soundFX } from '../../utils/audio';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZTOSL6CbQQEQ3fU5HcKwTWKtaxQ-RgPSrR3wShZjAA6c18w/viewform';

export const CardsLibraryPage = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const allCards = [
    ...DOMAIN_CARDS.map(c => ({ ...c, type: 'domain' })),
    ...OBJECT_CARDS.map(c => ({ ...c, type: 'object' })),
    ...POWERUP_CARDS.map(c => ({ ...c, type: 'powerup' })),
  ];

  const filteredCards = allCards.filter(c => {
    const matchesTab = activeTab === 'all' || c.type === activeTab;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      (c.category && c.category.toLowerCase().includes(q)) ||
      (c.tagline && c.tagline.toLowerCase().includes(q));
    return matchesTab && matchesSearch;
  });

  const tabs = [
    { id: 'all',     label: 'All Cards',     count: allCards.length },
    { id: 'domain',  label: 'Domain',        count: DOMAIN_CARDS.length },
    { id: 'object',  label: 'Crazy Objects', count: OBJECT_CARDS.length },
    { id: 'powerup', label: 'Power-Ups',     count: POWERUP_CARDS.length },
  ];

  const borderGlow = (type) => {
    if (type === 'domain')  return 'border-comicBlue/40 hover:border-comicBlue hover:shadow-[0_0_20px_rgba(47,111,168,0.4)]';
    if (type === 'object')  return 'border-gold/40 hover:border-gold hover:shadow-[0_0_20px_rgba(242,201,78,0.3)]';
    if (type === 'powerup') return 'border-emerald-400/40 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]';
    return 'border-red-400/50 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]';
  };

  const badgeBg = (type) => {
    if (type === 'domain')  return 'bg-comicBlue text-white';
    if (type === 'object')  return 'bg-gold text-ink';
    if (type === 'powerup') return 'bg-emerald-500 text-white';
    return 'bg-red-500 text-white';
  };

  const badgeLabel = (type) => {
    if (type === 'domain')  return 'Domain';
    if (type === 'object')  return 'Crazy Object';
    return 'Power-Up';
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-wider bg-cream/15 border border-cream/40 px-4 py-1.5 rounded-full text-cream">
          <Layers className="w-4 h-4 text-gold" />
          The Card Shop Archive
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
          <span className="comic-shadow-gold-blue">Browse the</span>{' '}
          <span className="comic-shadow-purple-cream">Deck</span>
        </h1>

        <p className="text-base sm:text-lg text-comicWhite/85 font-medium">
          Domain cards define your tech space. Crazy Object cards define your absurd twist. Power-Up cards give you advantages. Spend your Founder Points wisely.
        </p>
      </div>

      {/* Search + Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-bg-deep/70 p-4 rounded-2xl border border-cream/20 backdrop-blur-md">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/60" />
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ink/40 border border-cream/25 rounded-xl text-xs font-body text-cream placeholder-cream/40 focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { soundFX.playClick(); setActiveTab(tab.id); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold text-ink shadow-comic-gold font-extrabold'
                  : 'bg-ink/30 text-cream/80 hover:bg-cream/15'
              }`}
            >
              {tab.label}
              <span className="text-[10px] opacity-75 font-mono-code bg-ink/30 px-1.5 py-0.5 rounded">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            onClick={() => { soundFX.playFlip(); setSelectedCard(card); }}
            className={`bg-ink/60 border-2 ${borderGlow(card.type)} rounded-3xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group select-none`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono-code font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badgeBg(card.type)}`}>
                  {badgeLabel(card.type)}
                </span>
                <span className="text-xs font-mono-code text-gold font-bold">
                  {card.rarity || card.severity || 'Common'}
                </span>
              </div>
              <div className="text-center py-3">
                <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="font-display text-xl text-comicWhite uppercase tracking-tight line-clamp-1">
                  {card.title}
                </h3>
                <div className="text-[11px] font-mono-code text-cream/70 uppercase mt-0.5">
                  {card.category || 'Modifier'}
                </div>
              </div>
              <p className="text-xs text-comicWhite/80 line-clamp-2 leading-relaxed italic text-center">
                "{card.tagline || card.modifier}"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cream/15 flex items-center justify-between text-[10px] font-mono-code">
              <span className="text-cream/70">Click for details</span>
              {card.price && (
                <span className="text-gold font-bold">{card.price} pts</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Card detail modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-bg-deep border-4 border-gold rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-cream hover:text-gold font-mono-code text-lg font-bold p-1"
            >
              ✕
            </button>

            <div className="text-center space-y-3">
              <div className="text-6xl animate-float">{selectedCard.icon}</div>
              <h2 className="font-display text-3xl text-gold uppercase">{selectedCard.title}</h2>
              <div className="inline-block font-mono-code text-xs font-bold uppercase tracking-wider bg-ink/50 text-cream px-3 py-1 rounded-full border border-cream/20">
                {selectedCard.category || 'Card'} • {selectedCard.rarity || selectedCard.severity}
              </div>
              {selectedCard.price && (
                <div className="inline-block ml-2 font-mono-code text-xs font-bold uppercase bg-gold text-ink px-3 py-1 rounded-full">
                  {selectedCard.price} Founder Points
                </div>
              )}
            </div>

            <div className="space-y-4 bg-ink/40 p-5 rounded-2xl border border-cream/20">
              <div>
                <div className="text-[11px] font-mono-code uppercase font-bold text-gold mb-1">Description:</div>
                <p className="text-sm text-comicWhite/90 leading-relaxed font-medium">
                  {selectedCard.tagline || selectedCard.modifier}
                </p>
              </div>

              {selectedCard.promptHook && (
                <div>
                  <div className="text-[11px] font-mono-code uppercase font-bold text-gold mb-1">Ideation Prompt:</div>
                  <p className="text-sm text-cream/80 italic">"{selectedCard.promptHook}"</p>
                </div>
              )}

              {selectedCard.quirk && (
                <div>
                  <div className="text-[11px] font-mono-code uppercase font-bold text-cream/70 mb-1">Object Quirk:</div>
                  <p className="text-sm text-cream/80 font-medium">{selectedCard.quirk}</p>
                </div>
              )}

              {selectedCard.effect && (
                <div>
                  <div className="text-[11px] font-mono-code uppercase font-bold text-emerald-400 mb-1">Power Effect:</div>
                  <p className="text-sm text-emerald-200 font-medium">{selectedCard.effect}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <PillButton variant="gold" size="md" onClick={() => { setSelectedCard(null); window.open(REGISTER_URL, '_blank', 'noopener,noreferrer'); }}>
                Register to Play →
              </PillButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
