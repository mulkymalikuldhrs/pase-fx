import React, { useEffect, ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const FadeIn: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className={`animate-fade-in-up ${className}`}
      role="main"
    >
      {children}
    </div>
  );
};

export const SlideIn: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className={`animate-slide-in-right ${className}`}
      role="main"
    >
      {children}
    </div>
  );
};

// Stagger animation for lists
export const StaggerContainer: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`space-y-4 ${className}`}>
    {children}
  </div>
);

export const StaggerItem: React.FC<{ children: ReactNode; index?: number }> = ({ 
  children, 
  index = 0 
}) => (
  <div 
    className="animate-fade-in-up" 
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {children}
  </div>
);

// Page wrapper with scroll to top
export const PageWrapper: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className={className}>
      {children}
    </main>
  );
};

export default PageWrapper;
