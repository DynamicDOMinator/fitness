'use client';
import { useState, useEffect, useRef } from 'react';

export const useVideoOptimization = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Detect mobile device and iOS specifically
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileCheck = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const iOSCheck = /iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsMobile(mobileCheck);
      setIsIOS(iOSCheck);
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

    // iOS-specific optimizations
    if (isIOS) {
      return {
        ...baseProps,
        preload: "metadata", // iOS Safari needs metadata for proper loading
        loading: "lazy",
        "webkit-playsinline": "true", // Additional iOS Safari attribute
        "x-webkit-airplay": "allow", // Allow AirPlay
        disablePictureInPicture: false, // Allow picture-in-picture
        controlsList: "nodownload", // Prevent download on iOS
      };
    }

    if (isMobile || isLowBandwidth) {
      return {
        ...baseProps,
        preload: "none", // Don't preload on other mobile/slow connections
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
    // Allow videos on iOS devices (iPhone, iPad) as they handle video well
    if (isIOS) {
      // Still respect user's data saving preference on iOS
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection && connection.saveData) {
          return false;
        }
      }
      return true;
    }
    
    // More conservative for other mobile devices and slow connections
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
    isIOS,
    isLowBandwidth,
    videoLoaded,
    videoRef,
    getOptimizedVideoProps,
    shouldShowVideo,
  };
};