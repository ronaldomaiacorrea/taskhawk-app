import { useTranslations } from '@hooks/useTranslations';
import type { UserSettings } from '@shared/types';

interface ThemeSelectorProps {
  theme: UserSettings['theme'];
  onChangeTheme: (theme: UserSettings['theme']) => void;
}

const ThemeSelector = ({ theme, onChangeTheme }: ThemeSelectorProps) => {
  const { t } = useTranslations();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onChangeTheme('light')}
        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
          theme === 'dark'
            ? 'bg-zinc-900 border-1 border-teal-700 text-white hover:bg-zinc-800 hover:border-teal-900'
            : 'bg-indigo-50 text-black border-2 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-100'
        }`}
      >
        <div
          className={`p-2 rounded-lg ${
            theme === 'dark'
              ? 'bg-zinc-900 border-teal-900 text-white'
              : 'bg-indigo-100 text-black'
          }`}
        >
          <i className="pi pi-sun"></i>
        </div>
        <span className="font-medium">{t('common.lightMode')}</span>
      </button>
      <button
        type="button"
        onClick={() => onChangeTheme('dark')}
        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
          theme === 'dark'
            ? 'bg-zinc-800 border-2 border-gray-700 text-white'
            : 'bg-white text-black border-1 border-indigo-100  hover:border-indigo-300 hover:bg-indigo-100'
        }`}
      >
        <div
          className={`p-2 rounded-lg ${
            theme === 'dark'
              ? 'bg-zinc-900 border-teal-900 text-white'
              : 'bg-gray-100 text-black'
          }`}
        >
          <i className="pi pi-moon"></i>
        </div>
        <span className="font-medium">{t('common.darkMode')}</span>
      </button>
    </div>
  );
};

export default ThemeSelector;
