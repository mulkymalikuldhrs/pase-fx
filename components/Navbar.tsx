import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { APP_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState(typeof window !== 'undefined' ? window.location.hash || '#/' : '#/');

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

  return (
    <nav 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'w-[95%] max-w-6xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl' 
          : 'w-[90%] max-w-5xl bg-slate-900/70 backdrop-blur-lg border border-slate-800/50 shadow-xl rounded-full'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Dynamic Island Style */}
          <div className="flex items-center">
            <a href="#/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className={`transition-all duration-300 ${scrolled ? 'h-8 w-8' : 'h-9 w-9'} rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/50`}>
                <span className="text-white font-bold text-sm">Pè</span>
              </div>
              <span className={`font-bold tracking-tight text-white transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
                {APP_NAME}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.path}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    checkActive(item.path)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon && <item.icon size={14} />}
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dynamic Island Expansion */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.path}`}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                checkActive(item.path)
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
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
