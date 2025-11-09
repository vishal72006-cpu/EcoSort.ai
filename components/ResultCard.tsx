
import React from 'react';

interface ResultCardProps {
  title: string;
  content: string;
  icon?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, content, icon }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <h5 className="text-lg font-semibold text-eco-text mb-2">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h5>
      <p className="text-gray-700 text-sm">{content}</p>
    </div>
  );
};

export default ResultCard;
