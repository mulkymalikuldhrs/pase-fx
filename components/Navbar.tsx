import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, BookOpen, Sun, Moon } from 'lucide-react';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedDarkMode = localStorage.getItem('pasefx_dark_mode');
    if (savedDarkMode !== null) {
      return savedDarkMode === 'true';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [currentHash, setCurrentHash] = useState(typeof window !== 'undefined' ? window.location.hash || '#/' : '#/');

  // Apply dark mode to document using data-theme attribute
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
    }
    localStorage.setItem('pasefx_dark_mode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Sinyal', path: '/sinyal' },
    { name: 'Metode', path: '/metode' },
    { name: 'Members', path: '/members' },
    { name: 'Tools', path: '/tools' },
    { name: 'Jurnal', path: '/jurnal', icon: BookOpen },
    { name: 'E-Book', path: '/ebook' },
  ];

  const checkActive = (path: string) => {
    const normalizedHash = currentHash.replace('#', '') || '/';
    return normalizedHash === path;
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'w-[95%] max-w-6xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-lg shadow-emerald-900/5 dark:shadow-emerald-900/20 rounded-2xl' 
          : 'w-[90%] max-w-5xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 shadow-md shadow-emerald-900/5 dark:shadow-emerald-900/10 rounded-full'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Dynamic Island Style */}
          <div className="flex items-center">
            <a href="#/" className="flex-shrink-0 flex items-center gap-2 group" aria-label="Pasè FX Home">
              <div className={`relative transition-all duration-300 ${scrolled ? 'h-8 w-8' : 'h-10 w-10'} rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-center border border-white/50 dark:border-slate-700/50 shadow-sm overflow-hidden`}>
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.logo-fallback-nav');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="logo-fallback-nav hidden absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                  Pè
                </div>
              </div>
              <span className={`font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
                {APP_NAME}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.path}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    checkActive(item.path)
                      ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                  aria-current={checkActive(item.path) ? 'page' : undefined}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon && <item.icon size={14} />}
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
            
            {/* Dark Mode Toggle - Desktop */}
            <button
              onClick={toggleDarkMode}
              className="ml-3 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-all"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button & Dark Mode Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Dark Mode Toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dynamic Island Expansion */}
      <div 
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100 border-t border-gray-100 dark:border-slate-700' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-b-2xl">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.path}`}
              onClick={handleNavClick}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                checkActive(item.path)
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
              aria-current={checkActive(item.path) ? 'page' : undefined}
              role="menuitem"
            >
              <span className="flex items-center gap-2">
                {item.icon && <item.icon size={16} />}
                {item.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
