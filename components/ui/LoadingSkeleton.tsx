import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'chart' | 'button';
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
export const CardSkeleton: React.FC = () => (
  <div className="glass-card p-6 animate-pulse">
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
export const TableRowSkeleton: React.FC<{ columns: number }> = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }, (_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />
      </td>
    ))}
  </tr>
);

// Widget skeleton for TradingView widgets
export const WidgetSkeleton: React.FC = () => (
  <div className="glass-card p-4 animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-32" />
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-16" />
    </div>
    <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-lg" />
  </div>
);

// Calculator input skeleton
export const CalculatorInputSkeleton: React.FC = () => (
  <div className="space-y-2 animate-pulse">
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-24" />
    <div className="h-12 bg-gray-200 dark:bg-slate-700 rounded-lg" />
  </div>
);

export default LoadingSkeleton;
