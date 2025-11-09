
import React from 'react';
import { WasteAnalysis } from '../types';
import { ICONS } from '../constants';
import ResultCard from './ResultCard';

interface AnalysisResultsProps {
  result: WasteAnalysis;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border-l-4 border-eco-green">
        <h4 className="text-xl font-bold text-eco-green-dark">{result.itemName}</h4>
        <p className="text-gray-600">Material: {result.materialType}</p>
        <div className="mt-3 inline-flex items-center bg-eco-green-light text-eco-green-dark font-bold px-4 py-2 rounded-full">
            <span className="mr-2 text-xl">{ICONS[result.category]}</span>
            {result.category}
        </div>
      </div>

      <ResultCard title="✅ Recommended Disposal" content={result.disposalMethod} />
      <ResultCard title="🔄 Recycled Into" content={result.recycledInto} />
      <ResultCard title="🌱 Eco Tip" content={result.ecoTip} icon="💡"/>
      <ResultCard title="🌍 Environmental Impact" content={result.impactFact} icon="🔥"/>
    </div>
  );
};

export default AnalysisResults;
