'use client';
import { useState, useRef } from 'react';
import { useVideoOptimization } from '../hooks/useVideoOptimization';
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
  const { isArabic } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const videoRef = useRef(null);
  const { isMobile, shouldShowVideo, getOptimizedVideoProps } = useVideoOptimization();

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.controls = true; // Add controls when video starts
      videoRef.current.play();
      setIsPlaying(true);
      setShowPlayIcon(false);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowPlayIcon(false);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
  };

  return (
    <div className="mt-10  lg:mt-30 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row items-start justify-center gap-6 md:gap-8 lg:gap-10">
        
        <div className="w-full lg:w-1/2  order-2 lg:order-1">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
            {isArabic ? 'ماذا تنتظر؟' : 'What are you waiting for?'}
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-red-500 mb-4 text-center">
            {isArabic ? 'لا تستطيع الحفاظ على الوزن؟' : "Can't keep the weight off?"}
          </h3>
          <p className="text-lg text-gray-300 mb-8 text-center max-w-3xl mx-auto">
            {isArabic 
              ? 'هل تشعر بالإحباط من الأنظمة الغذائية القاسية والتمارين غير الواقعية؟ نحن نقدم نهجاً مختلفاً - برامج مستدامة تناسب حياتك.'
              : 'Tired of crash diets and unrealistic workouts? We offer a different approach - sustainable programs that fit your life.'
            }
          </p>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-red-500 mb-4 text-center">
            {isArabic ? 'حياة مشغولة؟' : 'Got a Busy Life?'}
          </h3>
          <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            {isArabic 
              ? 'لا وقت للصالة الرياضية؟ لا مشكلة. برامجنا مصممة للأشخاص المشغولين الذين يريدون نتائج حقيقية دون التضحية بحياتهم.'
              : "No time for the gym? No problem. Our programs are designed for busy people who want real results without sacrificing their life."
            }
          </p>
          <div className="pt-8 md:pt-12 lg:pt-20">
            <button className=" bg-gradient-to-r from-red-800 to-red-600 shadow-lg hidden md:block text-white text-lg md:text-xl  font-semibold p-3 md:p-4 lg:p-5 rounded-full hover:bg-red-800 transition-colors duration-300 w-full sm:w-auto">
              {isArabic ? 'انضم الآن' : 'JOIN NOW'}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2  relative order-1 lg:order-2">
          {shouldShowVideo() ? (
            <video 
              ref={videoRef}
              className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] w-full object-cover rounded-2xl md:rounded-3xl lg:rounded-4xl" 
              src="/vid1.webm"
              {...getOptimizedVideoProps()}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
            />
          ) : (
            <img 
              src="/sport.png"
              alt="Fitness training"
              className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] w-full object-cover rounded-2xl md:rounded-3xl lg:rounded-4xl"
            />
          )}
            <div className="pt-8 md:pt-12 lg:pt-20">
            <button className="bg-red-700 block md:hidden text-white text-lg md:text-xl lg:text-2xl font-bold p-3 md:p-4 lg:p-5 rounded-full hover:bg-red-800 transition-colors duration-300 w-full sm:w-auto">
              {isArabic ? 'انضم الآن' : 'JOIN NOW'}
            </button>
          </div>
          {showPlayIcon && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300"
              onClick={handlePlayClick}
            >
              <div className="bg-white bg-opacity-95 rounded-full p-3 md:p-4 lg:p-6 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-2xl border-2 md:border-3 lg:border-4 border-red-700">
                <svg 
                  className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-red-700 ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>

      </div>
      
    </div>
  );
}
