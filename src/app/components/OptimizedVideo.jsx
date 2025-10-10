'use client';
import { useState, useRef, useEffect } from 'react';
import { useVideoOptimization } from '../hooks/useVideoOptimization';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function OptimizedVideo({ 
  className, 
  onPlay, 
  onPause, 
  onEnded, 
  onClick,
  showControls = false,
  autoPlay = false,
  style = {},
  ...props 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const videoRef = useRef(null);
  const { isMobile, isIOS, shouldShowVideo, getOptimizedVideoProps } = useVideoOptimization();
  const { elementRef, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowPlayIcon(false);
    if (onPlay) onPlay();
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
    if (onPause) onPause();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
    if (onEnded) onEnded();
  };

  const handleVideoError = (e) => {
    console.error('Video failed to load:', e);
    setHasError(true);
  };

  const handlePlayClick = async () => {
    if (videoRef.current) {
      setUserInteracted(true);
      
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        try {
          // For iOS, we need to ensure the video is properly loaded before playing
          if (isIOS) {
            // Load the video if not already loaded
            if (videoRef.current.readyState < 2) {
              videoRef.current.load();
              await new Promise((resolve) => {
                const onCanPlay = () => {
                  videoRef.current.removeEventListener('canplay', onCanPlay);
                  resolve();
                };
                videoRef.current.addEventListener('canplay', onCanPlay);
              });
            }
          }
          
          videoRef.current.controls = true;
          await videoRef.current.play();
        } catch (error) {
          console.error('Error playing video:', error);
          setHasError(true);
        }
      }
    }
  };

  const handleVideoClick = () => {
    if (onClick) {
      onClick();
    } else {
      handlePlayClick();
    }
  };

  // Don't show video on very slow mobile connections or if error occurred
  if (!shouldShowVideo() || hasError) {
    return (
      <div className={`${className} relative`} style={style}>
        <img 
          src="/sport.png"
          alt="Fitness training"
          className={className}
          style={style}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
            {hasError ? 'Video unavailable' : 'Image mode for better performance'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={elementRef} className="relative">
      {hasIntersected ? (
        <video
          ref={videoRef}
          className={className}
          src="/vid1.webm"
          {...getOptimizedVideoProps()}
          controls={showControls || (isPlaying && userInteracted)}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          onClick={handleVideoClick}
          onLoadedMetadata={() => {
            // iOS Safari specific: ensure video dimensions are set
            if (isIOS && videoRef.current) {
              videoRef.current.style.width = '100%';
              videoRef.current.style.height = 'auto';
            }
          }}
          onTouchStart={(e) => {
            // iOS Safari: prevent default touch behavior that might interfere
            if (isIOS) {
              e.stopPropagation();
            }
          }}
          style={{
            ...style,
            filter: isPlaying ? 'none' : 'brightness(0.8) contrast(1.1)',
            // iOS Safari specific styles
            ...(isIOS && {
              WebkitTransform: 'translateZ(0)', // Hardware acceleration
              transform: 'translateZ(0)',
            }),
          }}
          {...props}
        />
      ) : (
        <div 
          className={className}
          style={{
            ...style,
            backgroundImage: 'url(/sport.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
              Loading...
            </div>
          </div>
        </div>
      )}
      
      {/* Overlay when not playing */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} pointer-events-none`}></div>
      
      {/* Play button */}
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

      {/* Mobile performance indicator */}
      {isMobile && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          {isIOS ? 'iOS Optimized' : 'Mobile Optimized'}
        </div>
      )}
    </div>
  );
}