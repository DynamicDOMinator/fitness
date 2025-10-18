'use client';
import { useState } from 'react';
import FFMIThermometer from './FFMIThermometer';
import { useLanguage } from '../contexts/LanguageContext';
export default function FitnessTools() {
  const [activeModal, setActiveModal] = useState(null);
  const [calculatorResults, setCalculatorResults] = useState({});
  const { isArabic } = useLanguage();

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

  const calculateMacroMap = (formData) => {
    const { weight, height, age, gender, activity, targetWeight, timePeriod } = formData;
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extra: 1.9
    };
    
    const tdee = Math.round(bmr * activityMultipliers[activity]);
    
    // Calculate weight change needed and weekly rate
    const weightChange = targetWeight - weight;
    const weeksNeeded = timePeriod * 4.33; // Convert months to weeks (average)
    const weeklyWeightChange = Math.abs(weightChange / weeksNeeded);
    
    // Check for unsafe rates and generate warnings
    let warnings = [];
    if (weightChange > 0 && weeklyWeightChange > 0.5) {
      warnings.push("It is not advised to aim for more than 0.5kg of weight gain per week if your focus is to gain lean muscle mass");
    }
    if (weightChange < 0 && weeklyWeightChange > 1) {
      warnings.push("It is not advised to aim for more than 1kg of weight loss per week if your goal is to preserve muscle mass");
    }
    
    // Calculate daily calorie adjustment needed
    // 1kg of body weight ≈ 7700 calories
    const totalCalorieChange = weightChange * 7700;
    const dailyCalorieAdjustment = Math.round(totalCalorieChange / (weeksNeeded * 7));
    const targetCalories = tdee + dailyCalorieAdjustment;
    
    // Determine macro ratios based on goal
    let macroRatios;
    if (weightChange < 0) {
      // Weight loss - higher protein to preserve muscle
      macroRatios = { protein: 0.35, carbs: 0.25, fat: 0.40 };
    } else if (weightChange > 0) {
      // Weight gain - balanced for muscle building
      macroRatios = { protein: 0.30, carbs: 0.45, fat: 0.25 };
    } else {
      // Maintenance
      macroRatios = { protein: 0.25, carbs: 0.45, fat: 0.30 };
    }
    
    // Calculate macros
    const macros = {
      protein: Math.round((targetCalories * macroRatios.protein) / 4),
      carbs: Math.round((targetCalories * macroRatios.carbs) / 4),
      fat: Math.round((targetCalories * macroRatios.fat) / 9)
    };
    
    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      macros,
      weightChange,
      weeklyWeightChange: Math.round(weeklyWeightChange * 100) / 100,
      timePeriod,
      warnings,
      goalType: weightChange > 0 ? 'gain' : weightChange < 0 ? 'loss' : 'maintenance'
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
      title: 'BMR Calculator',
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
      title: 'MacroMap',
      description: 'A roadmap from your current weight to your goal — with macros that make sense',
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
        result = calculateMacroMap(formData);
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
          <h2 className={`flex items-center gap-2 justify-center ${isArabic ? "flex-row font-arabic" : "font-bebas"} text-3xl lg:text-6xl font-bold text-white mb-6`}>
          {isArabic ? "المساعدة" : "Fitness" } <span className=" text-red-500"> {isArabic ? "الادوات " : " Tools"}</span>
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${isArabic ? 'font-arabic text-center' : 'font-poppins'}`}>
            {isArabic 
              ? 'استخدم حاسباتنا الشاملة للياقة البدنية لتتبع تقدمك وتحسين رحلتك الصحية'
              : 'Use our comprehensive fitness calculators to track your progress and optimize your health journey'
            }
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch font-poppins">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => openModal(tool.id)}
              className={`rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl ring-1 animate-gradient-slow group ${
                tool.id === 'macros' 
                  ? 'bg-gradient-to-br from-[#fd5747]/20 via-red-600/10 to-[#fd5747]/20 ring-[#fd5747]/30 border-2 border-[#fd5747]/50' 
                  : 'bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-white/10'
              }`}
              style={{
                backgroundSize: '400% 400%',
                height: '320px',
              }}
            >
              {/* Most Popular Badge */}
              {tool.id === 'macros' && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-[#fd5747] to-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg animate-pulse">
                    OUR BEST TOOL
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 flex flex-col items-center text-center h-full justify-center">
                {/* Icon */}
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                
                {/* Title */}
                <h3 className={`text-xl font-semibold mb-3 ${
                  tool.id === 'macros' ? 'text-white' : 'text-white'
                }`}>
                  {tool.title}
                </h3>
                
                {/* Description */}
                <p className={`text-sm leading-relaxed ${
                  tool.id === 'macros' ? 'text-gray-200' : 'text-gray-300'
                }`}>
                  {tool.description}
                </p>
                
                {/* Click indicator */}
                <div className={`mt-4 text-sm font-medium transition-colors duration-300 ${
                  tool.id === 'macros' 
                    ? 'text-[#fd5747] group-hover:text-white' 
                    : 'text-[#fd5747] group-hover:text-white'
                }`}>
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

            <div>
              <label className="block text-white text-sm font-medium mb-2">Target Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('targetWeight', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Time Period (months)</label>
              <select
                required
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50"
                onChange={(e) => handleInputChange('timePeriod', parseFloat(e.target.value))}
              >
                <option value="">Select time period</option>
                <option value="1">1 month</option>
                <option value="2">2 months</option>
                <option value="3">3 months</option>
                <option value="4">4 months</option>
                <option value="6">6 months</option>
                <option value="9">9 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#fd5747] to-red-600 text-white py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Calculate MacroMap
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

    const DietPlanPromo = () => (
      <div className="mt-6 p-6 bg-gradient-to-br from-[#fd5747]/20 to-red-600/20 rounded-lg border border-[#fd5747]/30">
        <div className="text-center">
          <h4 className="text-white font-bold text-lg mb-3">🍽️ Get a Customized Diet Plan</h4>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-gray-400 line-through text-lg">300 EGP</span>
            <span className="text-2xl font-bold text-[#fd5747]">149 EGP</span>
          </div>
          <a
            href="https://wa.me/+201234567890?text=I want a customized diet plan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
            </svg>
             WhatsApp
          </a>
        </div>
      </div>
    );

    switch (toolId) {
      case 'calories':
        return (
          <>
            <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="text-white font-semibold mb-2">Your Daily Calorie Needs:</h4>
              <p className="text-2xl font-bold text-green-400">{result} calories/day</p>
            </div>
            <DietPlanPromo />
          </>
        );

      case 'ffmi':
        return (
          <>
            <FFMIThermometer result={result} />
            <DietPlanPromo />
          </>
        );

      case 'macros':
        return (
          <>
            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <h4 className="text-yellow-400 font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Important Warnings
                </h4>
                {result.warnings.map((warning, index) => (
                  <p key={index} className="text-yellow-300 text-sm mb-1">• {warning}</p>
                ))}
              </div>
            )}

            {/* BMR and TDEE Information */}
            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <h4 className="text-blue-400 font-semibold mb-2">Your Metabolic Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300">BMR (Base Metabolic Rate)</p>
                  <p className="text-white font-bold">{result.bmr} calories/day</p>
                </div>
                <div>
                  <p className="text-gray-300">TDEE (Total Daily Energy)</p>
                  <p className="text-white font-bold">{result.tdee} calories/day</p>
                </div>
              </div>
            </div>

            {/* Goal Information */}
            <div className="mt-6 p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
              <h4 className="text-purple-400 font-semibold mb-2">Your Goal Roadmap</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Weight Change:</span>
                  <span className={`font-bold ${result.weightChange > 0 ? 'text-green-400' : result.weightChange < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                    {result.weightChange > 0 ? '+' : ''}{result.weightChange} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Weekly Rate:</span>
                  <span className="text-white font-bold">{result.weeklyWeightChange} kg/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Timeline:</span>
                  <span className="text-white font-bold">{result.timePeriod} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Goal Type:</span>
                  <span className="text-white font-bold capitalize">{result.goalType}</span>
                </div>
              </div>
            </div>

            {/* Daily Targets */}
            <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-500/30">
              <h4 className="text-green-400 font-semibold mb-3">Your Daily Targets</h4>
              
              {/* Calories */}
              <div className="mb-4 text-center">
                <p className="text-gray-300 text-sm">Daily Calories</p>
                <p className="text-3xl font-bold text-green-400">{result.targetCalories}</p>
                <p className="text-gray-400 text-xs">calories per day</p>
              </div>

              {/* Macros */}
              <div className="space-y-3">
                <h5 className="text-white font-medium text-sm">Macronutrient Breakdown:</h5>
                
                {/* Protein */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-300 text-sm">Protein</span>
                  </div>
                  <span className="text-white font-bold">{result.macros.protein}g</span>
                </div>

                {/* Carbs */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-300 text-sm">Carbohydrates</span>
                  </div>
                  <span className="text-white font-bold">{result.macros.carbs}g</span>
                </div>

                {/* Fat */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-gray-300 text-sm">Fat</span>
                  </div>
                  <span className="text-white font-bold">{result.macros.fat}g</span>
                </div>
              </div>

              {/* Macro Percentages */}
              <div className="mt-4 text-xs text-gray-400">
                <p>• Protein: {Math.round((result.macros.protein * 4 / result.targetCalories) * 100)}% of calories</p>
                <p>• Carbs: {Math.round((result.macros.carbs * 4 / result.targetCalories) * 100)}% of calories</p>
                <p>• Fat: {Math.round((result.macros.fat * 9 / result.targetCalories) * 100)}% of calories</p>
              </div>
            </div>
            <DietPlanPromo />
          </>
        );

      case 'onerepmax':
        return (
          <>
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
            <DietPlanPromo />
          </>
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