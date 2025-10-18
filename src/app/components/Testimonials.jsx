"use client";
import { useState, useRef } from "react";
import { VscPreview } from "react-icons/vsc";
import Image from "next/image";
import { useLanguage } from '../contexts/LanguageContext';

export default function Testimonials() {
  const { isArabic } = useLanguage();
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [showPlayIcon1, setShowPlayIcon1] = useState(true);
  const [isHovered1, setIsHovered1] = useState(false);
  const videoRef1 = useRef(null);

  const [isPlaying2, setIsPlaying2] = useState(false);
  const [showPlayIcon2, setShowPlayIcon2] = useState(true);
  const [isHovered2, setIsHovered2] = useState(false);
  const videoRef2 = useRef(null);

  const handlePlayClick = (videoNumber) => {
    const videoRef = videoNumber === 1 ? videoRef1 : videoRef2;
    const isPlaying = videoNumber === 1 ? isPlaying1 : isPlaying2;
    const setIsPlaying = videoNumber === 1 ? setIsPlaying1 : setIsPlaying2;
    const setShowPlayIcon =
      videoNumber === 1 ? setShowPlayIcon1 : setShowPlayIcon2;

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

  const handleVideoPlay = (videoNumber) => {
    const setIsPlaying = videoNumber === 1 ? setIsPlaying1 : setIsPlaying2;
    const setShowPlayIcon =
      videoNumber === 1 ? setShowPlayIcon1 : setShowPlayIcon2;
    setIsPlaying(true);
    setShowPlayIcon(false);
  };

  const handleVideoPause = (videoNumber) => {
    const videoRef = videoNumber === 1 ? videoRef1 : videoRef2;
    const setIsPlaying = videoNumber === 1 ? setIsPlaying1 : setIsPlaying2;
    const setShowPlayIcon =
      videoNumber === 1 ? setShowPlayIcon1 : setShowPlayIcon2;

    setIsPlaying(false);
    setShowPlayIcon(true);
    // Keep controls visible when paused
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  const handleVideoEnded = (videoNumber) => {
    const videoRef = videoNumber === 1 ? videoRef1 : videoRef2;
    const setIsPlaying = videoNumber === 1 ? setIsPlaying1 : setIsPlaying2;
    const setShowPlayIcon =
      videoNumber === 1 ? setShowPlayIcon1 : setShowPlayIcon2;

    setIsPlaying(false);
    setShowPlayIcon(true);
    // Keep controls visible when ended
    if (videoRef.current) {
      videoRef.current.controls = true;
    }
  };

  const handleVideoClick = (videoNumber) => {
    const videoRef = videoNumber === 1 ? videoRef1 : videoRef2;
    const isPlaying = videoNumber === 1 ? isPlaying1 : isPlaying2;

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
    <div className="flex items-center justify-center  md:p-8 lg:p-12 md:mt-96  lg:mt-0">
      <div className="relative max-w-[1300px] pt-20 md:pt-0 w-full">
        {/* Heading */}
    <h5 className={`lg:text-6xl ${isArabic ?  "font-arabic pb-10" : "" }  text-3xl font-bold text-center mb-12 animated-gradient-text`}>
          {isArabic ? 'اسمعها منهم' : 'HEAR IT FROM THEM'}
        </h5>
        {/* Grid container for 2 videos */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-8 lg:gap-12">
          {/* First Video */}
          <div className="relative lg:w-1/2 flex">
            {/* Outer decorative frame */}
            <div className="relative p-6 md:p-8 lg:p-10 flex-1">
              {/* Corner frame elements */}

              {/* Inner frame with metallic effect */}

              <div
                className="rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden relative bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow p-4 h-full flex flex-col"
                style={{ backgroundSize: "400% 400%" }}
              >
                <div className="relative ">
                  {/* Main video container */}
                  <div
                    className="relative rounded-2xl bg-black/30 overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.01]"
                    onMouseEnter={() => setIsHovered1(true)}
                    onMouseLeave={() => setIsHovered1(false)}
                  >
                    {/* Video element */}
                    <video
                      ref={videoRef1}
                      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover transition-all duration-700"
                      src="/vid1.webm"
                      poster="/sport.png"
                      preload="metadata"
                      loading="lazy"
                      muted
                      playsInline
                      onPlay={() => handleVideoPlay(1)}
                      onPause={() => handleVideoPause(1)}
                      onEnded={() => handleVideoEnded(1)}
                      onClick={() => handleVideoClick(1)}
                      onLoadStart={() =>
                        console.log("Testimonials video 1 loading started")
                      }
                      onCanPlay={() =>
                        console.log("Testimonials video 1 can start playing")
                      }
                      onError={(e) =>
                        console.error("Testimonials video 1 error:", e)
                      }
                      style={{
                        filter: isPlaying1
                          ? "none"
                          : "brightness(0.8) contrast(1.1)",
                      }}
                    />

                    {/* Play button - only show when video hasn't started or when paused without controls */}
                    {showPlayIcon1 && !videoRef1.current?.controls && (
                      <div
                        className="absolute  inset-0 w-fit top-10 left-4 cursor-pointer transition-all duration-300"
                        onClick={() => handlePlayClick(1)}
                      >
                        <div className=" bg-white bg-opacity-95 rounded-full p-2 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-2xl border-2 md:border-3 lg:border-4 border-red-700">
                          <svg
                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-red-500 ml-1"
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

                <p className={`${isArabic ? "font-arabic text-right" : " text-left"} text-white text-lg md:text-xl font-medium mt-4 p-4 flex-grow`}>
                  {isArabic 
                    ? "بعد شهرين فقط، لاحظت والدتي أن ظهري أصبح أعرض وخصري أصغر. بالإضافة إلى ذلك، أصبح عادة بمرور الوقت - تستيقظ وأنت تعلم أن لديك ساعة واحدة من التدريب كل يوم."
                    : "Just after 2 month , My mother noticed my back has gotten wider and my waist smaller. Plus, it's become a habit over time — you wake up knowing you have one hour of training each day."
                  }
                </p>

                <div dir={isArabic ? "rtl" : "ltr"} className="mt-auto p-4 flex items-center justify-start gap-2">
                  <Image
                    src="/user.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full "
                    height={40}
                    width={40}
                  />
                  <div>
                    <h3 className="text-xl  font-bold text-white mb-2">
                      Seif El-Masry
                    </h3>
                    <p className="text-sm text-white  font-medium">
                      Alex, Egypt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Video */}
          <div className="relative lg:w-1/2 flex">
            {/* Outer decorative frame */}
            <div className="relative p-6 md:p-8 lg:p-10 flex-1">
              {/* Corner frame elements */}

              {/* Inner frame with metallic effect */}

              <div
                className="rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden relative bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow p-4 h-full flex flex-col"
                style={{ backgroundSize: "400% 400%" }}
              >
                <div className="relative ">
                  {/* Main video container */}
                  <div
                    className="relative rounded-2xl bg-black/30 overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.01]"
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setIsHovered2(false)}
                  >
                    {/* Video element */}
                    <video
                      ref={videoRef2}
                      className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] object-cover transition-all duration-700"
                      src="/vid1.webm"
                      poster="/sport.png"
                      preload="metadata"
                      loading="lazy"
                      muted
                      playsInline
                      onPlay={() => handleVideoPlay(2)}
                      onPause={() => handleVideoPause(2)}
                      onEnded={() => handleVideoEnded(2)}
                      onClick={() => handleVideoClick(2)}
                      onLoadStart={() =>
                        console.log("Testimonials video 2 loading started")
                      }
                      onCanPlay={() =>
                        console.log("Testimonials video 2 can start playing")
                      }
                      onError={(e) =>
                        console.error("Testimonials video 2 error:", e)
                      }
                      style={{
                        filter: isPlaying2
                          ? "none"
                          : "brightness(0.8) contrast(1.1)",
                      }}
                    />

                    {/* Play button - only show when video hasn't started or when paused without controls */}
                    {showPlayIcon2 && !videoRef2.current?.controls && (
                      <div
                        className="absolute  inset-0 w-fit top-10 left-4 cursor-pointer transition-all duration-300"
                        onClick={() => handlePlayClick(2)}
                      >
                        <div className=" bg-white bg-opacity-95 rounded-full p-2 hover:bg-opacity-100 hover:scale-110 transition-all duration-300 shadow-2xl border-2 md:border-3 lg:border-4 border-red-700">
                          <svg
                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-red-500 ml-1"
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

                <p className={`${isArabic ? "font-arabic text-right" : " text-left"} text-white text-lg md:text-xl font-medium mt-4 p-4 flex-grow`}>
                  {isArabic 
                    ? "أنصح بشدة أي شخص بالعمل معك، لقد كان الأمر مجزياً ومشجعاً حقاً"
                    : "I would highly recommend anyone to work with you, it's been really rewarding and encouraging"
                  }
                </p>

                <div dir={isArabic ? "rtl" : "ltr"} className="mt-auto p-4 flex items-center justify-start gap-2">
                  <Image
                    src="/user.jpg"
                    alt=""
                    className="w-12 h-12 rounded-full "
                    height={40}
                    width={40}
                  />
                  <div>
                    <h3 className="text-xl  font-bold text-white mb-2">
                      Ahmed Farag
                    </h3>
                    <p className="text-sm text-white  font-medium">Texas, US</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for animated gradient text */}
      <style jsx>{`
        .animated-gradient-text {
          background: linear-gradient(
            45deg,
            #ff6b6b,
            #ee5a24,
            #ff3838,
            #c44569,
            #f8b500,
            #ff6b6b
          );
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 7s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
