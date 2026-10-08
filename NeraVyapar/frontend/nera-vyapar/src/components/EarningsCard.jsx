import { TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { inr } from '../utils';

export default function EarningsCard({ earnings }) {
  const { t } = useLanguage();
  const max = Math.max(...earnings.lastSevenTrips.map((x) => x.amount));
  const change = Math.round(((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100);

  return (
    <section className="card p-5">
      <h2 className="text-sm font-semibold text-navy-900">{t('earn.title')}</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs text-navy-500">{t('earn.thisMonth')}</p>
          <p className="mt-0.5 text-2xl font-semibold text-navy-900">{inr(earnings.thisMonth)}</p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-ok">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            {t('earn.vsLastMonth', { n: `+${change}` })}
          </p>
        </div>
        <div>
          <p className="text-xs text-navy-500">{t('earn.lastMonth')}</p>
          <p className="mt-0.5 text-2xl font-semibold text-navy-900">{inr(earnings.lastMonth)}</p>
        </div>
        <div>
          <p className="text-xs text-navy-500">{t('earn.returnLoad')}</p>
          <p className="mt-0.5 text-2xl font-semibold text-ok">{inr(earnings.returnLoadEarnings)}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium text-navy-500">{t('earn.lastSeven')}</p>
        <div className="mt-3 flex h-36 items-end gap-2 border-b border-navy-100 sm:gap-3" role="img" aria-label={t('earn.lastSeven')}>
          {earnings.lastSevenTrips.map((trip, i) => {
            const last = i === earnings.lastSevenTrips.length - 1;
            return (
              <div key={trip.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-[10px] font-medium text-navy-500 sm:text-xs">{(trip.amount / 1000).toFixed(1)}k</span>
                <div
                  className={`w-full rounded-t ${last ? 'bg-navy-900' : 'bg-navy-200'}`}
                  style={{ height: `${(trip.amount / max) * 78}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 flex gap-2 sm:gap-3">
          {earnings.lastSevenTrips.map((trip) => (
            <span key={trip.label} className="flex-1 text-center text-[11px] text-navy-400">
              {trip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
