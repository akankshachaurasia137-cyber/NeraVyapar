import { Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { driver } from '../data/driver';
import { trader } from '../data/trader';
import { notifications } from '../data/driver';
import LanguageSelector from './LanguageSelector';

export default function Navbar({ role, titleKey, onMenu }) {
  const { t } = useLanguage();
  const person = role === 'driver' ? driver : trader;
  const unread = role === 'driver' ? notifications.filter((n) => n.unread).length : 1;

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-navy-100 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        className="-ml-1 rounded-md p-1.5 text-navy-600 hover:bg-navy-50 lg:hidden"
        aria-label={t('common.menu')}
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="min-w-0 flex-1 truncate text-[15px] font-semibold text-navy-900 sm:text-lg">{t(titleKey)}</h1>

      <div className="flex items-center gap-2 sm:gap-3">
        {role === 'driver' && (
          <span className="hidden items-center gap-1.5 rounded-full border border-ok/30 bg-ok-soft px-2.5 py-1 text-xs font-medium text-ok sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            {t('status.available')}
          </span>
        )}

        <Link
          to={role === 'driver' ? '/driver/notifications' : '/trader'}
          className="relative rounded-lg p-2 text-navy-600 hover:bg-navy-50"
          aria-label={t('nav.notifications')}
        >
          <Bell className="h-[18px] w-[18px]" />
          {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-white" />}
        </Link>

        <LanguageSelector />

        <Link
          to={`/${role}/profile`}
          className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-navy-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-white">
            {person.name.slice(0, 1)}
          </span>
          <span className="hidden text-sm font-medium text-navy-900 md:block">{person.name}</span>
        </Link>
      </div>
    </header>
  );
}
