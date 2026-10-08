import { Globe } from 'lucide-react';
import { LANGUAGES } from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';

/**
 * variant="dropdown": compact select for the top navbar.
 * variant="segmented": three-way toggle for the sidebar / profile.
 */
export default function LanguageSelector({ variant = 'dropdown', dark = false }) {
  const { lang, setLang } = useLanguage();

  if (variant === 'segmented') {
    return (
      <div
        role="group"
        aria-label="Language"
        className={`grid grid-cols-3 gap-1 rounded-lg p-1 ${dark ? 'bg-white/5' : 'bg-navy-50'}`}
      >
        {LANGUAGES.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              aria-pressed={active}
              className={`rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? dark
                    ? 'bg-white text-navy-900'
                    : 'bg-white text-navy-900 shadow-card'
                  : dark
                    ? 'text-navy-200 hover:bg-white/10'
                    : 'text-navy-500 hover:text-navy-900'
              }`}
            >
              {l.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <Globe className="pointer-events-none absolute left-2.5 hidden h-4 w-4 text-navy-400 sm:block" aria-hidden />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="h-9 appearance-none rounded-lg border border-navy-200 bg-white py-0 pl-2.5 pr-6 text-sm sm:pl-8 sm:pr-7 text-navy-900 hover:bg-navy-50 focus:border-navy-500 focus:outline-none"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute right-2 h-3 w-3 sm:right-2.5 text-navy-400" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
