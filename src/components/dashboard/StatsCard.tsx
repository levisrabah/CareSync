import React from 'react';
import { Card, CardContent } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  suffix,
  className = ''
}) => {
  return (
    <Card className={`${className}`}>
      <CardContent className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline mt-1">
            <p className="text-2xl font-semibold text-gray-900">{value}{suffix}</p>
            {change && (
              <span className={`ml-2 text-sm font-medium ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {change.isPositive ? '↑' : '↓'} {change.value}%
              </span>
            )}
          </div>
        </div>
        <div className="p-2 bg-teal-50 rounded-lg">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};