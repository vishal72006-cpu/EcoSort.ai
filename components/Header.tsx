
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-4xl font-bold text-eco-green">EcoSort 🌍</h1>
        <p className="text-md text-eco-text mt-1">Sort Smarter. Recycle Better.</p>
      </div>
    </header>
  );
};

export default Header;
