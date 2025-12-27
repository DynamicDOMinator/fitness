'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isArabic, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'testimonials', 'experiences', 'pricing', 'transformations', 'journey', 'faqs', 'ebook'];
      const scrollPosition = window.scrollY + 120; // Increased offset for better detection
      
      let currentSection = 'home'; // Default to home
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Initial call to set active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const navItems = [
    { id: 'home', label: isArabic ? 'الرئيسية' : 'Home' },
    { id: 'services', label: isArabic ? 'الخدمات' : 'Services' },
    { id: 'testimonials', label: isArabic ? 'الشهادات' : 'Testimonials' },
    // { id: 'experiences', label: 'Experiences' },
    { id: 'pricing', label: isArabic ? 'الأسعار' : 'Pricing' },
    { id: 'transformations', label: isArabic ? 'التحولات' : 'Transformations' },
    { id: 'journey', label: isArabic ? 'الرحلة' : 'Journey' },
    { id: 'faqs', label: isArabic ? 'الأسئلة الشائعة' : 'FAQs' },
    { id: 'ebook', label: isArabic ? 'الكتاب الإلكتروني' : 'E-Book' },
  ];

  return (
    <header 
      className={`fixed max-w-[1200px] ${isArabic ? "font-arabic" : "font-poppins"} mx-auto rounded-2xl  top-3 left-0 right-0 z-50 transition-all duration-300 bg-[#1a1c21]/20 backdrop-blur-xl shadow-lg border-b border-white/10`} >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl md:text-3xl font-bold text-white hover:text-red-500 transition-colors duration-300"
            >
             <Image src="/logo.png" alt="FitNis" width={120} height={120} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex ${isArabic ? "flex-row-reverse" : "flex-row"} space-x-8 lg:pr-10 items-center`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm lg:text-base font-medium transition-all duration-300 py-2 group ${
                  activeSection === item.id
                    ? 'text-red-500'
                    : 'text-white hover:text-red-500'
                }`}
              >
                {item.label}
                {/* Active state border */}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0'
                  }`}
                />
                {/* Hover animation border */}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${
                    activeSection === item.id ? 'w-0' : 'w-0'
                  }`}
                />
              </button>
            ))}
            
            {/* Language Toggle Button */}
<div className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? "right-4" : "right-4"}`}>
    <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1.5 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-300 hover:scale-105"
            >
              {isArabic ? 'EN' : 'AR'}
            </button>
</div>

          
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-md transition-all duration-300"
            >
              {isArabic ? 'EN' : 'AR'}
            </button>
            
            <button
              className="text-white hover:text-red-500 transition-colors duration-300"
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                mobileMenu.classList.toggle('hidden');
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div id="mobile-menu" className="hidden md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a1c21]/95 backdrop-blur-md rounded-lg mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  document.getElementById('mobile-menu').classList.add('hidden');
                }}
                className={`relative block w-full text-left px-3 py-2 text-base font-medium transition-all duration-300 hover:text-red-500 hover:bg-red-500/10 rounded-md group ${
                  activeSection === item.id
                    ? 'text-red-500 bg-red-500/10'
                    : 'text-white'
                }`}
              >
                {item.label}
                {/* Mobile active indicator */}
                <span 
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-red-500 transition-all duration-300 ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}