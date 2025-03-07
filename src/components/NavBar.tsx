
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-10',
        isScrolled 
          ? 'py-4 bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-sm' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="text-xl font-semibold tracking-tight transition-all duration-300 hover:opacity-80"
        >
          Portfolio
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Projects', 'Skills', 'Achievements', 'Current Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>
        
        {/* Theme Toggle and Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium transition-all rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
          >
            Get In Touch
          </a>
        </div>
        
        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="flex items-center justify-center w-10 h-10 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-5">
              <span 
                className={cn(
                  "absolute w-full h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
                )}
              />
              <span 
                className={cn(
                  "absolute w-full h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "opacity-0" : "top-2 opacity-100"
                )}
              />
              <span 
                className={cn(
                  "absolute w-full h-0.5 bg-current transition-all duration-300",
                  isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"
                )}
              />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden pt-20",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {['Home', 'Projects', 'Skills', 'Achievements', 'Current Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xl font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-all rounded-full bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get In Touch
          </a>
        </nav>
      </div>
    </header>
  );
};
