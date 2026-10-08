import { Headset, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrackingCard from '../../components/TrackingCard';
import { useLanguage } from '../../context/LanguageContext';
import { currentTrip, risk } from '../../data/driver';
import { inr } from '../../utils';

export default function ActiveTrip() {
  const { t } = useLanguage();
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <TrackingCard trip={currentTrip} />
      </div>

      <div className="space-y-4">
        <section className="card p-5">
          <p className="text-xs text-navy-500">{t('trip.expectedEarning')}</p>
          <p className="mt-0.5 text-2xl font-semibold text-ok">{inr(currentTrip.earning)}</p>
          <div className="mt-4 grid gap-2">
            <button type="button" className="btn-secondary">
              <Headset className="h-4 w-4" aria-hidden />
              {t('trip.contactShipper')}
            </button>
            <button type="button" className="btn-secondary">
              <TriangleAlert className="h-4 w-4" aria-hidden />
              {t('trip.reportIssue')}
            </button>
          </div>
        </section>

        <section className="card border-warn/30 bg-warn-soft/50 p-5">
          <p className="text-sm font-semibold text-navy-900">
            {t('risk.title')}: <span className="text-danger">{risk.percent}%</span>
          </p>
          <p className="mt-1 text-sm text-navy-600">{t('risk.action')}</p>
          <Link to="/driver/loads" className="btn-primary mt-4 w-full">
            {t('welcome.findReturnLoad')}
          </Link>
        </section>
      </div>
    </div>
  );
}
