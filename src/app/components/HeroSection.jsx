"use client";
import Image from "next/image";
import { useState, useRef } from "react";
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
      <div className="hero relative ">
        <div className="md:pt-50 pt-30 ">
          <div className="flex items-center justify-center relative z-[10]   ">
            <div className="lg:text-8xl md:text-6xl text-4xl text-center">
              <h1 className="text-white font-bold p-2 md:p-0">
                Real fitness for{" "}
                <span className="bg-gradient-to-r from-[#fd5747] to-blue-700 bg-clip-text text-transparent">
                  real life
                </span>
              </h1>

              <p className="text-white p-3 md:p-0 text-lg md:text-xl lg:text-2xl font-normal mt-6 max-w-4xl mx-auto leading-relaxed">
                Fitness should improve your quality of life. Our Exercise
                Programs are tailored to fit your current lifestyle and help you
                make better choices regarding your health no{" "}
                <span className="text-red-500">crash diets</span>, no
                unrealistic 2 hours workouts
              </p>
            </div>
          </div>

          <div
            className="md:w-1/3 mx-10 md:mt-30 mt-10 md:mx-auto relative rounded-3xl  shadow-[0_0_50px_rgba(253,87,71,0.8)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <video
              ref={videoRef}
              className="w-full  h-[350px] sm:h-[400px] md:h-[500px] lg:h-[400px] xl:h-[500px] object-cover"
              src="/vid1.webm"
              poster="/sport.png"
              preload="metadata"
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoEnded}
              onLoadStart={() => console.log("Hero video loading started")}
              onCanPlay={() => console.log("Hero video can start playing")}
              onError={(e) => console.error("Hero video error:", e)}
              controls={isPlaying}
              muted
              playsInline
              loading="lazy"
              style={{
                filter: isPlaying ? "none" : "brightness(0.8) contrast(1.1)",
              }}
            />

            {/* Subtle overlay when not playing - doesn't cover controls area */}
            <div
              className={`absolute rounded-3xl inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-opacity duration-500 ${
                isPlaying ? "opacity-0" : "opacity-100"
              } pointer-events-none`}
            ></div>

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
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center pt-10 gap-10">
          <button className="bg-[#fd5747] text-white text-xl px-6 py-2 rounded-full font-bold hover:bg-[#e64a3a] transition-colors duration-300">
            Get Fit
          </button>

          <button className=" text-[#fd5747] px-6 py-2 rounded-full font-bold hover:bg-[#f5f5f5] transition-colors duration-300">
            Free Services
          </button>
        </div>
        <div
          className="backdrop-blur-xl bg-gradient-to-br mx-10 from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow rounded-4xl"
          style={{ backgroundSize: "400% 400%" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:mt-20  mt-10  p-10 ">
            <div className="flex flex-col items-start gap-5 mr-auto md:m-auto">
              <TiGroup className="text-5xl lg:text-6xl text-[#fd5747]" />

              <div className=" pb-6 md:pb-0">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  +7 years experience{" "}
                </h2>
                <p className="text-white pt-2  text-sm lg:text-lg">
                  Served people in 6 differenet countries
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 mr-auto md:m-auto">
              <CgGym className="text-5xl lg:text-6xl text-[#fd5747]" />

              <div className=" pb-6 md:pb-0">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  Results-Driven Programs{" "}
                </h2>
                <p className="text-white pt-2  text-sm lg:text-lg">
                  Designed to help you see progress from week one.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 mr-auto md:m-auto">
              <TiGroup className="text-5xl lg:text-6xl text-[#fd5747]" />

              <div className=" pb-6 md:pb-0">
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
    </div>
  );
}
