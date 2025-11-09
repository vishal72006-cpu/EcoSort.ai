
import React from 'react';
import { View } from '../types';
import { NAV_ITEMS } from '../constants';

interface NavBarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white shadow-lg border-t-2 border-eco-green-light">
      <div className="container mx-auto flex justify-around">
        {NAV_ITEMS.map(({ view, label, icon }) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`flex flex-col items-center justify-center w-full py-2 px-1 text-center transition-colors duration-200 ease-in-out ${
              currentView === view
                ? 'text-eco-green-dark scale-110'
                : 'text-gray-500 hover:text-eco-green'
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className={`text-xs font-medium ${currentView === view ? 'font-bold' : ''}`}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
