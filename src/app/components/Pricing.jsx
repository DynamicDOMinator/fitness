"use client";
import { useState } from "react";

// Check and Cross SVG Icons
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Pricing() {
  // State to track selected period for each plan
  const [selectedPeriods, setSelectedPeriods] = useState({});

  // Period options with discounts
  const periodOptions = [
    { value: 1, label: "1 Month", discount: 0 },
    { value: 3, label: "3 Months", discount: 0.1 }, // 10% discount
    { value: 6, label: "6 Months", discount: 0.2 }, // 20% discount
  ];

  // All possible features for comparison
  const allFeatures = [
    "Customized Diet & medical lab Results",
    "Change diet & Exercise plan when needed",
    "30mins onboarding zoom",
    "Whatsapp weekly support",
    "mohamed personal Whatsapp - 24 hours support",
    "Video Exercise form correction",
    "Exercise sheet to track progress",
    "2x 45mins zoom check-in / month",
    "1 live workout session / month",
  ];

  // Function to calculate price based on selected period
  const calculatePrice = (basePrice, planTitle) => {
    const selectedPeriod = selectedPeriods[planTitle] || 1;
    const periodOption = periodOptions.find(
      (option) => option.value === selectedPeriod
    );
    const discountedPrice = basePrice * (1 - periodOption.discount);
    const totalPrice = discountedPrice * selectedPeriod;

    return {
      monthlyPrice: Math.round(discountedPrice),
      totalPrice: Math.round(totalPrice),
      period: selectedPeriod,
      discount: periodOption.discount,
    };
  };

  // Function to handle period selection
  const handlePeriodChange = (planTitle, period) => {
    setSelectedPeriods((prev) => ({
      ...prev,
      [planTitle]: parseInt(period),
    }));
  };

  return (
    <section className="py-16 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center tracking-tight">
          <span className="text-white">Pricing</span>{" "}
          <span className="text-red-500">Plans</span>
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
          {/* Regular - Diet only */}
          <div
            className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
            style={{
              backgroundSize: "400% 400%",
              minHeight: "700px",
            }}
          >
            {/* Card header */}
            <div className="px-6 pt-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Regular - Diet only
                </h3>
              </div>

              {/* Period Selection */}
              <div className="mt-3">
                <select
                  value={selectedPeriods["Regular - Diet only"] || 1}
                  onChange={(e) =>
                    handlePeriodChange("Regular - Diet only", e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                >
                  {periodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white"
                    >
                      {option.label}{" "}
                      {option.discount > 0 &&
                        `(${Math.round(option.discount * 100)}% off)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mt-3">
                <div className="flex items-baseline">
                  <span
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    ${calculatePrice(49, "Regular - Diet only").monthlyPrice}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/month</span>
                </div>
                {calculatePrice(49, "Regular - Diet only").period > 1 && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-300">
                      Total: ${calculatePrice(49, "Regular - Diet only").totalPrice} for {calculatePrice(49, "Regular - Diet only").period}{" "}
                      months
                    </span>
                    {calculatePrice(49, "Regular - Diet only").discount > 0 && (
                      <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        Save {Math.round(calculatePrice(49, "Regular - Diet only").discount * 100)}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="mt-3 text-gray-300 text-sm">
                Result driven and Personalized nutrition plan.
              </p>
            </div>

            {/* Divider accent */}
            <div
              className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Features */}
            <div className="flex-1 flex flex-col justify-between">
              <ul className="px-6 pt-4 space-y-2 text-gray-200 text-sm ">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Customized Diet & medical lab Results
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Change diet & Exercise plan when needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    30mins onboarding zoom
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Whatsapp weekly support
                  </span>
                </li>
            
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    Video Exercise form correction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    Exercise sheet to track progress
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    2x 45mins zoom check-in / month
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    1 live workout session / month
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 flex-shrink-0">
              <button
                className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              >
                Get Started
              </button>
            </div>

            {/* Bottom accent radius strip - now animated */}
            <div
              className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
              style={{ backgroundSize: "300% 300%" }}
            />
          </div>

          {/* Regular - Diet & Exercise */}
          <div
            className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
            style={{
              backgroundSize: "400% 400%",
              minHeight: "700px",
            }}
          >
            {/* Card header */}
            <div className="px-6 pt-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Regular - Diet & Exercise
                </h3>
              </div>

              {/* Period Selection */}
              <div className="mt-3">
                <select
                  value={selectedPeriods["Regular - Diet & Exercise"] || 1}
                  onChange={(e) =>
                    handlePeriodChange("Regular - Diet & Exercise", e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                >
                  {periodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white"
                    >
                      {option.label}{" "}
                      {option.discount > 0 &&
                        `(${Math.round(option.discount * 100)}% off)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mt-3">
                <div className="flex items-baseline">
                  <span
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    ${calculatePrice(69, "Regular - Diet & Exercise").monthlyPrice}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/month</span>
                </div>
                {calculatePrice(69, "Regular - Diet & Exercise").period > 1 && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-300">
                      Total: ${calculatePrice(69, "Regular - Diet & Exercise").totalPrice} for {calculatePrice(69, "Regular - Diet & Exercise").period}{" "}
                      months
                    </span>
                    {calculatePrice(69, "Regular - Diet & Exercise").discount > 0 && (
                      <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        Save {Math.round(calculatePrice(69, "Regular - Diet & Exercise").discount * 100)}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="mt-3 text-gray-300 text-sm">
                Result driven and Personalized nutrition & workout plan.
              </p>
            </div>

            {/* Divider accent */}
            <div
              className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Features */}
            <div className="flex-1 flex flex-col justify-between">
              <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm max-h-96 overflow-y-auto">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Customized Diet & medical lab Results
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Change diet & Exercise plan when needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    30mins onboarding zoom
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Whatsapp weekly support
                  </span>
                </li>
              
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Video Exercise form correction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Exercise sheet to track progress
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    2x 45mins zoom check-in / month
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    1 live workout session / month
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 flex-shrink-0">
              <button
                className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              >
                Get Started
              </button>
            </div>

            {/* Bottom accent radius strip - now animated */}
            <div
              className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
              style={{ backgroundSize: "300% 300%" }}
            />
          </div>

          {/* Advanced coaching */}
          <div
            className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-[#fd5747]/25 via-red-500/20 to-red-600/25 ring-2 ring-gradient-to-r ring-[#fd5747]/60 animate-gradient-x"
            style={{
              backgroundSize: "400% 400%",
              minHeight: "700px",
            }}
          >
            {/* Popular badge */}
            <div className="absolute -top-1  left-1/2 transform -translate-x-1/2 z-10">
              <span
                className="bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white text-xs font-bold px-4 py-1 rounded-full animate-gradient-x shadow-lg"
                style={{ backgroundSize: "200% 200%" }}
              >
                Most Popular
              </span>
            </div>

            {/* Card header */}
            <div className="px-6 pt-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Advanced coaching
                </h3>
              </div>

              {/* Period Selection */}
              <div className="mt-3">
                <select
                  value={selectedPeriods["Advanced coaching"] || 1}
                  onChange={(e) =>
                    handlePeriodChange("Advanced coaching", e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                >
                  {periodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white"
                    >
                      {option.label}{" "}
                      {option.discount > 0 &&
                        `(${Math.round(option.discount * 100)}% off)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mt-3">
                <div className="flex items-baseline">
                  <span
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    ${calculatePrice(129, "Advanced coaching").monthlyPrice}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/month</span>
                </div>
                {calculatePrice(129, "Advanced coaching").period > 1 && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-300">
                      Total: ${calculatePrice(129, "Advanced coaching").totalPrice} for {calculatePrice(129, "Advanced coaching").period}{" "}
                      months
                    </span>
                    {calculatePrice(129, "Advanced coaching").discount > 0 && (
                      <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        Save {Math.round(calculatePrice(129, "Advanced coaching").discount * 100)}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="mt-3 text-gray-300 text-sm">
                Result Driven personalized programs + zoom meeting with mohamed
              </p>
            </div>

            {/* Divider accent */}
            <div
              className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Features */}
            <div className="flex-1 flex flex-col justify-between">
              <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm max-h-96 overflow-y-auto">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Customized Diet & medical lab Results
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Change diet & Exercise plan when needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    30mins onboarding zoom
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Whatsapp weekly support
                  </span>
                </li>
               
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Video Exercise form correction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Exercise sheet to track progress
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                   1x45mins zoom check-in / month
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CrossIcon />
                  </span>
                  <span className="text-gray-500 line-through">
                    1 live workout session / month
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 flex-shrink-0">
              <button
                className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              >
                Get Started
              </button>
            </div>

            {/* Bottom accent radius strip - now animated */}
            <div
              className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
              style={{ backgroundSize: "300% 300%" }}
            />
          </div>

          {/* Elite athlete */}
          <div
            className="rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden relative flex flex-col bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
            style={{
              backgroundSize: "400% 400%",
              minHeight: "700px",
            }}
          >
            {/* Card header */}
            <div className="px-6 pt-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  Elite athlete
                </h3>
              </div>

              {/* Period Selection */}
              <div className="mt-3">
                <select
                  value={selectedPeriods["Elite athlete"] || 1}
                  onChange={(e) =>
                    handlePeriodChange("Elite athlete", e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#fd5747]/50 focus:border-[#fd5747]/50 backdrop-blur-sm"
                >
                  {periodOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-800 text-white"
                    >
                      {option.label}{" "}
                      {option.discount > 0 &&
                        `(${Math.round(option.discount * 100)}% off)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="mt-3">
                <div className="flex items-baseline">
                  <span
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fd5747] to-red-600 animate-gradient-x"
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    ${calculatePrice(199, "Elite athlete").monthlyPrice}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">/month</span>
                </div>
                {calculatePrice(199, "Elite athlete").period > 1 && (
                  <div className="mt-1">
                    <span className="text-sm text-gray-300">
                      Total: ${calculatePrice(199, "Elite athlete").totalPrice} for {calculatePrice(199, "Elite athlete").period}{" "}
                      months
                    </span>
                    {calculatePrice(199, "Elite athlete").discount > 0 && (
                      <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                        Save {Math.round(calculatePrice(199, "Elite athlete").discount * 100)}%
                      </span>
                    )}
                  </div>
                )}
              </div>

              <p className="mt-3 text-gray-300 text-sm">
                Personalized programs + Work Directly with mohamed on your mindset.
              </p>
            </div>

            {/* Divider accent */}
            <div
              className="mt-6 h-px mx-6 bg-gradient-to-r from-[#fd5747]/50 via-white/10 to-red-600/50 animate-gradient-x"
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Features */}
            <div className="flex-1 flex flex-col justify-between">
              <ul className="px-6 py-4 space-y-2 text-gray-200 text-sm max-h-96 overflow-y-auto">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Customized Diet & medical lab Results
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Change diet & Exercise plan when needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    30mins onboarding zoom
                  </span>
                </li>
               
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    mohamed personal Whatsapp - 24 hours support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Video Exercise form correction
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    Exercise sheet to track progress
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    2x 45mins zoom check-in / month
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-gray-200">
                    1 live workout session / month
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 flex-shrink-0">
              <button
                className="w-full rounded-2xl bg-gradient-to-r from-[#fd5747] via-red-500 to-red-700 text-white font-semibold py-2.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 animate-gradient-x"
                style={{ backgroundSize: "300% 300%" }}
              >
                Get Started
              </button>
            </div>

            {/* Bottom accent radius strip - now animated */}
            <div
              className="h-1 bg-gradient-to-r from-[#fd5747] via-white/10 to-red-600 animate-gradient-x"
              style={{ backgroundSize: "300% 300%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
