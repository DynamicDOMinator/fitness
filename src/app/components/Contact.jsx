"use client"
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import { useLanguage } from "../contexts/LanguageContext";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const { isArabic } = useLanguage();
  
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://localhost:3000/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-10">
      {/* Animated Contact Us Header */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20 mt-10 sm:mt-16 lg:mt-20">
        <h2 className="text-3xl  lg:text-6xl font-bold mb-4 sm:mb-6">
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

          <p className={`text-white pt-3 sm:pt-5 text-sm sm:text-base ${isArabic ? 'font-arabic' : 'font-poppins'}`}>
            {isArabic? "هل لديك سؤال أو جاهز للتحول؟ دعونا نبدأ رحلتك في التدريب معنا" : "Have a question or ready for transformation? Let's start your fitness journey together."   }   
          </p>

          <div className="flex flex-col items-start gap-4 pt-6 sm:pt-8 lg:pt-10 font-poppins">
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
                 info@bettrfitness.com
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
                  +20 1030667969
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
            <form className="w-full" onSubmit={handleSubmit}>
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm">
                  {isArabic ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!"}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
                  {isArabic ? "حدث خطأ. يرجى ملء جميع الحقول والمحاولة مرة أخرى." : "Error occurred. Please fill all fields and try again."}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 w-full">
                <input
                  className="text-white outline-none w-full sm:w-1/2 bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  suppressHydrationWarning={true}
                />
                <input
                  className="text-white outline-none w-full sm:w-1/2 bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base"
                  placeholder="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="pt-4 sm:pt-6 lg:pt-10">
                <input
                  className="text-white outline-none w-full bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  suppressHydrationWarning={true}
                />
              </div>
              <div className="pt-4 sm:pt-6 lg:pt-10">
                <textarea
                  className="text-white outline-none w-full bg-transparent p-2 sm:p-3 border-2 rounded-xl sm:rounded-2xl border-white placeholder-gray-300 text-sm sm:text-base resize-none"
                  placeholder="Message"
                  rows={8}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  suppressHydrationWarning={true}
                />
              </div>

              <div className="pt-4 sm:pt-6 lg:pt-10">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`${
                    isLoading 
                      ? 'bg-gray-500/50 cursor-not-allowed' 
                      : 'bg-white/80 hover:bg-white/90'
                  } transition-colors duration-200 text-black px-4 sm:px-6 py-2 sm:py-3 w-full font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base`}
                  suppressHydrationWarning={true}
                >
                  {isLoading 
                    ? (isArabic ? "جاري الإرسال..." : "Sending...") 
                    : (isArabic ? "إرسال" : "Submit")
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
