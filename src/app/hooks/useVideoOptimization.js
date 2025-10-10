'use client';
import { useState, useEffect, useRef } from 'react';

export const useVideoOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(mobileCheck);
    };

    // Detect slow connection
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
          const slowConnection = connection.effectiveType === 'slow-2g' || 
                                connection.effectiveType === '2g' || 
                                connection.saveData === true;
          setIsLowBandwidth(slowConnection);
        }
      }
    };

    checkMobile();
    checkConnection();

    // Listen for connection changes
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        connection.addEventListener('change', checkConnection);
        return () => connection.removeEventListener('change', checkConnection);
      }
    }
  }, []);

  const getOptimizedVideoProps = () => {
    const baseProps = {
      muted: true,
      playsInline: true,
      poster: "/sport.png",
      onLoadStart: () => console.log('Video loading started'),
      onCanPlay: () => {
        console.log('Video can start playing');
        setVideoLoaded(true);
      },
      onError: (e) => console.error('Video error:', e),
    };

    if (isMobile || isLowBandwidth) {
      return {
        ...baseProps,
        preload: "none", // Don't preload on mobile/slow connections
        loading: "lazy",
      };
    }

    return {
      ...baseProps,
      preload: "metadata", // Preload metadata on desktop/fast connections
      loading: "lazy",
    };
  };

  const shouldShowVideo = () => {
    // More aggressive fallback for large video files
    // Don't show video on mobile OR slow connections
    if (isMobile || isLowBandwidth) {
      return false;
    }
    
    // Check if user prefers reduced data usage
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && connection.saveData) {
        return false;
      }
    }
    
    return true;
  };

  return {
    isMobile,
    isLowBandwidth,
    videoLoaded,
    videoRef,
    getOptimizedVideoProps,
    shouldShowVideo,
  };
};