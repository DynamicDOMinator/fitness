'use client';
import Image from "next/image";
import { useState, useRef } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { CgGym } from "react-icons/cg";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

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

  const handleVideoClick = () => {
    handlePlayClick();
  };

  return (
    <div>
      <div
        className="w-[100vw] h-full bg-gradient-to-r from-red-700 to-gray-700
      opacity-70 absolute rounded-br-[100%] top-0 right-40     "
      ></div>
      <div className="hero relative ">
        <div className="md:pt-50 pt-30 ">
          {/* <div className="absolute top-[-50px] hidden md:block left-0 rounded-full 2xl:w-[700px] 2xl:h-[450px] w-[500px] h-[300px] bg-[#fd5747] opacity-40 blur-[100px] z-[1] pointer-events-none"></div>

        <div className="absolute top-[50px] right-0 2xl:w-[650px] rounded-full 2xl:h-[450px] w-[500px] h-[300px] bg-[#fd5747] opacity-40 blur-[100px] z-[1] pointer-events-none"></div> */}

          <div className="flex items-center justify-center relative z-[10]   ">
            <div className="lg:text-8xl md:text-6xl text-4xl  ">
              <h1 className="text-white  font-bold">
                SCULT{" "}
                <span className="bg-gradient-to-r from-[#fd5747] to-blue-700  bg-clip-text text-transparent">
                  {" "}
                  YOUR{" "}
                </span>{" "}
                BODY,
              </h1>

              <h2 className="text-white  font-bold pt-3">
                ELEVATE{" "}
                <span className="bg-gradient-to-r from-[#fd5747] to-blue-700  bg-clip-text text-transparent">
                  {" "}
                  YOUR{" "}
                </span>{" "}
                SPIRIT
              </h2>
            </div>
          </div>

          <div 
            className="w-1/2 mt-30 mx-auto relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(253,87,71,0.8)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
              src="/vid1.webm"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              controls={isPlaying}
              muted
              playsInline
              style={{
                filter: isPlaying ? 'none' : 'brightness(0.8) contrast(1.1)',
              }}
            />
            
            {/* Subtle overlay when not playing - doesn't cover controls area */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'} pointer-events-none`}></div>
            
            {/* Play button - same as Testimonials */}
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
          </div>
        </div>

        <div className="backdrop-blur-xl bg-black/20  bg-gradient-to-br from-[#fd5747]/10 to-blue-700/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:mt-20  mt-10  p-5 backdrop-blur-2xl">
            <div className="flex items-center gap-5">
              <TiGroup className="text-5xl lg:text-6xl text-[#fd5747]" />

              <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#fd5747] pb-6 md:pb-0 md:pr-7">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  +7 years experience{" "}
                </h2>
                <p className="text-white pt-2  text-sm lg:text-lg">
                  Served people in 6 differenet countries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <CgGym className="text-5xl lg:text-9xl text-[#fd5747]" />

              <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#fd5747] pb-6 md:pb-0 md:pr-7">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  Results-Driven Programs{" "}
                </h2>
                <p className="text-white pt-2  text-sm lg:text-lg">
                  Designed to help you see progress from week one.
                </p>
              </div>
            </div>

            <div>
              <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                Personalized Coaching{" "}
              </h2>
              <p className="text-white pt-2 text-sm lg:text-lg">
                Workouts & nutrition tailored to your lifestyle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
