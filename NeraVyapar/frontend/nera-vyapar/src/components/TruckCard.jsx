import { Check, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useHold } from '../context/HoldContext';
import { useLanguage } from '../context/LanguageContext';
import { inr, matchTone } from '../utils';

export default function TruckCard({ truck }) {
  const { t } = useLanguage();
  const { hold, startHold } = useHold();
  const held = hold?.id === truck.id;

  return (
    <article className="card flex flex-col p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-mono text-base font-semibold tracking-wide text-navy-900">{truck.number}</h3>
          <p className="mt-0.5 text-sm text-navy-500">
            {truck.type} · {t('truck.capacityValue', { n: truck.capacityTons })}
          </p>
        </div>
        <span className={`badge shrink-0 ${matchTone(truck.match)}`} title={t('loads.matchScore')}>
          {t('loads.match', { n: truck.match })}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-xs text-navy-500">{t('truck.location')}</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 font-medium text-navy-900">
            <MapPin className="h-3.5 w-3.5 text-navy-400" aria-hidden />
            {truck.location}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-navy-500">{t('truck.driver')}</dt>
          <dd className="mt-0.5 font-medium text-navy-900">{truck.driver}</dd>
        </div>
        <div>
          <dt className="text-xs text-navy-500">{t('truck.rating')}</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 font-medium text-navy-900">
            <Star className="h-3.5 w-3.5 fill-warn text-warn" aria-hidden />
            {truck.rating}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-navy-500">{t('truck.trust')}</dt>
          <dd className="mt-0.5 inline-flex items-center gap-1 font-medium text-navy-900">
            <ShieldCheck className="h-3.5 w-3.5 text-ok" aria-hidden />
            {truck.trust}/100
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex items-end justify-between border-t border-navy-100 pt-3">
        <div>
          <p className="text-xs text-navy-500">{t('truck.estimatedPrice')}</p>
          <p className="text-xl font-semibold text-navy-900">{inr(truck.price)}</p>
        </div>
      </div>

      <button
        type="button"
        className={`mt-4 ${held ? 'btn-secondary border-ok text-ok' : 'btn-primary'}`}
        onClick={() => startHold('truck', truck.id, `${truck.number} (${truck.type})`)}
        aria-pressed={held}
      >
        {held ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            {t('loads.held')}
          </>
        ) : (
          t('hold.holdTruck')
        )}
      </button>
    </article>
  );
}
