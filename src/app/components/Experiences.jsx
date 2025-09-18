"use client";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Service() {
  // Trainer data array with only 2 trainers
  const trainers = [
    {
      id: 1,
      name: "John Smith",
      specialty: "Strength Training",
      description:
        "Professional strength trainer with 8+ years of experience. Specializes in powerlifting, bodybuilding, and functional fitness. Helped over 200 clients achieve their fitness goals through personalized training programs.",
      image: "/sport.png",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      specialty: "Cardio & HIIT",
      description:
        "Certified cardio specialist and HIIT instructor. Expert in high-intensity interval training, endurance building, and weight loss programs. Known for creating fun and challenging workout routines.",
      image: "/hamo.png",
    },
  ];

  const [currentTrainer, setCurrentTrainer] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle swipe gestures
  const minSwipeDistance = 50;

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

  const handleSwipe = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    if (direction === "left") {
      // Swipe left - go to next trainer
      setCurrentTrainer((currentTrainer + 1) % trainers.length);
    } else if (direction === "right") {
      // Swipe right - go to previous trainer
      setCurrentTrainer(
        currentTrainer === 0 ? trainers.length - 1 : currentTrainer - 1
      );
    }

    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Touch events
  const onTouchStart = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleSwipe("left");
    }
    if (isRightSwipe) {
      handleSwipe("right");
    }
  };

  // Mouse events for desktop testing
  const onMouseDown = (e) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    if (touchStart !== null) {
      setTouchEnd(e.clientX);
    }
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleSwipe("left");
    }
    if (isRightSwipe) {
      handleSwipe("right");
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Handle click on pagination indicators
  const handlePaginationClick = (index) => {
    if (isTransitioning || index === currentTrainer) return;

    setIsTransitioning(true);
    setCurrentTrainer(index);

    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="service md:mt-40 mt-20 pb-10 lg:overflow-hidden 2xl:overflow-auto">
      <div
        className="lg:flex block  items-center justify-center relative 
"
      >
        <div
          className=" lg:w-[60%] bg-[#d73f1e]  md:py-55 py-30 "
          style={style}
        >
          <h3 className="font-bold text-white md:text-6xl text-4xl text-center md:text-left md:pl-30">
            Our Trainers
          </h3>

          <div
            className="pt-10 pl-10 transition-all duration-700 ease-out transform"
            style={{
              opacity: isTransitioning ? 0.3 : 1,
              transform: `translateX(${isTransitioning ? "-20px" : "0px"})`,
            }}
          >
            <h4
              className="text-white md:text-3xl text-2xl font-semibold transition-all duration-700 ease-out"
              style={{
                opacity: isTransitioning ? 0.5 : 1,
                transform: `translateY(${isTransitioning ? "-10px" : "0px"})`,
              }}
            >
              {trainers[currentTrainer].name}
            </h4>
            <h5
              className="text-orange-300 md:text-xl text-lg font-medium mt-2 transition-all duration-700 ease-out"
              style={{
                opacity: isTransitioning ? 0.4 : 1,
                transform: `translateY(${isTransitioning ? "-5px" : "0px"})`,
              }}
            >
              {trainers[currentTrainer].specialty}
            </h5>
          </div>

          <p
            className="pt-10 md:pr-60 pr-10 text-center md:text-left px-10 md:pl-10 text-white md:text-2xl text-lg transition-all duration-700 ease-out transform"
            style={{
              opacity: isTransitioning ? 0.2 : 1,
              transform: `translateX(${isTransitioning ? "-30px" : "0px"})`,
            }}
          >
            {trainers[currentTrainer].description}
          </p>

          <button className="mt-20 mx-auto flex items-center md:ml-10 text-white bg-gray-700 md:text-2xl text-xl p-4 rounded-full border-4 gap-2 justify-center ">
            More Trainers
            <FaArrowRight
              className=" text-2xl bg-orange-700 w-10 h-10 p-2 rounded-full text-black
"
            />
          </button>
        </div>

        <div className=" lg:w-[40%] mt-30 lg:mt-0">
          <div
            className="flex items-center relative cursor-grab active:cursor-grabbing select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {/* Active Trainer Card - Front Position */}
            <div
              className="bg-[#4c4c4c] rounded-[70px] 2xl:h-[600px] 2xl:w-[450px] md:w-[300px] md:h-[500px] w-[200px] h-[350px] absolute left-[35%] md:-translate-x-1/2 lg:left-15   z-[10] scale-110 transition-all duration-700 ease-out transform"
              style={{
                boxShadow: "inset 0 -400px 100px -150px rgba(0, 0, 0, 0.5)",
                transform: `scale(1.1) translateY(${
                  isTransitioning ? "-10px" : "0px"
                })`,
                opacity: isTransitioning ? 0.8 : 1,
              }}
            >
              <Image
                src={trainers[currentTrainer].image}
                alt={trainers[currentTrainer].name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-[70px] select-none transition-all duration-700 ease-out cursor-pointer"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={() =>
                  handlePaginationClick((currentTrainer + 1) % trainers.length)
                }
                style={{
                  filter: isTransitioning ? "blur(2px)" : "blur(0px)",
                }}
              />
            </div>

            {/* Next Trainer Card - Back Position */}
            <div
              className="bg-[#4c4c4c] rounded-[70px] 2xl:h-[600px] 2xl:w-[450px] md:w-[300px] md:h-[500px] w-[200px] h-[350px] absolute md:right-3/5 right-[45%] lg:right-0 lg:left-50 z-[5] scale-95 transition-all duration-700 ease-out transform"
              style={{
                boxShadow: "inset 0 -400px 100px -150px rgba(0, 0, 0, 0.5)",
                transform: `scale(0.95) translateY(${
                  isTransitioning ? "10px" : "0px"
                })`,
                opacity: isTransitioning ? 0.6 : 0.8,
              }}
            >
              <Image
                src={trainers[(currentTrainer + 1) % trainers.length].image}
                alt={trainers[(currentTrainer + 1) % trainers.length].name}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-[70px] select-none transition-all duration-700 ease-out cursor-pointer"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={() =>
                  handlePaginationClick((currentTrainer + 1) % trainers.length)
                }
                style={{
                  filter: isTransitioning ? "blur(1px)" : "blur(0px)",
                }}
              />
            </div>

            {/* Clickable Pagination Indicators */}

            <div
              className={`w-[40px] h-[8px] mt-30 absolute right-[57%] md:right-[55%] lg:right-0 md:top-72 top-40 lg:left-5 z-[1000] transition-all duration-500 ease-out cursor-pointer rounded-full ${
                currentTrainer === 0
                  ? "bg-orange-500"
                  : "bg-gray-400 hover:bg-orange-300"
              }`}
              onClick={() => handlePaginationClick(0)}
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transform: `scale(${
                  currentTrainer === 0 ? "1.1" : "1"
                }) translateY(${isTransitioning ? "1px" : "0px"})`,
                boxShadow:
                  currentTrainer === 0
                    ? "0 2px 8px rgba(255, 165, 0, 0.3)"
                    : "none",
              }}
            ></div>
            <div
              className={`w-[40px] h-[8px] right-1/2 lg:right-0 mt-30 absolute md:top-72 top-40  lg:left-16 z-[1000] transition-all duration-500 ease-out cursor-pointer rounded-full ${
                currentTrainer === 1
                  ? "bg-orange-500"
                  : "bg-white hover:bg-orange-300"
              }`}
              onClick={() => handlePaginationClick(1)}
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transform: `scale(${
                  currentTrainer === 1 ? "1.1" : "1"
                }) translateY(${isTransitioning ? "1px" : "0px"})`,
                boxShadow:
                  currentTrainer === 1
                    ? "0 2px 8px rgba(255, 165, 0, 0.3)"
                    : "none",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
