import { CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useHold } from '../context/HoldContext';
import { useLanguage } from '../context/LanguageContext';
import HoldTimer from './HoldTimer';

/**
 * Slim reminder under the navbar while a hold is running, so the timer stays
 * visible on every page. Hidden on pages that show the full HoldPanel.
 */
export default function HoldBanner({ role }) {
  const { hold, confirmed, cancelHold, confirmHold, dismissConfirmed } = useHold();
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const onDetailPage = /^\/driver\/loads\/.+/.test(pathname) || /^\/trader(\/post|\/trucks)?\/?$/.test(pathname);
  if (onDetailPage) return null;

  if (hold) {
    return (
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-navy-200 bg-white px-4 py-2.5">
        <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0 text-ok" aria-hidden />
          <span className="truncate">
            <span className="font-medium text-navy-900">
              {hold.kind === 'truck' ? t('hold.truckReserved') : t('hold.reserved')}
            </span>
            <span className="text-navy-500"> · {hold.label}</span>
          </span>
        </div>
        <HoldTimer size="sm" />
        <div className="flex gap-2">
          <button type="button" className="btn-ok px-3 py-1.5" onClick={confirmHold}>
            {t('hold.confirm')}
          </button>
          <button type="button" className="btn-secondary px-3 py-1.5" onClick={cancelHold}>
            {t('hold.cancel')}
          </button>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-ok/40 bg-ok-soft px-4 py-2.5 text-sm">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-ok" aria-hidden />
        <span className="flex-1 text-navy-900">
          <span className="font-medium">{t('hold.confirmedTitle')}</span>
          <span className="text-navy-600"> · {confirmed.label}</span>
        </span>
        <Link to={`/${role}/bookings`} className="text-xs font-medium text-ok underline">
          {t('quick.myBookings')}
        </Link>
        <button type="button" onClick={dismissConfirmed} aria-label={t('common.close')} className="text-navy-400 hover:text-navy-900">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return null;
}
