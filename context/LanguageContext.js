import React, { createContext, useState, useContext } from 'react';

// Context banayein
const LanguageContext = createContext();

// Provider function
export const LanguageProvider = ({ children }) => {
  const [isUrdu, setIsUrdu] = useState(false);

  const toggleLanguage = () => {
    setIsUrdu((prev) => !prev);
  };

  return (
    <LanguageContext.Provider value={{ isUrdu, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook asani ke liye
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};