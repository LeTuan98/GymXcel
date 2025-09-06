import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Dumbbell } from 'lucide-react';

const Footer: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-black/95 border-t border-gold/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Info */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Dumbbell className="h-6 w-6 text-gold" />
            <span className="text-lg font-bold gold-text">GymExcel</span>
            <span className="text-gray-400">- Premium Gym Management</span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Language:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('ja')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'ja' 
                    ? 'bg-gold text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                日本語
              </button>
              <span className="text-gray-600">/</span>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  language === 'vi' 
                    ? 'bg-gold text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <div className="flex flex-wrap justify-center space-x-6 mb-4">
            <a href="/faq" className="text-gray-400 hover:text-gold transition-colors text-sm">FAQ</a>
            <a href="/recipes" className="text-gray-400 hover:text-gold transition-colors text-sm">Recipes</a>
            <a href="/challenges" className="text-gray-400 hover:text-gold transition-colors text-sm">Challenges</a>
            <a href="/analytics" className="text-gray-400 hover:text-gold transition-colors text-sm">Analytics</a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 GymExcel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;