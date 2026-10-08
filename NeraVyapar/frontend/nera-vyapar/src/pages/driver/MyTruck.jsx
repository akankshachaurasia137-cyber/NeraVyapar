import { FileCheck2, MapPin, Truck } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { useLanguage } from '../../context/LanguageContext';
import { truck } from '../../data/driver';

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <dt className="text-navy-500">{label}</dt>
      <dd className={`text-right font-medium text-navy-900 ${mono ? 'font-mono tracking-wide' : ''}`}>{value}</dd>
    </div>
  );
}

export default function MyTruck() {
  const { t } = useLanguage();
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard icon={Truck} label={t('truck.number')} value={<span className="font-mono text-lg">{truck.number}</span>} sub={truck.type} />
        <StatCard icon={FileCheck2} label={t('truck.capacity')} value={t('truck.capacityValue', { n: truck.capacityTons })} sub={truck.permit} tone="ok" />
        <StatCard icon={MapPin} label={t('truck.location')} value={truck.location} sub={t('status.available')} tone="ok" />
      </div>

      <section className="card p-5">
        <h2 className="text-base font-semibold text-navy-900">{t('truck.details')}</h2>
        <dl className="mt-2 divide-y divide-navy-100">
          <Row label={t('truck.number')} value={truck.number} mono />
          <Row label={t('truck.type')} value={truck.type} />
          <Row label={t('truck.model')} value={truck.makeModel} />
          <Row label={t('truck.capacity')} value={t('truck.capacityValue', { n: truck.capacityTons })} />
          <Row label={t('truck.permit')} value={truck.permit} />
          <Row label={t('truck.insurance')} value={truck.insuranceValid} />
          <Row label={t('truck.fitness')} value={truck.fitnessValid} />
        </dl>
      </section>
    </div>
  );
}
