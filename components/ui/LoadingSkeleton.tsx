import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'chart' | 'button' | 'image' | 'input';
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'text', 
  count = 1,
  className = '' 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-slate-700 rounded';
  
  const variantClasses = {
    card: 'h-48 w-full rounded-xl',
    text: 'h-4 w-full',
    avatar: 'h-10 w-10 rounded-full',
    chart: 'h-64 w-full rounded-xl',
    button: 'h-10 w-24 rounded-lg',
    image: 'h-48 w-full rounded-xl',
    input: 'h-12 w-full rounded-lg',
  };

  const renderSkeleton = (index: number) => (
    <div
      key={index}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="Loading content"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <div className="space-y-2">
      {Array.from({ length: count }, (_, i) => renderSkeleton(i))}
    </div>
  );
};

// Card skeleton with multiple elements
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`glass-card p-6 animate-pulse ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <div className="h-12 w-12 bg-gray-200 dark:bg-slate-700 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-4/6" />
    </div>
  </div>
);

// Table row skeleton
export const TableRowSkeleton: React.FC<{ columns?: number; className?: string }> = ({ columns = 4, className = '' }) => (
  <tr className={`animate-pulse ${className}`}>
    {Array.from({ length: columns }, (_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />
      </td>
    ))}
  </tr>
);

// Widget skeleton for TradingView widgets
export const WidgetSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`glass-card p-4 animate-pulse ${className}`}>
    <div className="flex justify-between items-center mb-4">
      <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-32" />
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-16" />
    </div>
    <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-lg" />
  </div>
);

// Calculator input skeleton
export const CalculatorInputSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`space-y-2 animate-pulse ${className}`}>
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24" />
    <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-lg" />
  </div>
);

// Page loading skeleton - full page loading state
export const PageSkeleton: React.FC = () => (
  <div className="animate-pulse">
    {/* Header skeleton */}
    <div className="h-16 bg-gray-200 dark:bg-slate-700 mb-8" />
    
    {/* Hero section skeleton */}
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded w-2/3 mb-4" />
      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-8" />
      
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 dark:bg-slate-700 rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

// Section skeleton for various sections
export const SectionSkeleton: React.FC<{ hasTitle?: boolean }> = ({ hasTitle = true }) => (
  <div className="animate-pulse space-y-4">
    {hasTitle && (
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 bg-gray-200 dark:bg-slate-700 rounded w-48" />
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-20" />
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-32 bg-gray-200 dark:bg-slate-700 rounded-xl" />
      ))}
    </div>
  </div>
);

// Signal card skeleton
export const SignalCardSkeleton: React.FC = () => (
  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-gray-200 dark:bg-slate-700 rounded-lg" />
        <div>
          <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-20 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-14" />
        </div>
      </div>
      <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-16" />
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-4/5" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/5" />
    </div>
  </div>
);

// News card skeleton
export const NewsCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700 animate-pulse">
    <div className="flex items-center gap-2 mb-3">
      <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
    </div>
    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-full mb-3" />
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-4/5 mb-4" />
    <div className="flex items-center gap-4">
      <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
    </div>
  </div>
);

// Broker card skeleton
export const BrokerCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="h-16 w-16 bg-gray-200 dark:bg-slate-700 rounded-xl" />
      <div className="flex-1">
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6" />
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-4/6" />
    </div>
    <div className="flex gap-2">
      <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
      <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
    </div>
  </div>
);

// Education card skeleton
export const EducationCardSkeleton: React.FC = () => (
  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 animate-pulse">
    <div className="flex items-center gap-2 mb-3">
      <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
    </div>
    <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/5" />
  </div>
);

// Stats card skeleton
export const StatsCardSkeleton: React.FC = () => (
  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-12 mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24" />
  </div>
);

// Feature card skeleton
export const FeatureCardSkeleton: React.FC = () => (
  <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 animate-pulse">
    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-slate-700 mb-4" />
    <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-2/3 mb-2" />
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
  </div>
);

// Loading spinner component
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full h-full w-full border-2 border-emerald-500 border-t-transparent" />
    </div>
  );
};

// Full page loading overlay
export const PageLoadingOverlay: React.FC<{ message?: string }> = ({ message = 'Memuat...' }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <LoadingSpinner size="lg" className="mb-4" />
    <p className="text-gray-500 dark:text-gray-400">{message}</p>
  </div>
);

// Inline loading indicator
export const InlineLoading: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    <span className="text-sm text-gray-500">Memuat...</span>
  </div>
);

export default LoadingSkeleton;
