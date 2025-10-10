'use client';
import { useState } from 'react';

export default function FitnessTools() {
  const [activeModal, setActiveModal] = useState(null);
  const [calculatorResults, setCalculatorResults] = useState({});

  // Calculator functions
  const calculateCalories = (formData) => {
    const { weight, height, age, gender, activity } = formData;
    let bmr;
    
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extra: 1.9
    };
    
    return Math.round(bmr * activityMultipliers[activity]);
  };

  const calculateBMI = (formData) => {
    const { weight, height } = formData;
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    return { bmi: bmi.toFixed(1), category };
  };

  const calculateMacros = (formData) => {
    const { calories, goal } = formData;
    
    const macroRatios = {
      weight_loss: { protein: 0.35, carbs: 0.25, fat: 0.40 },
      muscle_gain: { protein: 0.30, carbs: 0.45, fat: 0.25 },
      maintenance: { protein: 0.25, carbs: 0.45, fat: 0.30 }
    };
    
    const ratios = macroRatios[goal];
    return {
      protein: Math.round((calories * ratios.protein) / 4),
      carbs: Math.round((calories * ratios.carbs) / 4),
      fat: Math.round((calories * ratios.fat) / 9)
    };
  };

  const tools = [
    {
      id: 'calories',
      title: 'Calorie Calculator',
      description: 'Calculate your daily caloric needs based on your goals',
      icon: (
        <svg className="w-16 h-16 text-[#fd5747]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
        </svg>
      )
    },
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and health category',
      icon: (
        <svg className="w-16 h-16 text-[#fd5747]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          <circle cx="12" cy="12" r="3" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'macros',
      title: 'Macro Calculator',
      description: 'Calculate your daily macronutrient breakdown',
      icon: (
        <svg className="w-16 h-16 text-[#fd5747]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      )
    },
    {
      id: 'goals',
      title: 'Goal Setting Tool',
      description: 'Set and track your fitness goals with personalized plans',
      icon: (
        <svg className="w-16 h-16 text-[#fd5747]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  const openModal = (toolId) => {
    setActiveModal(toolId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleCalculatorSubmit = (toolId, formData) => {
    let result;
    
    switch (toolId) {
      case 'calories':
        result = calculateCalories(formData);
        break;
      case 'bmi':
        result = calculateBMI(formData);
        break;
      case 'macros':
        result = calculateMacros(formData);
        break;
      case 'goals':
        result = { message: 'Goal set successfully! Track your progress daily.' };
        break;
      default:
        result = {};
    }
    
    setCalculatorResults({ ...calculatorResults, [toolId]: result });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fitness <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd5747] to-red-600">Tools</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Use our comprehensive fitness calculators to track your progress and optimize your health journey
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => openModal(tool.id)}
              className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow group"
              style={{
                backgroundSize: '400% 400%',
                height: '320px',
              }}
            >
              {/* Card Content */}
              <div className="p-6 flex flex-col items-center text-center h-full justify-center">
                {/* Icon */}
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {tool.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {tool.description}
                </p>
                
                {/* Click indicator */}
                <div className="mt-4 text-[#fd5747] text-sm font-medium group-hover:text-white transition-colors duration-300">
                  Click to calculate →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto ring-1 ring-white/10">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {tools.find(t => t.id === activeModal)?.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <ModalContent 
                toolId={activeModal} 
                onSubmit={handleCalculatorSubmit}
                result={calculatorResults[activeModal]}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Modal Content Component
function ModalContent({ toolId, onSubmit, result }) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(toolId, formData);
  };

  const renderForm = () => {
    switch (toolId) {
      case 'calories':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('age', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Gender</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Activity Level</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('activity', e.target.value)}
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (light exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                <option value="active">Active (hard exercise 6-7 days/week)</option>
                <option value="extra">Extra Active (very hard exercise, physical job)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Calculate Calories
            </button>
          </form>
        );

      case 'bmi':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('height', parseFloat(e.target.value))}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Calculate BMI
            </button>
          </form>
        );

      case 'macros':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Daily Calories</label>
              <input
                type="number"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('calories', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Goal</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('goal', e.target.value)}
              >
                <option value="">Select your goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Calculate Macros
            </button>
          </form>
        );

      case 'goals':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Primary Goal</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
              >
                <option value="">Select primary goal</option>
                <option value="lose_weight">Lose Weight</option>
                <option value="gain_muscle">Gain Muscle</option>
                <option value="improve_endurance">Improve Endurance</option>
                <option value="increase_strength">Increase Strength</option>
                <option value="general_fitness">General Fitness</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Target Timeline</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              >
                <option value="">Select timeline</option>
                <option value="1_month">1 Month</option>
                <option value="3_months">3 Months</option>
                <option value="6_months">6 Months</option>
                <option value="1_year">1 Year</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Current Fitness Level</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
              >
                <option value="">Select fitness level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Weekly Workout Days</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('workoutDays', e.target.value)}
              >
                <option value="">Select workout frequency</option>
                <option value="2">2 days/week</option>
                <option value="3">3 days/week</option>
                <option value="4">4 days/week</option>
                <option value="5">5 days/week</option>
                <option value="6">6 days/week</option>
                <option value="7">7 days/week</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Set Goals
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (toolId) {
      case 'calories':
        return (
          <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
            <h4 className="text-white font-semibold mb-2">Your Daily Calorie Needs:</h4>
            <p className="text-2xl font-bold text-green-400">{result} calories/day</p>
          </div>
        );

      case 'bmi':
        return (
          <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <h4 className="text-white font-semibold mb-2">Your BMI Results:</h4>
            <p className="text-2xl font-bold text-blue-400">BMI: {result.bmi}</p>
            <p className="text-white mt-1">Category: {result.category}</p>
          </div>
        );

      case 'macros':
        return (
          <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
            <h4 className="text-white font-semibold mb-2">Your Daily Macros:</h4>
            <div className="space-y-1">
              <p className="text-white">Protein: <span className="font-bold text-green-400">{result.protein}g</span></p>
              <p className="text-white">Carbs: <span className="font-bold text-green-400">{result.carbs}g</span></p>
              <p className="text-white">Fat: <span className="font-bold text-green-400">{result.fat}g</span></p>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="mt-6 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <h4 className="text-white font-semibold mb-2">Goal Set Successfully! 🎯</h4>
            <p className="text-white">{result.message}</p>
            <div className="mt-3 text-sm text-gray-300">
              <p>• Track your progress daily</p>
              <p>• Stay consistent with your plan</p>
              <p>• Adjust as needed based on results</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderForm()}
      {renderResult()}
    </div>
  );
}