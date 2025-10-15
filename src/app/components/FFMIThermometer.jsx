'use client';
import { useEffect, useState } from 'react';

export default function FFMIThermometer({ result }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (result?.percentage) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(result.percentage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [result?.percentage]);

  if (!result) return null;

  const getColorByCategory = (category) => {
    switch (category) {
      case 'Below Average':
        return '#ef4444'; // red-500
      case 'Average':
        return '#f97316'; // orange-500
      case 'Above Average':
        return '#eab308'; // yellow-500
      case 'Excellent':
        return '#22c55e'; // green-500
      case 'Genetically Excellent':
        return '#06b6d4'; // cyan-500
      case 'Natural Limit':
        return '#3b82f6'; // blue-500
      case '99% Unnatural':
        return '#8b5cf6'; // violet-500
      case 'Steroids':
        return '#ec4899'; // pink-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const color = getColorByCategory(result.category);

  return (
    <div className="mt-6 p-6 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-xl border border-white/10">
      <h4 className="text-white font-semibold mb-4 text-center">Your FFMI Results</h4>
      
      {/* FFMI Values */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm">FFMI</p>
          <p className="text-2xl font-bold text-white">{result.ffmi}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">Adjusted FFMI</p>
          <p className="text-2xl font-bold text-white">{result.adjustedFFMI}</p>
        </div>
      </div>

      {/* Thermometer Container */}
      <div className="relative mb-6">
        {/* Thermometer Background */}
        <div className="w-full h-8 bg-gray-700 rounded-full overflow-hidden relative">
          {/* Animated Fill */}
          <div 
            className="h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
            style={{ 
              width: `${animatedPercentage}%`,
              backgroundColor: color,
              boxShadow: `0 0 20px ${color}40`
            }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          
          {/* Percentage Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm drop-shadow-lg">
              {animatedPercentage}%
            </span>
          </div>
        </div>

        {/* Scale Markers */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Category Information */}
      <div className="text-center">
        <div 
          className="inline-block px-4 py-2 rounded-full text-white font-semibold mb-2"
          style={{ backgroundColor: color }}
        >
          {result.category}
        </div>
        <p className="text-gray-300 text-sm">{result.description}</p>
        
        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Fat-Free Weight: <span className="text-white font-semibold">{result.fatFreeWeight} kg</span>
          </p>
        </div>
      </div>

      {/* FFMI Scale Legend */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h5 className="text-white font-medium mb-3 text-center">FFMI Scale</h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-gray-300">Below Average (10%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-gray-300">Average (25%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-gray-300">Above Average (40%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-300">Excellent (60%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
            <span className="text-gray-300">Genetically Excellent (75%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-gray-300">Natural Limit (85%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
            <span className="text-gray-300">99% Unnatural (95%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
            <span className="text-gray-300">Steroids (100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}