
import React from 'react';
import { DashboardStats } from '../types';
import { ICONS } from '../constants';

interface DashboardProps {
  stats: DashboardStats;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: string }> = ({ label, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-md text-center hover:bg-eco-green-light/20 transition-colors">
        <p className="text-4xl mb-2">{icon}</p>
        <p className="text-3xl font-bold text-eco-green-dark">{value}</p>
        <p className="text-gray-500 font-medium">{label}</p>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-eco-text mb-8">Your Eco Dashboard</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Items Sorted" value={stats.itemsSorted} icon="♻️"/>
        <StatCard label="CO₂ Saved (kg)" value={stats.co2Saved.toFixed(2)} icon="💨"/>
        <StatCard label="Green Points" value={stats.greenPoints} icon="⭐"/>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-eco-text mb-4">Category Breakdown</h3>
        <div className="space-y-4">
            {Object.entries(stats.categoryCounts).map(([category, count]) => {
                const total = stats.itemsSorted > 0 ? stats.itemsSorted : 1;
                const percentage = (count / total) * 100;
                return (
                    <div key={category}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-700 flex items-center">
                                <span className="text-2xl mr-2">{ICONS[category as keyof typeof ICONS]}</span> 
                                {category}
                            </span>
                            <span className="text-sm font-medium text-gray-500">{count} items</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                                className="bg-eco-green h-4 rounded-full" 
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
