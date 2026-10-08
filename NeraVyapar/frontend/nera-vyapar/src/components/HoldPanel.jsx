import { CheckCircle2, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHold } from '../context/HoldContext';
import { useLanguage } from '../context/LanguageContext';
import HoldTimer from './HoldTimer';

/**
 * Booking panel for the active hold. Shows nothing unless the hold (or the
 * confirmation) belongs to `itemId`. Handles hold → confirm / cancel.
 */
export default function HoldPanel({ itemId, bookingsPath }) {
  const { hold, confirmed, notice, cancelHold, confirmHold, dismissNotice } = useHold();
  const { t } = useLanguage();

  const isHeld = hold && hold.id === itemId;
  const isConfirmed = confirmed && confirmed.id === itemId;
  const isTruck = (hold || confirmed)?.kind === 'truck';

  return (
    <div className="space-y-3">
      {notice && (
        <div className="flex items-start gap-2 rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p className="flex-1">
            {notice.type === 'expired' ? t('hold.expired') : t('hold.releasedPrevious', { load: notice.label })}
          </p>
          <button type="button" onClick={dismissNotice} className="text-xs font-medium underline">
            {t('common.close')}
          </button>
        </div>
      )}

      {isHeld && (
        <section className="card border-navy-300 p-5" aria-label={t('hold.reserved')}>
          <div className="flex items-center gap-2 text-sm font-semibold text-navy-900">
            <ShieldCheck className="h-4 w-4 text-ok" aria-hidden />
            {isTruck ? t('hold.truckReserved') : t('hold.reserved')}
          </div>
          <p className="mt-1 text-xs text-navy-500">{hold.label}</p>
          <p className="mt-4 text-sm text-navy-500">{isTruck ? t('hold.truckHeldFor') : t('hold.heldFor')}</p>
          <div className="mt-1">
            <HoldTimer />
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button type="button" className="btn-ok" onClick={confirmHold}>
              {t('hold.confirm')}
            </button>
            <button type="button" className="btn-secondary" onClick={cancelHold}>
              {t('hold.cancel')}
            </button>
          </div>
        </section>
      )}

      {isConfirmed && (
        <section className="card border-ok/40 bg-ok-soft/50 p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-ok">
            <CheckCircle2 className="h-5 w-5" aria-hidden />
            {t('hold.confirmedTitle')}
          </div>
          <p className="mt-1 text-sm text-navy-600">{t('hold.confirmedBody')}</p>
          {bookingsPath && (
            <Link to={bookingsPath} className="btn-secondary mt-4">
              {t('quick.myBookings')}
            </Link>
          )}
        </section>
      )}
    </div>
  );
}
