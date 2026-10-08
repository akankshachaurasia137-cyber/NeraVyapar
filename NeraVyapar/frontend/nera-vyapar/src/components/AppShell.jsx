import { useCallback, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import HoldBanner from './HoldBanner';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { navConfig, titleKeyFor } from './navConfig';

export default function AppShell({ role }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const close = useCallback(() => setOpen(false), []);
  const bottomItems = navConfig[role].slice(0, 4);

  return (
    <div className="min-h-full bg-surface">
      <Sidebar role={role} open={open} onClose={close} />

      <div className="flex min-h-full flex-col lg:pl-60">
        <Navbar role={role} titleKey={titleKeyFor(role, pathname)} onMenu={() => setOpen(true)} />
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-5 pb-24 sm:px-6 md:pb-8">
          <HoldBanner role={role} />
          <Outlet />
        </main>
      </div>

      {/* mobile bottom navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-navy-100 bg-white md:hidden"
        aria-label="Primary"
      >
        {bottomItems.map(({ to, key, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-1 py-2 text-[11px] ${
                isActive ? 'font-semibold text-navy-900' : 'text-navy-400'
              }`
            }
          >
            <Icon className="h-5 w-5" aria-hidden />
            <span className="max-w-full truncate">{t(key)}</span>
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center gap-0.5 px-1 py-2 text-[11px] text-navy-400"
        >
          <Menu className="h-5 w-5" aria-hidden />
          <span>{t('nav.more')}</span>
        </button>
      </nav>
    </div>
  );
}
