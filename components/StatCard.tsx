
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className={`p-6 rounded-xl border border-gray-700 bg-gray-800/50 flex items-center gap-4 card-shadow`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${colorClass}`}>
        <i className={icon}></i>
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};
