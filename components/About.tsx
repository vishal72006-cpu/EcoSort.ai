
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-eco-text mb-4">About EcoSort 🌍</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          EcoSort is an intelligent sustainability assistant designed to make recycling and waste management simpler and more intuitive for everyone. 
          This project aims to leverage the power of artificial intelligence to provide immediate, actionable insights on how to dispose of waste responsibly.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          By simply taking a photo, users can learn about an item's material, its proper disposal category, and its potential for a second life through recycling. Our goal is to empower individuals to make better environmental choices, one item at a time.
        </p>
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-eco-green-dark mb-3">Technology Stack</h3>
          <p className="text-gray-600">
            This web application is built with <span className="font-bold">React</span> and <span className="font-bold">TypeScript</span>, styled with <span className="font-bold">Tailwind CSS</span>, and powered by the <span className="font-bold">Google Gemini API</span> for all AI-driven analysis and chat functionalities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
