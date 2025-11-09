
import React, { useState, useCallback } from 'react';
import { View, WasteCategory, DashboardStats } from './types';
import { CATEGORY_STATS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';

import Header from './components/Header';
import NavBar from './components/NavBar';
import ImageUploader from './components/ImageUploader';
import Dashboard from './components/Dashboard';
import EcoChat from './components/EcoChat';
import About from './components/About';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [dashboardStats, setDashboardStats] = useLocalStorage<DashboardStats>('ecoSortDashboardStats', {
    itemsSorted: 0,
    co2Saved: 0,
    greenPoints: 0,
    categoryCounts: {
      Recyclable: 0,
      Compostable: 0,
      'E-waste': 0,
      Hazardous: 0,
      Textile: 0,
      'General Waste': 0,
    },
  });

  const handleAnalysisSuccess = useCallback((category: WasteCategory) => {
    setDashboardStats(prevStats => {
      const categoryInfo = CATEGORY_STATS[category] || { co2: 0, points: 0 };
      const newCategoryCounts = {
        ...prevStats.categoryCounts,
        [category]: (prevStats.categoryCounts[category] || 0) + 1,
      };

      return {
        itemsSorted: prevStats.itemsSorted + 1,
        co2Saved: prevStats.co2Saved + categoryInfo.co2,
        greenPoints: prevStats.greenPoints + categoryInfo.points,
        categoryCounts: newCategoryCounts,
      };
    });
  }, [setDashboardStats]);

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard stats={dashboardStats} />;
      case View.Chat:
        return <EcoChat />;
      case View.About:
        return <About />;
      case View.Home:
      default:
        return <ImageUploader onAnalysisSuccess={handleAnalysisSuccess} />;
    }
  };

  return (
    <div className="min-h-screen bg-eco-bg text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <NavBar currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
