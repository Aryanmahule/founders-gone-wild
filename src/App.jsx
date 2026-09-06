import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { StorySection } from './components/home/StorySection';
import { FinalCta } from './components/home/FinalCta';
import { DrawYourFate } from './components/fate/DrawYourFate';
import { RulesPage } from './components/pages/RulesPage';
import { RoundsPage } from './components/pages/RoundsPage';
import { CardsLibraryPage } from './components/pages/CardsLibraryPage';
import { LeaderboardPage } from './components/pages/LeaderboardPage';
import { JudgesPage } from './components/pages/JudgesPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { TeamPage } from './components/pages/TeamPage';
import { LoadingScreen } from './components/intro/LoadingScreen';

export function App() {
  const [activePage, setActivePage] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage, loading]);

  if (loading) {
    return <LoadingScreen onDone={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-bg text-comicWhite relative selection:bg-gold selection:text-ink flex flex-col justify-between animate-fadeIn">

      <div className="sunburst-bg" />

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="relative z-10 flex-grow">
        {activePage === 'home' && (
          <div>
            <Hero setActivePage={setActivePage} />
            <StorySection setActivePage={setActivePage} />
            <FinalCta setActivePage={setActivePage} />
          </div>
        )}
        {activePage === 'fate' && <DrawYourFate setActivePage={setActivePage} />}
        {activePage === 'rules' && <RulesPage setActivePage={setActivePage} />}
        {activePage === 'rounds' && <RoundsPage setActivePage={setActivePage} />}
        {activePage === 'cards' && <CardsLibraryPage setActivePage={setActivePage} />}
        {activePage === 'leaderboard' && <LeaderboardPage setActivePage={setActivePage} />}
        {activePage === 'judges' && <JudgesPage setActivePage={setActivePage} />}
        {activePage === 'register' && <RegisterPage setActivePage={setActivePage} />}
        {activePage === 'dashboard' && <DashboardPage setActivePage={setActivePage} />}
        {activePage === 'team' && <TeamPage setActivePage={setActivePage} />}
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
