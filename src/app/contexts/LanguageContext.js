'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }) {
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ar') {
      setIsArabic(true);
    }
  }, []);

  const toggleLanguage = () => {
    const newIsArabic = !isArabic;
    setIsArabic(newIsArabic);
    localStorage.setItem('language', newIsArabic ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ isArabic, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}