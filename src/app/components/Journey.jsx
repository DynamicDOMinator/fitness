"use client";
import { useState, useEffect, useRef } from "react";

export default function Journey() {
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const stepRefs = useRef([]);

  const journeySteps = [
    {
      id: 1,
      title: "Sign up",
      description:
        "After your subscription is processed.Within 24 hours our team will contact you to start.",
      side: "left",
    },
    {
      id: 2,
      title: "OnBoarding",
      description:
        "A 30 minute zoom meeting & questions form will help us personalize coaching plan for you.",
      side: "right",
    },
    {
      id: 3,
      title: "Begin journey",
      description:
        "Within 24 hours your personalized plan will be sent to you..",
      side: "left",
    },
    {
      id: 4,
      title: "Journey Details",
      description:
        "Our team will reply to any questions you have through whatsapp and make sure you are following the diet & workout plans.",
      side: "right",
    },
    {
      id: 5,
      title: "Achieve your best look",
      description:
        "As you stick to your customized plans you will notice improvement not only if your physical appearance but also your mentality and lifestyle.",
      side: "left",
    },
  ];

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate circles one by one with delay
              setTimeout(() => {
                setVisibleSteps((prev) => new Set([...prev, index]));
              }, index * 300);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-2 sm:mb-4">
            What To <span className="text-white"> Expect </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white max-w-2xl mx-auto px-4">
            Transform your life step by step. Every milestone brings you closer
            to your best self.
          </p>
        </div>

        <div className="relative">
          {/* Animated Timeline Line - Hidden on mobile, visible on larger screens */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-400 to-red-600 transition-all duration-1000 ease-out origin-top"
            style={{
              top: "48px",
              height:
                visibleSteps.size > 0
                  ? `${Math.max(...Array.from(visibleSteps)) * 250 + 102}px`
                  : "0px",
              clipPath:
                visibleSteps.size > 0 ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            }}
          />

          {/* Mobile Timeline Line - Vertical line on the left */}
          <div
            className="md:hidden absolute left-6 w-1 bg-gradient-to-b from-red-400 to-red-600 transition-all duration-1000 ease-out origin-top"
            style={{
              top: "24px",
              height:
                visibleSteps.size > 0
                  ? `${Math.max(...Array.from(visibleSteps)) * 200 + 120}px`
                  : "0px",
              clipPath:
                visibleSteps.size > 0 ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            }}
          />

          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`relative mb-8 sm:mb-12 lg:mb-16 
                ${/* Mobile: Always left-aligned */ ""}
                md:flex md:items-center 
                ${
                  /* Desktop: Alternating sides */ step.side === "left"
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
            >
              {/* Content Card */}
              <div
                className={`
                  ${
                    /* Mobile: Full width with left padding for timeline */ "pl-16 md:pl-0"
                  }
                  ${
                    /* Desktop: Half width with appropriate padding */ "md:w-5/12"
                  } 
                  ${step.side === "left" ? "md:pr-8" : "md:pl-8"}
                `}
              >
                <div
                  className={`bg-black/10 rounded-xl shadow-2xl p-4 sm:p-6 transform transition-all duration-700 ${
                    visibleSteps.has(index)
                      ? "translate-x-0 opacity-100"
                      : step.side === "left"
                      ? "md:-translate-x-16 -translate-x-8 opacity-0"
                      : "md:translate-x-16 -translate-x-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 300}ms`,
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 drop-shadow-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed drop-shadow-md">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Timeline Circle */}
              <div
                className={`absolute z-10 
                ${
                  /* Mobile: Left side positioning */ "left-3 top-4 md:left-1/2 md:top-auto md:transform md:-translate-x-1/2"
                }
              `}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full  transition-all duration-700 flex items-center justify-center ${
                    visibleSteps.has(index)
                      ? "bg-gradient-to-r from-red-500 to-red-600 scale-110 md:scale-125 "
                      : "bg-gray-400 scale-100"
                  }`}
                  style={{
                    transitionDelay: `${index * 300 + 150}ms`,
                  }}
                >
                  <span className="text-white font-bold text-xs sm:text-sm drop-shadow-lg">
                    {step.id}
                  </span>
                </div>
              </div>

              {/* Empty space for the other side - Only on desktop */}
              <div className="hidden md:block md:w-5/12"></div>
            </div>
          ))}

          {/* Final Achievement Badge */}
          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <div
              className={`inline-block bg-gradient-to-r from-red-600 to-red-900 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full shadow-lg transform transition-all duration-700 cursor-pointer hover:scale-105 ${
                visibleSteps.has(journeySteps.length - 1)
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0"
              }`}
              style={{
                transitionDelay: `${journeySteps.length * 300 + 500}ms`,
              }}
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              <span className="text-sm sm:text-base lg:text-lg font-semibold drop-shadow-lg">
                🎉 START YOUR JOURNEY 🎉
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
