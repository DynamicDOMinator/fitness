"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { CgGym } from "react-icons/cg";
import { useLanguage } from "../contexts/LanguageContext";

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { isArabic } = useLanguage();

  // Scroll functions for buttons
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFitnessTools = () => {
    const fitnessToolsSection = document.getElementById('fitness-tools-section');
    if (fitnessToolsSection) {
      fitnessToolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // bg-gradient-to-r from-[#fd5747] to-blue-700 bg-clip-text text-transparent
  return (
    <div>
      <div className="hero relative ">
        <div className="md:pt-50 pt-30 ">
          <div className="flex items-center justify-center relative z-[10]   ">
            <div className="lg:text-8xl md:text-6xl text-4xl text-center">
              <h1
                className={`text-white font-bold p-2 md:p-0 ${
                  isArabic ? "font-arabic" : "font-bebas"
                }`}
              >
                {isArabic ? " لياقة حقيقية  " : "Real fitness for "}
                <span
                  className={`text-red-500 ${
                    isArabic ? "font-arabic" : "font-bebas"
                  } `}
                >
                  {isArabic ? " للحياة الحقيقية" : " Real life"}
                </span>
              </h1>

              <p
                className={`text-white p-3 md:p-0 text-lg md:text-xl lg:text-2xl ${
                  isArabic ? "font-arabic" : "font-poppins"
                } font-normal mt-6 max-w-4xl mx-auto leading-relaxed`}
              >
                {isArabic
                  ? "اكتشف برامج اللياقة البدنية المصممة خصيصاً لأسلوب حياتك. احصل على نتائج حقيقية مع التدريب الشخصي والتوجيه المهني. نحن نؤمن بأن اللياقة البدنية يجب أن تحسن من جودة حياتك، وبرامج التمرين لدينا مصممة لتناسب نمط حياتك الحالي وتساعدك على اتخاذ خيارات أفضل بشأن صحتك "
                  : "Fitness should improve your quality of life, Our Exercise Programs are tailored to fit your current lifestyle and help you make better choices regarding your health "}

                   <span className="text-red-500">{isArabic ? " بدون حميات قاسية أو تمارين غير واقعية لمدة ساعتين" : " no crash-diets , no unrealistic 2 hours workouts"}</span>


              </p>

            </div>
          </div>

          <div
            className="md:w-[28%] mx-10 md:mt-30 mt-10 md:mx-auto relative rounded-3xl  shadow-[0_0_50px_rgba(253,87,71,0.8)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <iframe
              className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[400px] xl:h-[800px] rounded-3xl"
              src="https://www.youtube.com/embed/6y6ZLBiugG8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex items-center justify-center pt-10 gap-10">
          <button 
            onClick={scrollToPricing}
            className="bg-[#fd5747] text-white text-xl px-6 py-2 rounded-full font-bold hover:bg-[#e64a3a] transition-colors duration-300"
          >
            {isArabic ? "احصل على اللياقة" : "Get Fit"}
          </button>

          <button 
            onClick={scrollToFitnessTools}
            className=" text-[#fd5747] px-6 py-2 text-xl rounded-full font-bold hover:bg-[#f5f5f5] transition-colors duration-300"
          >
            {isArabic ? "خدمات مجانية" : "Free Services"}
          </button>
        </div>
        <div
          className="backdrop-blur-xl bg-gradient-to-br lg:mx-10 mx-4 from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow rounded-4xl"
          style={{ backgroundSize: "400% 400%" }}
        >
          <div className={`flex flex-col ${
                  isArabic ? "font-arabic" : "font-poppins"
                } md:flex-row items-center justify-between  gap-6 lg:mt-20  mt-10  md:p-10 p-4`}>
            <div className="flex md:flex-col flex-row-reverse justify-between md:items-start items-center  w-full md:w-auto  gap-2 mr-auto md:m-auto">
             <Image src="/2.png" height={100} width={100} alt="client" className="w-25 h-25  md:mx-auto " />

              <div className=" pb-6 md:pb-0">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  {isArabic ? "عملاء سعداء" : "Happy Clients"}{" "}
                </h2>
                <p className="text-white pt-2 text-center  text-sm lg:text-lg">
                  {isArabic ? "+7 سنوات خبرة" : "+7 years experience"}
                </p>
              </div>
            </div>

            <div className="flex md:flex-col flex-row-reverse justify-between md:items-start items-center  w-full md:w-auto gap-2 mr-auto md:m-auto">
              <Image src="/1.png" height={100} width={100} alt="client" className="w-25 h-25  md:mx-auto"/>

              <div className=" pb-6 md:pb-0">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  {isArabic ? "برامج موجهة للنتائج" : "Results-Driven Programs"}{" "}
                </h2>
                <p className="text-white pt-2 md:text-center  text-sm lg:text-lg">
                  {isArabic ? "تدريب شخصي" : "Personalized Coaching"}
                </p>
              </div>
            </div>

            <div className="flex md:flex-col flex-row-reverse justify-between  md:items-start items-center  w-full md:w-auto gap-2 mr-auto md:m-auto">
              <Image src="/3.png" height={100} width={100} alt="client" className="w-25 h-25  md:mx-auto" />

              <div className=" pb-6 md:pb-0">
                <h2 className="lg:text-3xl text-xl text-[#fd5747]">
                  {isArabic
                    ? " دول مختلفة +6   "
                    : " 6+ different countries"}{" "}
                </h2>
                <p className="text-white pt-2 text-sm lg:text-lg lg:text-center">
                  {isArabic ? "نتائج مضمونة" : "Guaranteed Results"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
