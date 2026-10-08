import { ArrowRight, CalendarClock, Check, Star, Truck, Weight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHold } from '../context/HoldContext';
import { useLanguage } from '../context/LanguageContext';
import { inr, matchTone } from '../utils';

export default function LoadCard({ load }) {
  const { t } = useLanguage();
  const { hold, startHold } = useHold();
  const held = hold?.id === load.id;

  return (
    <article className="card flex flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="flex flex-wrap items-center gap-x-2 text-base font-semibold text-navy-900">
            {load.origin}
            <ArrowRight className="h-4 w-4 text-navy-400" aria-hidden />
            {load.destination}
          </h3>
          <p className="mt-0.5 text-xs text-navy-400">{load.id}</p>
        </div>
        <span className={`badge shrink-0 ${matchTone(load.match)}`} title={t('loads.matchScore')}>
          {t('loads.match', { n: load.match })}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-600">
        <span className="font-medium text-navy-900">{load.cargo}</span>
        <span className="inline-flex items-center gap-1">
          <Weight className="h-3.5 w-3.5 text-navy-400" aria-hidden />
          {t('loads.tons', { n: load.weightTons })}
        </span>
        <span>{t('loads.km', { n: load.distanceKm })}</span>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3 border-t border-navy-100 pt-3">
        <div>
          <p className="text-xs text-navy-500">{t('loads.price')}</p>
          <p className="text-xl font-semibold text-navy-900">{inr(load.price)}</p>
        </div>
        <div className="text-right text-xs text-navy-500">
          <p className="inline-flex items-center gap-1">
            <CalendarClock className="h-3.5 w-3.5" aria-hidden />
            {t('loads.pickup')}
          </p>
          <p className="mt-0.5 text-sm font-medium text-navy-900">
            {load.pickupDate} • {load.pickupTime}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-500">
        <span className="inline-flex items-center gap-1">
          <Truck className="h-3.5 w-3.5" aria-hidden />
          {load.vehicle}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warn text-warn" aria-hidden />
          {load.trust.rating} · {load.trust.name}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link to={`/driver/loads/${load.id}`} className="btn-secondary">
          {t('loads.viewDetails')}
        </Link>
        <button
          type="button"
          className={held ? 'btn-secondary border-ok text-ok' : 'btn-primary'}
          onClick={() => startHold('load', load.id, `${load.cargo} (${load.origin} → ${load.destination})`)}
          aria-pressed={held}
        >
          {held ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              {t('loads.held')}
            </>
          ) : (
            t('loads.hold')
          )}
        </button>
      </div>
    </article>
  );
}
