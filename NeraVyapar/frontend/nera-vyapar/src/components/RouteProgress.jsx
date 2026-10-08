import { useLanguage } from '../context/LanguageContext';

/**
 * Horizontal route progress: Origin ───●──── Destination
 * with the Pickup → In Transit → Destination steps underneath.
 */
export default function RouteProgress({ origin, destination, progress = 0, stage = 1 }) {
  const { t } = useLanguage();
  const steps = [t('trip.pickupStep'), t('trip.transitStep'), t('trip.destinationStep')];
  const pct = Math.min(100, Math.max(0, progress));

  return (
    <div>
      <div className="flex items-center justify-between text-sm font-medium text-navy-900">
        <span>{origin}</span>
        <span>{destination}</span>
      </div>

      <div
        className="relative my-3 h-2 rounded-full bg-navy-100"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="absolute inset-y-0 left-0 rounded-full bg-ok" style={{ width: `${pct}%` }} />
        <span
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-navy-900 shadow"
          style={{ left: `${pct}%` }}
        />
      </div>

      <ol className="grid grid-cols-3 text-xs">
        {steps.map((s, i) => {
          const done = i <= stage;
          return (
            <li
              key={s}
              className={`flex items-center gap-1.5 ${i === 1 ? 'justify-center' : i === 2 ? 'justify-end' : ''} ${
                done ? 'font-medium text-navy-900' : 'text-navy-400'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-ok' : 'bg-navy-200'}`} />
              {s}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
