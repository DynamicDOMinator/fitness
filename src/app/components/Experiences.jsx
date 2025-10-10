"use client";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  const videoRef = useRef(null);

  // Video control functions
  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
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
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayIcon(true);
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

  const style = {
    boxShadow: "inset 0 -800px 200px -200px rgba(0, 0, 0, 0.5)",
    ...(isDesktop && {
      clipPath: "polygon(70% 0, 100% 74%, 33% 100%, 0 100%, 0 0)",
    }),
  };

  return (
    <div className="service md:mt-40 mt-20  lg:overflow-hidden 2xl:overflow-auto">
      <div className="lg:flex block items-center justify-center relative">
        <div className="lg:w-[60%] bg-red-800 md:py-55 py-30" style={style}>
          <h3 className="font-bold text-white md:text-6xl text-4xl text-center md:text-left md:pl-30">
            Our Trainer
          </h3>

          <div className="pt-10 pl-10">
            <h4 className="text-white md:text-3xl text-2xl font-semibold">
              {trainer.name}
            </h4>
            <h5 className="text-red-300 md:text-xl text-lg font-medium mt-2">
              {trainer.specialty}
            </h5>
          </div>

          <p className="pt-10 md:pr-60 pr-10 text-center md:text-left px-10 md:pl-10 text-white md:text-2xl text-lg">
            {trainer.description}
          </p>





   {/* Single Video/Image Element */}
              <div
                className="bg-[#4c4c4c] md:hidden mx-auto mt-10 lg:mr-5 2xl:mr-0 rounded-[70px] lg:h-[800px] lg:w-[600px] md:w-[300px] md:h-[500px] w-[300px] h-[350px] relative overflow-hidden"
                style={{
                  boxShadow: "inset 0 -400px 100px -150px rgba(0, 0, 0, 0.5)",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {!videoError ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-[70px]"
                      src="/vid1.webm"
                      poster="/sport.png"
                      preload="metadata"
                      loading="lazy"
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      onEnded={handleVideoEnded}
                      controls={isPlaying}
                      muted
                      playsInline
                      style={{
                        objectFit: "cover",
                        filter: isPlaying ? 'none' : 'brightness(0.8) contrast(1.1)',
                      }}
                      onError={() => {
                        console.log("Video failed to load, switching to image fallback");
                        setVideoError(true);
                      }}
                      onLoadStart={() => console.log('Experiences video 1 loading started')}
                      onCanPlay={() => console.log('Experiences video 1 can start playing')}
                    />
                    
                    {/* Subtle overlay when not playing */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} pointer-events-none rounded-[70px]`}></div>
                    
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
                            <path d="M8 5v14l11-7z"/>
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


<div className="px-5">


<button className="mt-20 w-full md:w-auto  md:mx-auto flex items-center md:ml-10 text-white bg-gradient-to-r from-red-800 to-red-600 md:text-2xl text-xl p-4 rounded-full shadow-lg hover:scale-110 cursor-pointer transition-all duration-300 gap-2 justify-center">
            More Trainers
            <FaArrowRight className="text-2xl bg-red-800 w-10 h-10 p-2 rounded-full text-white" />
          </button>

</div>
          




          
        </div>

        <div className="lg:w-[40%] mt-30 lg:mt-0">
          <div className="flex items-center justify-center relative">
             {/* Single Video/Image Element */}
              <div
                className="bg-[#4c4c4c] hidden md:block lg:mr-5 2xl:mr-0 rounded-[70px] lg:h-[800px] lg:w-[600px] md:w-[300px] md:h-[500px] w-[300px] h-[350px] relative overflow-hidden"
                style={{
                  boxShadow: "inset 0 -400px 100px -150px rgba(0, 0, 0, 0.5)",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {!videoError ? (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-[70px]"
                      src="/vid1.webm"
                      poster="/sport.png"
                      preload="metadata"
                      loading="lazy"
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      onEnded={handleVideoEnded}
                      controls={isPlaying}
                      muted
                      playsInline
                      style={{
                        objectFit: "cover",
                        filter: isPlaying ? 'none' : 'brightness(0.8) contrast(1.1)',
                      }}
                      onError={() => {
                        console.log("Video failed to load, switching to image fallback");
                        setVideoError(true);
                      }}
                      onLoadStart={() => console.log('Experiences video 2 loading started')}
                      onCanPlay={() => console.log('Experiences video 2 can start playing')}
                    />
                    
                    {/* Subtle overlay when not playing */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} pointer-events-none rounded-[70px]`}></div>
                    
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
                            <path d="M8 5v14l11-7z"/>
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
