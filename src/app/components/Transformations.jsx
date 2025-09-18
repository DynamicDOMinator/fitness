'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useState, useRef } from 'react';

export default function Transformations() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);
  // Client reviews data
  const clientReviews = [
    {
      id: 1,
      image: '/hamo.png',
      clientName: 'Ahmed Hassan',
      review: 'This fitness program completely changed my life. I lost 30 pounds in 3 months and gained incredible strength. The trainers are amazing and the community is so supportive. I never thought I could achieve these results!'
    },
    {
      id: 2,
      image: '/sport.png',
      clientName: 'Sarah Johnson',
      review: 'Best decision I ever made was joining this gym. The personalized training plan helped me reach my goals faster than I imagined. The nutrition guidance was spot on and the results speak for themselves.'
    },
    {
      id: 3,
      image: '/hamo.png',
      clientName: 'Mike Rodriguez',
      review: 'After years of struggling with my fitness, this program gave me the structure and motivation I needed. The transformation is not just physical but mental too. I feel more confident and energetic than ever.'
    },
    {
      id: 4,
      image: '/sport.png',
      clientName: 'Emma Wilson',
      review: 'The coaches here truly care about your success. They pushed me beyond my limits while keeping me safe. The results exceeded my expectations and I made lifelong friends along the way.'
    }
  ];

  return (
    <div className="w-full py-16 bg-transparent">
      <div className="container mx-auto px-4">
        <h5 className="text-6xl font-bold text-center mb-12 animated-gradient-text">
         HEAR IT FROM THEM
        </h5>
        
        <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={false}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
          className="reviews-swiper "
        >
          {clientReviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex lg:px-30 flex-col lg:flex-row items-center  justify-center gap-8 p-8">
                {/* Text Review Section - 50% width (Left Side) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center  pt-10 lg:pt-0">
                  <div className="text-left p-10 rounded-4xl shadow-2xl relative bg-black/20  ">
                  
                    <p className="text-white text-lg leading-relaxed italic">
                      "{item.review}"
                    </p>


<div className='flex items-center  rotate-6 absolute left-0 -top-11'>
<div className='h-[55px] w-[30px] animated-gradient-bg' style={{clipPath: 'polygon(25% 0%, 73% 0, 50% 100%, 0% 100%)'}}></div>
<div className='h-[55px] w-[30px] animated-gradient-bg' style={{clipPath: 'polygon(25% 0%, 73% 0, 50% 100%, 0% 100%)'}}></div>

</div>


                  </div>
                </div>

                {/* Image Section - 50% width (Right Side) */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative w-full  max-w-md aspect-square rounded-lg overflow-hidden ">
                    <Image
                      src={item.image}
                      alt={item.clientName}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />


<div className='flex items-center  rotate-6 absolute right-0 -bottom-2 pb-5 '>
<div className='h-[55px] w-[30px] animated-gradient-bg' style={{clipPath: 'polygon(25% 0%, 73% 0, 50% 100%, 0% 100%)'}}></div>
<div className='h-[55px] w-[30px] animated-gradient-bg' style={{clipPath: 'polygon(25% 0%, 73% 0, 50% 100%, 0% 100%)'}}></div>

</div>

                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="custom-prev hidden  absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-500 hover:bg-red-500 text-black w-12 h-12 rounded-full lg:flex items-center justify-center cursor-pointer transition-all duration-300 border-4 border-white shadow-lg hover:scale-110">
            <FaArrowLeft className="text-lg" />
          </div>
          <div className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-500 hover:bg-red-500 text-w w-12 h-12 rounded-full hidden lg:flex items-center justify-center cursor-pointer transition-all duration-300 border-4 border-white shadow-lg hover:scale-110">
            <FaArrowRight className="text-lg" />
          </div>
        </div>

        {/* Custom Pagination */}
        <div className="custom-pagination  flex   justify-center mt-8 gap-2 py-4 px-6">
          {clientReviews.map((_, index) => (
            <span
              key={index}
              className={`custom-bullet ${activeSlide === index ? 'active' : ''}`}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.slideToLoop(index);
                }
              }}
            />
          ))}
        </div>

        {/* Custom styles for better appearance */}
        <style jsx>{`
          .reviews-swiper {
            padding: 20px 0;
          }

          .reviews-swiper .swiper-pagination {
            display: none !important;
          }

          .custom-pagination {
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .reviews-swiper .swiper-slide {
            height: auto;
          }

          .reviews-swiper .swiper-button-next,
          .reviews-swiper .swiper-button-prev {
            color: black !important;
            font-weight: bold !important;
            background: linear-gradient(135deg, #6b7280, #9ca3af) !important;
            border-radius: 50% !important;
            width: 50px !important;
            height: 50px !important;
            margin-top: -25px !important;
            box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
            transition: all 0.3s ease !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
            backdrop-filter: blur(10px) !important;
          }

          .reviews-swiper .swiper-button-next:hover,
          .reviews-swiper .swiper-button-prev:hover {
            background: linear-gradient(135deg, #ff3838, #c44569) !important;
            color: black !important;
            transform: scale(1.1) !important;
            box-shadow: 0 8px 25px rgba(255, 56, 56, 0.4) !important;
          }

          .reviews-swiper .swiper-button-next::after,
          .reviews-swiper .swiper-button-prev::after {
            content: '';
            display: none;
          }

          .reviews-swiper .swiper-button-next::before,
          .reviews-swiper .swiper-button-prev::before {
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            font-size: 16px;
          }

          .reviews-swiper .swiper-button-next::before {
            content: '→';
          }

          .reviews-swiper .swiper-button-prev::before {
            content: '←';
          }

          .custom-bullet {
             background: linear-gradient(135deg, #6b7280, #9ca3af) !important;
             opacity: 1 !important;
             width: 40px !important;
             height: 8px !important;
             margin: 0 6px !important;
             transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
             border-radius: 4px !important;
             cursor: pointer !important;
             display: inline-block !important;
             border: 1px solid rgba(255, 255, 255, 0.3) !important;
             box-shadow: 0 2px 8px rgba(107, 114, 128, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
             position: relative !important;
             overflow: hidden !important;
          }

          .custom-bullet::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent) !important;
            transition: left 0.6s ease !important;
          }

          .custom-bullet:hover {
            background: linear-gradient(135deg, #f59e0b, #fbbf24) !important;
            transform: scale(1.05) translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2) !important;
            border-color: rgba(255, 255, 255, 0.4) !important;
          }

          .custom-bullet:hover::before {
            left: 100% !important;
          }

          .custom-bullet.active {
             background: linear-gradient(135deg, #ff4757, #ff3838, #c44569, #ff4757) !important;
             background-size: 200% 200% !important;
             animation: gradientShift 3s ease-in-out infinite !important;
             transform: scale(1.2) !important;
             box-shadow: 
               0 0 20px rgba(255, 71, 87, 0.6),
               0 0 40px rgba(255, 71, 87, 0.4),
               0 4px 15px rgba(255, 71, 87, 0.3),
               inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
           }

          .custom-bullet.active::before {
            left: 100% !important;
          }

          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5), 0 4px 12px rgba(234, 88, 12, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2);
            }
            50% {
              box-shadow: 0 10px 30px rgba(249, 115, 22, 0.7), 0 6px 16px rgba(234, 88, 12, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);
            }
          }

          .reviews-swiper .swiper-pagination {
            bottom: -10px;
          }

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

          .animated-gradient-bg {
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
            animation: gradientShift 7s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
}