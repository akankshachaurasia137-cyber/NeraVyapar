import { Phone, Star } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { driver, truck } from '../data/driver';
import { trader } from '../data/trader';

export default function Profile({ role }) {
  const { t } = useLanguage();
  const isDriver = role === 'driver';

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <section className="card p-5 lg:col-span-2">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-lg font-semibold text-white">
            {(isDriver ? driver.name : trader.name).slice(0, 1)}
          </span>
          <div>
            <h2 className="text-lg font-semibold text-navy-900">{isDriver ? driver.fullName : trader.business}</h2>
            <p className="text-sm text-navy-500">{isDriver ? truck.number : `${trader.name} · ${trader.location}`}</p>
          </div>
        </div>

        <dl className="mt-5 grid gap-4 border-t border-navy-100 pt-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-navy-500">{t('profile.contact')}</dt>
            <dd className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900">
              <Phone className="h-3.5 w-3.5 text-navy-400" aria-hidden />
              {driver.phone}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-navy-500">{t('common.rating')}</dt>
            <dd className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900">
              <Star className="h-3.5 w-3.5 fill-warn text-warn" aria-hidden />
              {driver.rating}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-navy-500">{t('profile.completedTrips')}</dt>
            <dd className="mt-0.5 text-sm font-medium text-navy-900">{driver.trips}</dd>
          </div>
        </dl>
      </section>

      <section className="card h-fit p-5">
        <h2 className="text-sm font-semibold text-navy-900">{t('profile.language')}</h2>
        <div className="mt-3">
          <LanguageSelector variant="segmented" />
        </div>
      </section>
    </div>
  );
}
