import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = true,
  hover = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-gray-900',
        padding && 'p-6',
        hover && 'hover:shadow-xl transition-all duration-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={clsx('mb-4 pb-4 border-b border-gray-200', className)}>{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <h3 className={clsx('text-xl font-semibold text-gray-900', className)}>{children}</h3>;
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <div className={clsx(className)}>{children}</div>;
};
