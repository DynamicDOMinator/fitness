'use client';
import { useState, useRef } from 'react';

export default function Testimonials() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const videoRef = useRef(null);

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
          <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-red-700 font-bold leading-tight">
            What are you waiting for?
          </h3>

          <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold pt-8 md:pt-12 lg:pt-20 leading-tight">
            Can't keep the weight off?
          </h4>
          <p className="text-white pt-4 md:pt-6 lg:pt-10 text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
            Both Diet and workout plans are tailored to your individual needs;
            ensuring you always progress, no crash-diets , no unrealistic 2
            hours workouts Whether you're exercising from home, outdoors or the
            gym.{" "}
          </p>

          <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold pt-8 md:pt-12 lg:pt-20 leading-tight">
            Got a Busy Life?
          </h4>
          <p className="text-white pt-4 md:pt-6 lg:pt-10 text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
            Leading a healthy lifestyle through nutrition & Exercise should not
            stop you from enjoying your life, our holistic approach helps you
            maintain healthy habits for long term results.
          </p>
          <div className="pt-8 md:pt-12 lg:pt-20">
            <button className="bg-red-700 hidden md:block text-white text-lg md:text-xl lg:text-2xl font-bold p-3 md:p-4 lg:p-5 rounded-full hover:bg-red-800 transition-colors duration-300 w-full sm:w-auto">
              JOIN NOW
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2  relative order-1 lg:order-2">
          <video 
            ref={videoRef}
            className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] w-full object-cover rounded-2xl md:rounded-3xl lg:rounded-4xl" 
            src="/vid1.webm"
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnded}
          />
            <div className="pt-8 md:pt-12 lg:pt-20">
            <button className="bg-red-700 block md:hidden text-white text-lg md:text-xl lg:text-2xl font-bold p-3 md:p-4 lg:p-5 rounded-full hover:bg-red-800 transition-colors duration-300 w-full sm:w-auto">
              JOIN NOW
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
