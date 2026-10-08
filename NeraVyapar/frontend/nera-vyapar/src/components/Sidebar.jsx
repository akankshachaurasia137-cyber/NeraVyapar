import { LifeBuoy, LogOut, X } from 'lucide-react';
import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import Logo from './Logo';
import { navConfig } from './navConfig';

function SidebarContent({ role, onNavigate }) {
  const { t } = useLanguage();
  const items = navConfig[role];

  return (
    <div className="flex h-full flex-col bg-navy-900 text-navy-200">
      <div className="px-4 pb-3 pt-4">
        <Link to={`/${role}`} onClick={onNavigate} aria-label="Nera Vyapar">
          <Logo />
        </Link>
      </div>

      {/* role switch */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-white/5 p-1" role="group" aria-label="Role">
          {['driver', 'trader'].map((r) => (
            <Link
              key={r}
              to={`/${r}`}
              onClick={onNavigate}
              className={`rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                r === role ? 'bg-white text-navy-900' : 'text-navy-200 hover:bg-white/10'
              }`}
            >
              {t(`role.${r}`)}
            </Link>
          ))}
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-2" aria-label="Main">
        {items.map(({ to, key, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-brand-orange bg-white/10 font-medium text-white'
                  : 'border-transparent text-navy-200 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
            <span className="min-w-0 leading-snug">{t(key)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-white/10 p-3">
        <NavLink
          to={`/${role}/support`}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <LifeBuoy className="h-[18px] w-[18px] shrink-0" aria-hidden />
          {t('nav.help')}
        </NavLink>

        <LanguageSelector variant="segmented" dark />

        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-200 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden />
          {t('nav.logout')}
        </Link>
      </div>
    </div>
  );
}

/** Fixed sidebar on lg+, slide-over drawer below that. */
export default function Sidebar({ role, open, onClose }) {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 lg:block">
        <SidebarContent role={role} />
      </aside>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy-900/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-64 max-w-[85%] transition-transform duration-200 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 z-10 rounded-md p-1.5 text-navy-200 hover:bg-white/10"
            aria-label={t('common.close')}
          >
            <X className="h-5 w-5" />
          </button>
          <SidebarContent role={role} onNavigate={onClose} />
        </aside>
      </div>
    </>
  );
}
