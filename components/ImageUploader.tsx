
import React, { useState, useRef } from 'react';
import { analyzeWasteImage } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import { WasteAnalysis, WasteCategory } from '../types';
import Loader from './Loader';
import AnalysisResults from './AnalysisResults';

interface ImageUploaderProps {
  onAnalysisSuccess: (category: WasteCategory) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onAnalysisSuccess }) => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<WasteAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnalysisResult(null);
      setError(null);
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const base64Image = await fileToBase64(file);
        const result = await analyzeWasteImage(base64Image, file.type);
        if (result.error) {
          setError(result.error);
        } else {
          setAnalysisResult(result);
          onAnalysisSuccess(result.category);
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-eco-text mb-4">Classify Your Waste</h2>
        <p className="text-gray-600 mb-6">Upload or take a photo of an item to get instant disposal insights.</p>
        
        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg mb-6 flex items-center justify-center bg-gray-50 overflow-hidden">
          {image ? (
            <img src={image} alt="Uploaded waste item" className="h-full w-full object-contain" />
          ) : (
            <span className="text-gray-400">Your image will appear here</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={triggerFileInput} className="w-full sm:w-auto bg-eco-green hover:bg-eco-green-dark text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-eco-green-light">
            📸 Take Photo
          </button>
           <button onClick={triggerFileInput} className="w-full sm:w-auto bg-white border-2 border-eco-green text-eco-green font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-eco-green-light">
            📤 Upload Image
          </button>
        </div>
      </div>

      {loading && <Loader />}
      {error && !loading && (
        <div className="mt-6 w-full max-w-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center" role="alert">
          <strong className="font-bold">Oops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {analysisResult && !loading && !error && (
        <div className="mt-8 w-full max-w-2xl">
           <h3 className="text-3xl font-bold text-center text-eco-text mb-6">Analysis Complete!</h3>
          <AnalysisResults result={analysisResult} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
