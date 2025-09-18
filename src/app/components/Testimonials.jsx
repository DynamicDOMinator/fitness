'use client';
import { useState, useRef } from 'react';

export default function Testimonials() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        // If playing, pause the video
        videoRef.current.pause();
        setIsPlaying(false);
        setShowPlayIcon(true);
      } else {
        // If paused, play the video
        videoRef.current.controls = true;
        videoRef.current.play();
        setIsPlaying(true);
        setShowPlayIcon(false);
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowPlayIcon(false);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
    // Keep controls visible when paused
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
    // Keep controls visible when ended
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  const handleVideoClick = () => {
    // Allow clicking on video to pause/play, but only if controls are not visible
    if (!videoRef.current?.controls) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-4 md:p-8 lg:p-12 md:mt-96 mt-80 lg:mt-0">
      <div className="relative max-w-5xl w-full">
        {/* Outer decorative frame */}
        <div className="relative p-6 md:p-8 lg:p-10">
          {/* Corner frame elements */}
          <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-600 to-transparent"></div>
            <div className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10 border-l-2 border-t-2 border-red-500/60 rounded-tl-lg"></div>
          </div>
          
          <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-600 to-transparent"></div>
            <div className="absolute top-2 right-2 w-8 h-8 md:w-10 md:h-10 border-r-2 border-t-2 border-red-500/60 rounded-tr-lg"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-red-600 to-transparent"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 md:w-10 md:h-10 border-l-2 border-b-2 border-red-500/60 rounded-bl-lg"></div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-red-600 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-red-600 to-transparent"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 border-r-2 border-b-2 border-red-500/60 rounded-br-lg"></div>
          </div>

          {/* Inner frame with metallic effect */}
          <div className="relative">
            {/* Metallic border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-2xl blur-sm opacity-75"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 via-white to-gray-400 rounded-2xl"></div>
            
            {/* Main video container */}
            <div 
              className="relative bg-black rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.01]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Video element */}
              <video 
                ref={videoRef}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover transition-all duration-700"
                src="/vid1.webm"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
                onClick={handleVideoClick}
                style={{
                  filter: isPlaying ? 'none' : 'brightness(0.8) contrast(1.1)',
                }}
              />
              
              {/* Subtle overlay when not playing */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} pointer-events-none`}></div>
              
              {/* Play button - only show when video hasn't started or when paused without controls */}
              {showPlayIcon && !videoRef.current?.controls && (
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
              
              {/* Elegant corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-white/40 rounded-tl-lg pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-white/40 rounded-tr-lg pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-white/40 rounded-bl-lg pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/40 rounded-br-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Decorative side elements */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
            <div className="w-1 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
            <div className="w-1 h-20 bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
      </div>
    </div>
  );
}