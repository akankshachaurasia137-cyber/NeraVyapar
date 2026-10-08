import { Flag, MapPin, Navigation, Timer, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import MapPanel from './MapPanel';
import RouteProgress from './RouteProgress';
import StatusBadge from './StatusBadge';

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs text-navy-500">{label}</p>
        <p className="text-sm font-medium text-navy-900">{value}</p>
      </div>
    </div>
  );
}

export default function TrackingCard({ trip }) {
  const { t } = useLanguage();
  return (
    <section className="card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-navy-900">
            {trip.origin} → {trip.destination}
          </h2>
          <p className="text-xs text-navy-400">
            {trip.id} · {trip.truck} · {trip.cargo}, {t('loads.tons', { n: trip.weightTons })}
          </p>
        </div>
        <StatusBadge status={trip.status} />
      </div>

      <div className="mt-5">
        <MapPanel progress={trip.progress} />
      </div>

      <div className="mt-5">
        <RouteProgress origin={trip.origin} destination={trip.destination} progress={trip.progress} stage={1} />
      </div>

      <div className="mt-5 grid gap-4 border-t border-navy-100 pt-4 sm:grid-cols-2 lg:grid-cols-3">
        <Fact icon={Navigation} label={t('trip.currentLocation')} value={trip.currentLocation} />
        <Fact icon={Truck} label={t('trip.pickup')} value={`${trip.origin} · ${trip.pickup}`} />
        <Fact icon={Flag} label={t('trip.destination')} value={trip.destination} />
        <Fact icon={MapPin} label={t('trip.distanceRemaining')} value={t('loads.km', { n: trip.distanceRemainingKm })} />
        <Fact icon={Timer} label={t('trip.eta')} value={trip.eta} />
        <Fact icon={Truck} label={t('trip.status')} value={t('trip.inTransit')} />
      </div>
    </section>
  );
}
