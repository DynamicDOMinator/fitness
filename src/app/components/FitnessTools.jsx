'use client';
import { useState } from 'react';
import FFMIThermometer from './FFMIThermometer';

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

  const calculateFFMI = (formData) => {
    const { weight, height, bodyFat } = formData;
    const heightInMeters = height / 100;
    const fatFreeWeight = weight * (1 - bodyFat / 100);
    const ffmi = fatFreeWeight / (heightInMeters * heightInMeters);
    
    // Normalize FFMI for height (adjusted FFMI)
    const adjustedFFMI = ffmi + 6.1 * (1.8 - heightInMeters);
    
    let category, percentage, description;
    
    if (adjustedFFMI < 16) {
      category = 'Below Average';
      percentage = 10;
      description = 'Below normal muscle mass development';
    } else if (adjustedFFMI < 17) {
      category = 'Average';
      percentage = 25;
      description = 'Normal muscle mass for general population';
    } else if (adjustedFFMI < 18) {
      category = 'Above Average';
      percentage = 40;
      description = 'Good muscle development with training';
    } else if (adjustedFFMI < 20) {
      category = 'Excellent';
      percentage = 60;
      description = 'Excellent muscle development, dedicated training';
    } else if (adjustedFFMI < 22) {
      category = 'Genetically Excellent';
      percentage = 75;
      description = 'Superior genetics with excellent training';
    } else if (adjustedFFMI < 25) {
      category = 'Natural Limit';
      percentage = 85;
      description = 'Near maximum natural potential';
    } else if (adjustedFFMI < 28) {
      category = '99% Unnatural';
      percentage = 95;
      description = 'Likely enhanced performance';
    } else {
      category = 'Steroids';
      percentage = 100;
      description = 'Almost certainly enhanced';
    }
    
    return { 
      ffmi: ffmi.toFixed(1), 
      adjustedFFMI: adjustedFFMI.toFixed(1), 
      category, 
      percentage,
      description,
      fatFreeWeight: fatFreeWeight.toFixed(1)
    };
  };

  const calculateOneRepMax = (formData) => {
    const { weight, reps, exercise } = formData;
    
    // Using Brzycki formula: 1RM = weight / (1.0278 - 0.0278 × reps)
    let oneRepMax;
    if (reps === 1) {
      oneRepMax = weight;
    } else {
      oneRepMax = weight / (1.0278 - 0.0278 * reps);
    }
    
    // Calculate percentage ranges for different rep ranges
    const percentages = {
      '90%': Math.round(oneRepMax * 0.9),
      '85%': Math.round(oneRepMax * 0.85),
      '80%': Math.round(oneRepMax * 0.8),
      '75%': Math.round(oneRepMax * 0.75),
      '70%': Math.round(oneRepMax * 0.7),
      '65%': Math.round(oneRepMax * 0.65),
      '60%': Math.round(oneRepMax * 0.6)
    };
    
    return {
      oneRepMax: Math.round(oneRepMax),
      exercise,
      percentages
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
      id: 'ffmi',
      title: 'FFMI Calculator',
      description: 'Calculate your Fat-Free Mass Index with detailed scale analysis',
      icon: (
        <svg className="w-16 h-16 text-[#fd5747]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          <path d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4"/>
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
      id: 'onerepmax',
      title: 'One-Rep Max Calculator',
      description: 'Calculate your maximum strength for any exercise',
      icon: (
        <svg className="w-16 h-16 text-[#fd5747]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2v6h.01L6 8a2 2 0 100 4v.01L6 12v6"/>
          <path d="M18 2v6h.01L18 8a2 2 0 100 4v.01L18 12v6"/>
          <path d="M6 8h12"/>
          <circle cx="12" cy="8" r="2"/>
          <path d="M8 21l8-8"/>
          <path d="M16 21l-8-8"/>
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
      case 'ffmi':
        result = calculateFFMI(formData);
        break;
      case 'macros':
        result = calculateMacros(formData);
        break;
      case 'onerepmax':
        result = calculateOneRepMax(formData);
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
            Fitness <span className=" text-red-500">Tools</span>
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

      case 'ffmi':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
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
              <label className="block text-white text-sm font-medium mb-2">Body Fat Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                min="3"
                max="50"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value))}
              />
              <p className="text-xs text-gray-400 mt-1">Enter your body fat percentage (3-50%)</p>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Calculate FFMI
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

      case 'onerepmax':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Exercise</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('exercise', e.target.value)}
              >
                <option value="">Select exercise</option>
                <option value="Bench Press">Bench Press</option>
                <option value="Squat">Squat</option>
                <option value="Deadlift">Deadlift</option>
                <option value="Overhead Press">Overhead Press</option>
                <option value="Barbell Row">Barbell Row</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Weight Lifted (kg)</label>
              <input
                type="number"
                step="0.5"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Repetitions Completed</label>
              <input
                type="number"
                min="1"
                max="20"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('reps', parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-400 mt-1">Enter reps performed (1-20 for accuracy)</p>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Calculate 1RM
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

      case 'ffmi':
        return <FFMIThermometer result={result} />;

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

      case 'onerepmax':
        return (
          <div className="mt-6 p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30">
            <h4 className="text-white font-semibold mb-3">Your One-Rep Max Results:</h4>
            <div className="text-center mb-4">
              <p className="text-gray-300 text-sm">{result.exercise}</p>
              <p className="text-3xl font-bold text-purple-400">{result.oneRepMax} kg</p>
              <p className="text-gray-400 text-sm">Estimated 1RM</p>
            </div>
            
            <div className="space-y-2">
              <h5 className="text-white font-medium text-sm mb-2">Training Percentages:</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(result.percentages).map(([percentage, weight]) => (
                  <div key={percentage} className="flex justify-between bg-black/30 rounded px-2 py-1">
                    <span className="text-gray-300">{percentage}:</span>
                    <span className="text-white font-semibold">{weight} kg</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-gray-400">
                <p>• 90-95%: Max strength (1-3 reps)</p>
                <p>• 80-85%: Strength training (3-6 reps)</p>
                <p>• 70-75%: Power/Hypertrophy (6-8 reps)</p>
                <p>• 60-65%: Hypertrophy (8-12 reps)</p>
              </div>
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