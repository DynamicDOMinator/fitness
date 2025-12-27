"use client";
import { useLanguage } from "../contexts/LanguageContext";
import Image from "next/image";
import { useState } from "react";

export default function EBook() {
  const { isArabic } = useLanguage();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const content = {
    en: {
      title: "Get Your Fitness E-Book",
      subtitle: "Transform your body with our comprehensive fitness guide",
      description: "Download our complete fitness e-book packed with workout routines, nutrition tips, and expert advice to help you achieve your fitness goals.",
      downloadButton: "Download E-Book",
      features: [
        "HOW TO START EXERCISE",
        "Example SCHEDULES", 
        "EXERCISE MANAGEMENT",
        "MANAGING EXPECTATIONS"
      ],
      popup: {
        title: "Download Your E-Book",
        subtitle: "Please provide your contact information to download the e-book",
        nameLabel: "Full Name",
        phoneLabel: "Phone Number",
        namePlaceholder: "Enter your full name",
        phonePlaceholder: "Enter your phone number",
        submitButton: "Download Now",
        cancelButton: "Cancel",
        nameRequired: "Name is required",
        phoneRequired: "Phone number is required",
        phoneInvalid: "Please enter a valid phone number"
      }
    },
    ar: {
      title: "احصل على كتابك الإلكتروني للياقة البدنية",
      subtitle: "حول جسمك مع دليلنا الشامل للياقة البدنية",
      description: "حمل كتابنا الإلكتروني الكامل المليء بتمارين اللياقة البدنية ونصائح التغذية والمشورة المتخصصة لمساعدتك على تحقيق أهدافك في اللياقة البدنية.",
      downloadButton: "تحميل الكتاب الإلكتروني",
      features: [
        "كيفية بدء التمرين",
        "جداول تمارين مثالية",
        "إدارة التمارين",
        "إدارة التوقعات"
      ],
      popup: {
        title: "تحميل كتابك الإلكتروني",
        subtitle: "يرجى تقديم معلومات الاتصال الخاصة بك لتحميل الكتاب الإلكتروني",
        nameLabel: "الاسم الكامل",
        phoneLabel: "رقم الهاتف",
        namePlaceholder: "أدخل اسمك الكامل",
        phonePlaceholder: "أدخل رقم هاتفك",
        submitButton: "تحميل الآن",
        cancelButton: "إلغاء",
        nameRequired: "الاسم مطلوب",
        phoneRequired: "رقم الهاتف مطلوب",
        phoneInvalid: "يرجى إدخال رقم هاتف صحيح"
      }
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = currentContent.popup.nameRequired;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = currentContent.popup.phoneRequired;
    } else if (formData.phone.length > 11) {
      newErrors.phone = isArabic ? 'بحد أقصى 11 حرفًا' : 'Max 11 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const submitContactForm = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://dashboard.bettrfitness.com/api/ebook-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone_number: formData.phone,
          language: selectedLanguage
        }),
      });
      
      if (response.ok) {
        // Close popup and proceed with download
        setShowPopup(false);
        setFormData({ name: '', phone: '' });
        setErrors({});
        
        // Trigger download
        const pdfFile = selectedLanguage === 'ar' ? '/arabic.pdf' : '/english.pdf';
        const link = document.createElement('a');
        link.href = pdfFile;
        link.download = selectedLanguage === 'ar' ? 'fitness-guide-arabic.pdf' : 'fitness-guide-english.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Track Facebook Pixel Download event
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Purchase-book', {
            content_name: selectedLanguage === 'ar' ? 'fitness-guide-arabic' : 'fitness-guide-english',
            content_type: 'ebook',
            value: 0,
            currency: 'USD'
          });
        }
      } else {
        console.error('Failed to submit contact form');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = (language) => {
    setSelectedLanguage(language);
    setShowPopup(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      {/* Contact Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 sm:p-8 rounded-2xl max-w-md w-full mx-4 ring-1 ring-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className={`text-2xl sm:text-3xl font-bold text-white mb-2 ${isArabic ? 'font-arabic' : 'font-bebas'}`}>
                {currentContent.popup.title}
              </h3>
              <p className={`text-white/80 text-sm sm:text-base ${isArabic ? 'font-arabic' : 'font-poppins'}`}>
                {currentContent.popup.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className={`block text-white/90 text-sm font-medium mb-2 ${isArabic ? 'font-arabic text-right' : 'font-poppins'}`}>
                  {currentContent.popup.nameLabel}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={currentContent.popup.namePlaceholder}
                  className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${isArabic ? 'text-right font-arabic' : 'font-poppins'} ${errors.name ? 'border-red-500' : ''}`}
                  dir={isArabic ? 'rtl' : 'ltr'}
                />
                {errors.name && (
                  <p className={`text-red-400 text-sm mt-1 ${isArabic ? 'font-arabic text-right' : 'font-poppins'}`}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className={`block text-white/90 text-sm font-medium mb-2 ${isArabic ? 'font-arabic text-right' : 'font-poppins'}`}>
                  {currentContent.popup.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  maxLength={11}
                  inputMode="numeric"
                  placeholder={currentContent.popup.phonePlaceholder}
                  className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${isArabic ? 'text-right font-arabic' : 'font-poppins'} ${errors.phone ? 'border-red-500' : ''}`}
                  dir={isArabic ? 'rtl' : 'ltr'}
                />
                {errors.phone && (
                  <p className={`text-red-400 text-sm mt-1 ${isArabic ? 'font-arabic text-right' : 'font-poppins'}`}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className={`flex gap-3 mt-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={submitContactForm}
                disabled={isSubmitting}
                className={`flex-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isArabic ? 'font-arabic' : 'font-poppins'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? '...' : currentContent.popup.submitButton}
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setFormData({ name: '', phone: '' });
                  setErrors({});
                }}
                className={`px-6 py-3 border border-white/30 text-white/90 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 ${isArabic ? 'font-arabic' : 'font-poppins'}`}
              >
                {currentContent.popup.cancelButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-3xl lg:text-6xl font-bold mb-4 sm:mb-6">
          <span className={`bg-gradient-to-r from-[#fd5747] via-red-500 to-orange-700 bg-clip-text text-transparent animate-gradient-x ${isArabic ? 'font-arabic' : 'font-bebas'}`} style={{ backgroundSize: "300% 300%" }}>
            {currentContent.title}
          </span>
        </h2>
        <p className="text-white/80 text-lg sm:text-xl lg:text-2xl mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed">
          {currentContent.subtitle}
        </p>
      </div>

      <div dir={isArabic ? 'rtl' : 'ltr'} className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-8 lg:gap-16">
          
          {/* E-book Images Section */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative flex gap-6 sm:gap-8">
              {/* Arabic Book */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 p-4 sm:p-6 rounded-2xl backdrop-blur-xl ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/book-ar.png"
                    alt="Arabic Fitness E-book"
                    width={200}
                    height={280}
                    className="rounded-xl shadow-2xl w-full h-auto object-cover"
                  />
                  <button
                    onClick={() => handleDownload('ar')}
                    className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                   Download Arabic Version
                  </button>
                </div>
              </div>

              {/* English Book */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 p-4 sm:p-6 rounded-2xl backdrop-blur-xl ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300 group-hover:scale-105">
                  <Image
                    src="/book-en.png"
                    alt="English Fitness E-book"
                    width={200}
                    height={280}
                    className="rounded-xl shadow-2xl w-full object-cover"
                  />
                  <button
                    onClick={() => handleDownload('en')}
                    className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                  >
                    Download English Version
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl backdrop-blur-xl ring-1 ring-white/10 animate-gradient-slow" style={{ backgroundSize: "400% 400%" }}>
              
              <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 ${isArabic ? 'font-arabic' : 'font-bebas'}`}>
                {currentContent.title}
              </h3>
              
              <p className={`text-white/80 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed ${isArabic ? 'font-arabic' : 'font-poppins'}`}>
                {currentContent.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {currentContent.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex-shrink-0"></div>
                    <span className={`text-white/90 text-sm sm:text-base lg:text-lg ${isArabic ? 'font-arabic' : 'font-poppins'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}