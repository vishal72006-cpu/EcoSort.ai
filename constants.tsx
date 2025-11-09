import React from 'react';
import { View, WasteCategory } from './types';

// FIX: Use React.ReactElement instead of JSX.Element to avoid "Cannot find namespace 'JSX'" error.
export const ICONS: Record<WasteCategory, React.ReactElement> = {
  Recyclable: <span role="img" aria-label="Recyclable">♻️</span>,
  Compostable: <span role="img" aria-label="Compostable">🌱</span>,
  'E-waste': <span role="img" aria-label="E-waste">⚡️</span>,
  Hazardous: <span role="img" aria-label="Hazardous">☣️</span>,
  Textile: <span role="img" aria-label="Textile">👕</span>,
  'General Waste': <span role="img" aria-label="General Waste">🗑️</span>,
};

export const NAV_ITEMS = [
  { view: View.Home, label: 'Home', icon: '🏠' },
  { view: View.Dashboard, label: 'Dashboard', icon: '📈' },
  { view: View.Chat, label: 'Ask EcoSort', icon: '💬' },
  { view: View.About, label: 'About', icon: '🧩' },
];

export const CATEGORY_STATS: Record<WasteCategory, { co2: number, points: number }> = {
    Recyclable: { co2: 2.5, points: 10 },
    Compostable: { co2: 0.5, points: 5 },
    'E-waste': { co2: 15.0, points: 50 },
    Hazardous: { co2: 20.0, points: 100 },
    Textile: { co2: 3.0, points: 15 },
    'General Waste': { co2: 0, points: 1 },
};