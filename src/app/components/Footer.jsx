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
      phone: "+20 123 456 789",
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
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com/bettrfitness'
    },
    {
      name: 'Instagram', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.367-.315-.49-.753-.49-1.243 0-.49.123-.928.49-1.243.369-.367.807-.49 1.297-.49s.928.123 1.297.49c.367.315.49.753.49 1.243 0 .49-.123.928-.49 1.243-.369.315-.807.49-1.297.49zm-4.006 1.599c-1.297 0-2.326 1.029-2.326 2.326s1.029 2.326 2.326 2.326 2.326-1.029 2.326-2.326-1.029-2.326-2.326-2.326z"/>
        </svg>
      ),
      url: 'https://instagram.com/bettrfitness'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: 'https://twitter.com/bettrfitness'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: 'https://youtube.com/bettrfitness'
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
                <svg className="w-5 h-5 mr-2 text-[#00ff87]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href={`mailto:${currentContent.email}`} className="hover:text-[#00ff87] transition-colors">
                  {currentContent.email}
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-[#00ff87]" fill="currentColor" viewBox="0 0 20 20">
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
                    className="text-gray-300 hover:text-[#00ff87] transition-colors duration-200 cursor-pointer"
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
                  className="text-gray-300 hover:text-[#00ff87] transition-colors duration-200 p-2 rounded-full hover:bg-[#00ff87]/10"
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
              />
              <button className="px-4 py-2 bg-[#00ff87] text-black font-semibold rounded-r-md hover:bg-[#00ff87]/90 transition-colors">
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