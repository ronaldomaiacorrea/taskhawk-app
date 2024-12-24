import React from 'react';

interface SettingCardProps {
  icon: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingCard = ({
  icon,
  title,
  description,
  children,
}: SettingCardProps) => (
  <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-md border border-gray-100 dark:text-white dark:border-teal-950">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 rounded-xl bg-gray-100 text-gray-700">
        <i className={icon}></i>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-teal-400">
          {description}
        </p>
      </div>
    </div>
    {children}
  </div>
);

export default SettingCard;
