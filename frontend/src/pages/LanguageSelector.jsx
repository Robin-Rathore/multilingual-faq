import React, { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

const LanguageSelector = () => {
  const [selectedLanguages, setSelectedLanguages] = useState(['en']);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' }
  ];

  const toggleLanguage = (code) => {
    setSelectedLanguages(prev => 
      prev.includes(code) 
        ? prev.filter(lang => lang !== code)
        : [...prev, code]
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Select Languages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {languages.map((lang) => (
          <div 
            key={lang.code}
            onClick={() => toggleLanguage(lang.code)}
            className={`
              p-4 border rounded-lg cursor-pointer transition 
              ${selectedLanguages.includes(lang.code) 
                ? 'bg-primary/10 border-primary' 
                : 'hover:bg-gray-50'}
            `}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{lang.flag}</span>
                <span className="font-semibold">{lang.name}</span>
              </div>
              {selectedLanguages.includes(lang.code) && (
                <CheckIcon className="h-6 w-6 text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LanguageSelector;