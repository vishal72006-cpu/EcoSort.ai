
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
       <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-eco-green"></div>
       <p className="mt-4 text-eco-text font-semibold">EcoSort is thinking...</p>
    </div>
  );
};

export default Loader;
