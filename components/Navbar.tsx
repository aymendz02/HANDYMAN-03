
import React from 'react';

interface NavbarProps {
  isLoggedIn: boolean;
  userName?: string;
  activeTab: string;
  onNavChange: (tab: 'home' | 'services' | 'pricing' | 'dashboard') => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, userName, activeTab, onNavChange, onLogin, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer group" onClick={() => onNavChange('home')}>
            <span className="text-3xl group-hover:scale-125 transition-all duration-300">🏠</span>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-blue-400 to-indigo-400 group-hover:from-blue-300 group-hover:to-indigo-300 transition-all">
              Handyman الجزائر
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10 space-x-reverse">
            <button 
              onClick={() => onNavChange('home')}
              className={`text-lg font-bold transition-all relative py-2 ${activeTab === 'home' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              الرئيسية
              {activeTab === 'home' && <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-full"></span>}
            </button>
            <button 
              onClick={() => onNavChange('services')}
              className={`text-lg font-bold transition-all relative py-2 ${activeTab === 'services' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              خدماتنا
              {activeTab === 'services' && <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-full"></span>}
            </button>
            <button 
              onClick={() => onNavChange('pricing')}
              className={`text-lg font-bold transition-all relative py-2 ${activeTab === 'pricing' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
            >
              الباقات
              {activeTab === 'pricing' && <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-full"></span>}
            </button>
            {isLoggedIn && (
              <button 
                onClick={() => onNavChange('dashboard')}
                className={`text-lg font-bold transition-all relative py-2 ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-slate-400 hover:text-white'}`}
              >
                لوحة التحكم
                {activeTab === 'dashboard' && <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400 rounded-full"></span>}
              </button>
            )}
          </div>

          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-4 space-x-reverse bg-slate-800/50 px-4 py-2 rounded-2xl border border-white/5 shadow-inner group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {userName ? userName.charAt(0) : 'U'}
                  </div>
                  <span className="hidden sm:inline text-base font-bold text-slate-200">{userName || 'مستخدم'}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-slate-500 hover:text-red-400 font-bold transition-colors text-sm"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-blue-600 text-white px-8 py-2.5 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
              >
                دخول
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
