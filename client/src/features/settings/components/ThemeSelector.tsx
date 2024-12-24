interface ThemeSelectorProps {
  darkMode: boolean;
  changeTheme: (darkMode: boolean) => void;
}

const themes = [
  { value: false, icon: 'pi pi-sun', label: 'Light' },
  { value: true, icon: 'pi pi-moon', label: 'Dark' },
];

const ThemeSelector = ({ darkMode, changeTheme }: ThemeSelectorProps) => (
  <div className="grid grid-cols-2 gap-4">
    {themes.map((theme) => (
      <button
        key={theme.label}
        type="button"
        onClick={() => changeTheme(theme.value)}
        className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
          darkMode === theme.value
            ? 'bg-indigo-50 border-2 border-indigo-700 text-indigo-900'
            : 'bg-white text-black border-2 border-gray-100 hover:border-gray-200'
        }`}
      >
        <div
          className={`p-2 rounded-lg ${
            darkMode === theme.value ? 'bg-indigo-100' : 'bg-gray-100'
          }`}
        >
          <i className={theme.icon}></i>
        </div>
        <span className="font-medium">{theme.label}</span>
      </button>
    ))}
  </div>
);

export default ThemeSelector;
