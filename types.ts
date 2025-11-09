
export enum View {
  Home = 'Home',
  Dashboard = 'Dashboard',
  Chat = 'Chat',
  About = 'About',
}

export type WasteCategory = 'Recyclable' | 'Compostable' | 'E-waste' | 'Hazardous' | 'Textile' | 'General Waste';

export interface WasteAnalysis {
  itemName: string;
  materialType: string;
  category: WasteCategory;
  disposalMethod: string;
  recycledInto: string;
  ecoTip: string;
  impactFact: string;
  error?: string;
}

export interface DashboardStats {
  itemsSorted: number;
  co2Saved: number; // in kg
  greenPoints: number;
  categoryCounts: Record<WasteCategory, number>;
}
