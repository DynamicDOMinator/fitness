"use client"
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import { useLanguage } from "../contexts/LanguageContext";
export default function Contact() {
  const { isArabic } = useLanguage();
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-10">
      {/* Animated Contact Us Header */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 mt-10 sm:mt-16 lg:mt-20">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
          <span className={`bg-gradient-to-r from-[#fd5747] via-red-500 to-orange-700 bg-clip-text text-transparent animate-gradient-x ${isArabic ? 'font-arabic' : 'font-bebas'}`} style={{ backgroundSize: "300% 300%" }}>
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </span>
        </h2>
        <p className="text-white/80 text-lg sm:text-xl lg:text-2xl mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed">
       {isArabic? "جاهز للتحول؟ دعونا نبدأ رحلتك في التدريب معنا" : " Ready to transform your life? Let's start your fitness journey together."   }   
        </p>
      </div>

      <div dir={isArabic ? 'rtl' : 'ltr'} className="flex flex-col lg:flex-row items-start justify-center max-w-[1100px] mx-auto gap-8 lg:gap-20">
        <div className="w-full lg:w-1/2 lg:pr-8">
          <h6 className={`text-white text-2xl sm:text-3xl lg:text-4xl font-bold ${isArabic ? 'font-arabic' : 'font-bebas'}`}>
            {isArabic? "تواصل معنا" : "Get in touch"}
          </h6>

          <p className={`text-white pt-3 sm:pt-5 text-sm sm:text-base ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic? "هل لديك سؤال أو جاهز للتحول؟ دعونا نبدأ رحلتك في التدريب معنا" : "Have a question or ready for transformation? Let's start your fitness journey together."   }   
          </p>

          <div className="flex flex-col items-start gap-4 pt-6 sm:pt-8 lg:pt-10">
            <div
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl shadow-2xl w-full sm:min-w-[350px] lg:min-w-[400px] bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
              }}
            >
              <div className="bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-xl shadow-lg flex-shrink-0">
                <IoMailOutline className="text-white text-xl sm:text-2xl" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                  Email us
                </p>
                <p className="text-sm sm:text-lg lg:text-xl text-gray-400 break-all">
                  ahmedsayed@gmail.com
                </p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 sm:gap-5 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl shadow-2xl w-full sm:min-w-[350px] lg:min-w-[400px] bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
              style={{
                backgroundSize: "400% 400%",
              }}
            >
              <div className="bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-xl shadow-lg flex-shrink-0">
                <IoCallOutline className="text-white text-xl sm:text-2xl" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                  Call us
                </p>
                <p className="text-sm sm:text-lg lg:text-xl text-gray-400">
                  +201099999999
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:pl-8">
          <div
            className="flex items-center gap-5 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl shadow-2xl w-full bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow"
            style={{
              backgroundSize: "400% 400%",
            }}
          >
            <form className="w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 w-full">
                <input
                  className="text-white outline-none w-full sm:w-1/2 bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base"
                  placeholder="Name"
                  type="text"
                />
                <input
                  className="text-white outline-none w-full sm:w-1/2 bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base"
                  placeholder="Phone"
                  type="tel"
                />
              </div>

              <div className="pt-4 sm:pt-6 lg:pt-10">
                <input
                  className="text-white outline-none w-full bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="pt-4 sm:pt-6 lg:pt-10">
                <textarea
                  className="text-white outline-none w-full bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base resize-none"
                  placeholder="Message"
                  rows={8}
                />
              </div>

              <div className="pt-4 sm:pt-6 lg:pt-10">
                <button
                  type="submit"
                  className="bg-white/80 hover:bg-white/90 transition-colors duration-200 text-black px-4 sm:px-6 py-2 sm:py-3 w-full font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
