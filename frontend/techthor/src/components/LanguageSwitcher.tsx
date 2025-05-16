import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Sprachcode -> Flaggen-URL (Ländercode)
const flagMap: Record<string, string> = {
  de: 'de',
  en: 'us',
  pt: 'br',
};

const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
];

const getFlagUrl = (code: string) => {
  const countryCode = flagMap[code];
  return `https://flagcdn.com/w40/${countryCode}.png`;
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(prev => !prev);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  const normalizedLang = languages.find(
    lang => i18n.language === lang.code || i18n.language.startsWith(lang.code)
  ) || languages[0];

  return (
    <div className="relative inline-block text-left ml-6">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <img src={getFlagUrl(normalizedLang.code)} alt={normalizedLang.code} className="w-5 h-4 mr-2" />
        {normalizedLang.code.toUpperCase()}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                  i18n.language === code || i18n.language.startsWith(code)
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                <img src={getFlagUrl(code)} alt={code} className="w-5 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
