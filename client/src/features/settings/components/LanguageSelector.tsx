import type { Language } from '@shared/types';
import { Button } from 'primereact/button';
import { languages } from 'src/lib/constants/languages';

interface LanguageSelectorProps {
  value: Language;
  onChangeLanguage: (value: Language) => void;
}

const LanguageSelector = ({
  value,
  onChangeLanguage,
}: LanguageSelectorProps) => (
  <div className="flex flex-col gap-4">
    {languages.map((language) => (
      <div key={language.value} className="flex-1">
        <Button
          onClick={() => onChangeLanguage(language.value as Language)}
          className={`w-full border-0 flex items-center justify-between p-4 rounded-xl transition-all ${
            value === language.value
              ? 'bg-indigo-200 text-blue-700 dark:bg-zinc-700 dark:hover:bg-zinc-800 hover:bg-indigo-300'
              : 'bg-white dark:hover:bg-zinc-800 dark:bg-zinc-900 hover:bg-indigo-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-medium text-black dark:text-white">
              {language.label}
            </span>
          </div>
          {value === language.value && (
            <div className="px-3 py-1 rounded-full text-sm bg-blue-100 text-indigo-700">
              Active
            </div>
          )}
        </Button>
      </div>
    ))}
  </div>
);

export default LanguageSelector;
