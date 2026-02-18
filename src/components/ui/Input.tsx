import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <div className={clsx(fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm',
          error ? 'border-red-500 bg-red-50' : 'border-gray-200',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 ml-1 text-xs font-bold text-red-600 uppercase tracking-wider">{error}</p>
      )}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <div className={clsx(fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <textarea
        className={clsx(
          'px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm resize-vertical min-h-[100px]',
          error ? 'border-red-500 bg-red-50' : 'border-gray-200',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 ml-1 text-xs font-bold text-red-600 uppercase tracking-wider">{error}</p>
      )}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  fullWidth = false,
  options,
  className,
  ...props
}) => {
  return (
    <div className={clsx(fullWidth && 'w-full')}>
      {label && (
        <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <select
        className={clsx(
          'px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm appearance-none',
          error ? 'border-red-500 bg-red-50' : 'border-gray-200',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 ml-1 text-xs font-bold text-red-600 uppercase tracking-wider">{error}</p>
      )}
    </div>
  );
};
