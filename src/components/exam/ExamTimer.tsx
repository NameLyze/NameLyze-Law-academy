import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';

interface ExamTimerProps {
  duration: number; // in minutes
  startTime: Date;
  onTimeUp: () => void;
}

export const ExamTimer: React.FC<ExamTimerProps> = ({
  duration,
  startTime,
  onTimeUp,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // convert to seconds

  useEffect(() => {
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
    
    const interval = setInterval(() => {
      const now = new Date();
      const remaining = Math.floor((endTime.getTime() - now.getTime()) / 1000);
      
      if (remaining <= 0) {
        clearInterval(interval);
        setTimeRemaining(0);
        onTimeUp();
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, startTime, onTimeUp]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const isLowTime = timeRemaining < 300; // Less than 5 minutes
  const isCritical = timeRemaining < 60; // Less than 1 minute

  return (
    <Card className={`sticky top-4 ${isCritical ? 'bg-red-50 border-red-500' : isLowTime ? 'bg-yellow-50 border-yellow-500' : ''}`}>
      <div className="text-center">
        <p className="text-sm font-medium text-gray-600 mb-2">Time Remaining</p>
        <div className={`text-4xl font-bold font-mono ${isCritical ? 'text-red-600' : isLowTime ? 'text-yellow-600' : 'text-primary-600'}`}>
          {hours > 0 && `${hours.toString().padStart(2, '0')}:`}
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>
        {isLowTime && (
          <p className={`mt-2 text-sm font-medium ${isCritical ? 'text-red-600' : 'text-yellow-600'}`}>
            {isCritical ? '⚠️ Time almost up!' : '⏰ Less than 5 minutes left'}
          </p>
        )}
      </div>
    </Card>
  );
};
