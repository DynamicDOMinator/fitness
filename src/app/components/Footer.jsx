'use client';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

const Footer = () => {
  const { isArabic } = useLanguage();

  const content = {
    en: {
      quickLinks: "Quick Links",
      sections: {
        home: "Home",
        services: "Services", 
        testimonials: "Testimonials",
        pricing: "Pricing",
        transformations: "Transformations",
        fitnessTools: "Fitness Tools",
        journey: "Journey",
        faqs: "FAQs",
        contact: "Contact"
      },
      followUs: "Follow Us",
      contactInfo: "Contact Info",
      email: "info@bettrfitness.com",
      phone: "+20 1030667969",
      address: "Cairo, Egypt",
      copyright: "© 2024 BettrFitness. All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service"
    },
    ar: {
      quickLinks: "روابط سريعة",
      sections: {
        home: "الرئيسية",
        services: "الخدمات",
        testimonials: "آراء العملاء", 
        pricing: "الأسعار",
        transformations: "التحولات",
        fitnessTools: "أدوات اللياقة",
        journey: "الرحلة",
        faqs: "الأسئلة الشائعة",
        contact: "اتصل بنا"
      },
      followUs: "تابعنا",
      contactInfo: "معلومات الاتصال",
      email: "info@bettrfitness.com",
      phone: "+20 123 456 789", 
      address: "القاهرة، مصر",
      copyright: "© 2024 بتر فيتنس. جميع الحقوق محفوظة.",
      privacyPolicy: "سياسة الخصوصية",
      termsOfService: "شروط الخدمة"
    }
  };

  const currentContent = isArabic ? content.ar : content.en;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    {
      name: 'Instagram', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: 'https://www.instagram.com/bettrfitness/'
    },
    {
      name: 'TikTok',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@bettrfitness'
    }
  ];

  return (
    <footer className="relative font-poppins mt-20 backdrop-blur-xl bg-gradient-to-br from-black/50 via-gray-800/30 to-black/50 ring-1 ring-white/10 animate-gradient-slow rounded-t-4xl" style={{ backgroundSize: "400% 400%" }}>
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 rounded-t-4xl to-transparent backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isArabic ? 'text-right' : 'text-left'}`}>
          
          {/* Logo and Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center  ">
              <Image
                src="/logo.png"
                alt="BettrFitness Logo"
                width={150}
                height={150}
                className="mr-3 object-cover "
              />
             
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {isArabic 
                ? "نحن نساعدك في تحقيق أهدافك في اللياقة البدنية من خلال برامج تدريبية مخصصة وتغذية متوازنة."
                : "We help you achieve your fitness goals through personalized training programs and balanced nutrition."
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href={`mailto:${currentContent.email}`} className="hover:text-red-500 transition-colors">
                  {currentContent.email}
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>{currentContent.phone}</span>
              </div>
            
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 font-cairo">
              {currentContent.quickLinks}
            </h4>
            <ul className="space-y-2">
              {Object.entries(currentContent.sections).map(([key, label]) => (
                <li key={key}>
                  <button
                    onClick={() => scrollToSection(key)}
                    className="text-gray-300 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                    suppressHydrationWarning={true}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 font-cairo">
              {currentContent.followUs}
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-red-500/10"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4 font-cairo">
              {isArabic ? "اشترك في النشرة الإخبارية" : "Newsletter"}
            </h4>
            <p className="text-gray-300 mb-4 text-sm">
              {isArabic 
                ? "احصل على آخر النصائح والعروض"
                : "Get the latest tips and offers"
              }
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={isArabic ? "بريدك الإلكتروني" : "Your email"}
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff87]"
                suppressHydrationWarning={true}
              />
              <button 
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-r-md hover:bg-[#00ff87]/90 transition-colors"
                suppressHydrationWarning={true}
              >
                {isArabic ? "اشترك" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

     
      </div>
    </footer>
  );
};

export default Footer;