"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdFemale } from "react-icons/io";

export default function Service() {
  // Single trainer data
  const trainer = {
    id: 1,
    name: "John Smith",
    specialty: "Strength Training",
    description:
      "Professional strength trainer with 8+ years of experience. Specializes in powerlifting, bodybuilding, and functional fitness. Helped over 200 clients achieve their fitness goals through personalized training programs.",
  };

  const [isDesktop, setIsDesktop] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const sectionRef = useRef(null);

  // Video control functions
  const handlePlayClick = () => {
    const currentVideo = isDesktop ? videoRef2.current : videoRef.current;
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        // Force unmute and set volume before playing
        currentVideo.muted = false;
        currentVideo.volume = 1.0;
        setIsAutoPlaying(false);
        
        // Wait a moment for the properties to be set
        setTimeout(() => {
          console.log("Manual play - muted:", currentVideo.muted, "volume:", currentVideo.volume);
          currentVideo.play().then(() => {
            console.log("Video playing with sound - final check - muted:", currentVideo.muted, "volume:", currentVideo.volume);
          }).catch(error => {
            console.log("Manual play failed:", error);
          });
        }, 100);
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setShowPlayIcon(false);
    // Ensure video is unmuted when playing manually
    const currentVideo = isDesktop ? videoRef2.current : videoRef.current;
    if (currentVideo && !isAutoPlaying) {
      currentVideo.muted = false;
      currentVideo.volume = 1.0;
      console.log("Video started playing - ensuring unmuted:", currentVideo.muted, "volume:", currentVideo.volume);
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
    setIsAutoPlaying(false);
  };

  // Auto-play video when section comes into view
  const handleAutoPlay = async () => {
    if (!hasAutoPlayed && !videoError) {
      const currentVideo = isDesktop ? videoRef2.current : videoRef.current;
      if (currentVideo) {
        try {
          // Ensure video is muted for auto-play to work on all devices
          currentVideo.muted = true;
          currentVideo.playsInline = true;
          setIsAutoPlaying(true);
          
          // Wait a bit for the video to be ready
          await new Promise(resolve => setTimeout(resolve, 100));
          
          await currentVideo.play();
          setHasAutoPlayed(true);
          console.log("Auto-play successful");
        } catch (error) {
          console.log("Auto-play failed:", error);
          setIsAutoPlaying(false);
          // Auto-play failed, keep the play button visible
        }
      }
    }
  };

  // Safely check window size on client side only
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    // Check initial screen size
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize video properties on mount
  useEffect(() => {
    const initializeVideos = () => {
      const mobileVideo = videoRef.current;
      const desktopVideo = videoRef2.current;
      
      // Initialize mobile video
      if (mobileVideo) {
        mobileVideo.volume = 1.0;
        mobileVideo.muted = true; // Start muted for auto-play compliance
        mobileVideo.playsInline = true;
        console.log("Mobile video initialized - volume:", mobileVideo.volume, "muted:", mobileVideo.muted);
      }
      
      // Initialize desktop video
      if (desktopVideo) {
        desktopVideo.volume = 1.0;
        desktopVideo.muted = true; // Start muted for auto-play compliance
        desktopVideo.playsInline = true;
        console.log("Desktop video initialized - volume:", desktopVideo.volume, "muted:", desktopVideo.muted);
      }
    };

    // Initialize immediately if videos are ready
    initializeVideos();
    
    // Also initialize after a short delay to ensure videos are fully loaded
    const timer = setTimeout(initializeVideos, 100);
    
    return () => clearTimeout(timer);
  }, [isDesktop]);

  // Function to pause video when leaving section
  const handleVideoPauseOnLeave = () => {
    const currentVideo = isDesktop ? videoRef2.current : videoRef.current;
    if (currentVideo && !currentVideo.paused) {
      currentVideo.pause();
      console.log("Video paused - section left viewport");
    }
  };

  // Intersection Observer for auto-play and pause on leave
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            // Auto-play when 30% of the section is visible
            setTimeout(() => handleAutoPlay(), 500); // Small delay to ensure video is loaded
          } else if (!entry.isIntersecting) {
            // Pause video when section leaves viewport
            handleVideoPauseOnLeave();
          }
        });
      },
      {
        threshold: [0, 0.3], // Trigger at 0% (leaving) and 30% (entering)
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before the section is fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAutoPlayed, videoError, isDesktop]);

  return (
    <div ref={sectionRef} className="  mt-20  md:mx-10 rounded-4xl px-10 lg:overflow-hidden">
      <div className="lg:flex block items-center justify-center relative">
        <div className="lg:w-[60%]  md:py-55 ">
          <h3 className="font-semibold text-red-600 md:text-3xl text-2xl  text-start ">
            ABOUT US
          </h3>

          <div className="pt-1 relative">
            <h4 className="text-white md:text-6xl text-2xl font-semibold">
              WHO ARE <span className="text-red-600">WE</span>
            </h4>

            <div className="w-[30%] h-[2px] bg-red-600 mt-2"></div>
          </div>

          <p className="pt-10 md:pr-60 pr-10 text-left text-white md:text-2xl text-lg">
            A Team with combined experience of 20+ years in Sports,Nutrition and
            lab-medical field. Our goal is to guide you to reach Your best body
            shape, instill healthy habits and mindset to maintain a healthier
            lifestyle.
          </p>
<p className=" flex items-center gap-2 pt-10  text-center md:text-left  text-gray-300 md:text-xl text-sm">

<IoMdFemale className="text-red-600 md:text-2xl " />


  There are female coaches in the team
</p>
 <div className="w-[55%]  h-[2px] bg-red-600 mt-2  "></div>
          
          {/* Single Video/Image Element - Mobile */}
          <div
            className="bg-[#4c4c4c] md:hidden mx-auto mt-10 lg:mr-5 2xl:mr-0 rounded-[70px] lg:h-[800px] lg:w-[600px] md:w-[300px] md:h-[500px] w-full h-[400px] relative"
            style={{
              boxShadow: "inset 0 -200px 80px -100px rgba(0, 0, 0, 0.3)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!videoError ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full rounded-[70px] object-cover "
                  src="/vid1.webm"
                  poster="/sport.png"
                  preload="metadata"
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onEnded={handleVideoEnded}
                  controls={isPlaying}
                  muted
                  playsInline
                  webkit-playsinline="true"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                    filter: isPlaying
                      ? "none"
                      : "brightness(0.9) contrast(1.05)",
                  }}
                  onError={(e) => {
                    console.log("Video failed to load:", e);
                    setVideoError(true);
                  }}
                  onLoadStart={() =>
                    console.log("Experiences video 1 loading started")
                  }
                  onCanPlay={() =>
                    console.log("Experiences video 1 can start playing")
                  }
                />

                {/* Subtle overlay when not playing */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 transition-opacity duration-500 ${
                    isPlaying ? "opacity-0" : "opacity-100"
                  } pointer-events-none rounded-[70px]`}
                ></div>

                {/* Play button - same as HeroSection */}
                {showPlayIcon && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 pointer-events-auto"
                    onClick={handlePlayClick}
                  >
                    <div className="bg-white bg-opacity-95 rounded-full p-2 md:p-3 lg:p-4 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-2xl border-2 md:border-3 lg:border-4 border-red-700">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-red-700 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Image
                src="/sport.png"
                alt="Fitness Training"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-[70px]"
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          <div className="px-5 ">
            <button className="mt-20 w-full md:w-auto  md:mr-auto flex items-center justify-center
              text-white bg-gradient-to-r from-red-600 to-red-800 md:text-2xl text-xl p-4 rounded-full shadow-lg hover:scale-110 cursor-pointer transition-all duration-300 gap-2 ">
              More Trainers
              <FaArrowRight className="text-2xl bg-red-600 w-10 h-10 p-2 rounded-full text-white" />
            </button>
          </div>
        </div>

        <div className=" lg:pr-10 mt-30 lg:mt-20 lg:pb-20">
          <div className="flex items-center justify-center relative">
            {/* Single Video/Image Element - Desktop */}
            <div
              className="hidden md:block lg:mr-5  2xl:mr-0 rounded-[70px] lg:h-[950px] lg:w-[600px] md:w-full md:h-[600px] w-full h-[400px] relative"
              style={{
                boxShadow:
                  "inset 0 -200px 80px -100px rgba(0, 0, 0, 0.3), 40px 40px 40px rgba(220, 38, 38, 0.6)",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {!videoError ? (
                <>
                  <video
                    ref={videoRef2}
                    className="w-full h-full rounded-[70px] object-cover "
                    src="/vid1.webm"
                    poster="/sport.png"
                    preload="metadata"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                    onEnded={handleVideoEnded}
                    controls={isPlaying}
                    muted
                    playsInline
                    webkit-playsinline="true"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "100%",
                      height: "100%",
                      filter: isPlaying
                        ? "none"
                        : "brightness(0.9) contrast(1.05)",
                    }}
                    onError={(e) => {
                      console.log("Video failed to load:", e);
                      setVideoError(true);
                    }}
                    onLoadStart={() =>
                      console.log("Experiences video 2 loading started")
                    }
                    onCanPlay={() =>
                      console.log("Experiences video 2 can start playing")
                    }
                  />

                  {/* Subtle overlay when not playing */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 transition-opacity duration-500 ${
                      isPlaying ? "opacity-0" : "opacity-100"
                    } pointer-events-none rounded-[70px]`}
                  ></div>

                  {/* Play button - same as HeroSection */}
                  {showPlayIcon && (
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-300 pointer-events-auto"
                      onClick={handlePlayClick}
                    >
                      <div className="bg-white bg-opacity-95 rounded-full p-2 md:p-3 lg:p-4 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-2xl border-2 md:border-3 lg:border-4 border-red-700">
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-red-700 ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Image
                  src="/sport.png"
                  alt="Fitness Training"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-[70px]"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
