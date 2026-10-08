import { ArrowLeft, ArrowRight, Check, ShieldCheck, Star, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import HoldPanel from '../../components/HoldPanel';
import { useHold } from '../../context/HoldContext';
import { useLanguage } from '../../context/LanguageContext';
import { loads } from '../../data/loads';
import { inr, matchTone } from '../../utils';

function Field({ label, children }) {
  return (
    <div>
      <dt className="text-xs text-navy-500">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium text-navy-900">{children}</dd>
    </div>
  );
}

function FairPriceBar({ min, max, price }) {
  // scale the bar around the fair range with some padding on both sides
  const lo = min - (max - min) * 0.6;
  const hi = max + (max - min) * 0.6;
  const pos = (v) => `${Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100))}%`;
  const inRange = price >= min && price <= max;

  return (
    <div className="mt-3">
      <div className="relative h-2 rounded-full bg-navy-100">
        <div
          className="absolute inset-y-0 rounded-full bg-ok/40"
          style={{ left: pos(min), width: `calc(${pos(max)} - ${pos(min)})` }}
        />
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${
            inRange ? 'bg-ok' : 'bg-warn'
          } shadow`}
          style={{ left: pos(price) }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-navy-500">
        <span>{inr(min)}</span>
        <span>{inr(max)}</span>
      </div>
    </div>
  );
}

export default function LoadDetails() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { hold, confirmed, startHold } = useHold();
  const load = loads.find((l) => l.id === id);

  if (!load) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm text-navy-600">{t('detail.notFound')}</p>
        <Link to="/driver/loads" className="btn-secondary mt-4">
          {t('detail.back')}
        </Link>
      </div>
    );
  }

  const heldHere = hold?.id === load.id;
  const confirmedHere = confirmed?.id === load.id;
  const holdingOther = hold && hold.id !== load.id;
  const net = load.price - load.fuelCost;

  return (
    <div className="space-y-5">
      <Link to="/driver/loads" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {t('detail.back')}
      </Link>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {/* route + cargo */}
          <section className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-navy-400">{load.id}</p>
                <h2 className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xl font-semibold text-navy-900">
                  {load.origin}
                  <ArrowRight className="h-5 w-5 text-navy-400" aria-hidden />
                  {load.destination}
                </h2>
              </div>
              <span className={`badge ${matchTone(load.match)}`}>
                {t('loads.matchScore')}: {load.match}%
              </span>
            </div>

            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wide text-navy-400">{t('detail.cargoDetails')}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
              <Field label={t('detail.cargo')}>{load.cargo}</Field>
              <Field label={t('detail.weight')}>{t('loads.tons', { n: load.weightTons })}</Field>
              <Field label={t('detail.distance')}>{t('loads.km', { n: load.distanceKm })}</Field>
              <Field label={t('detail.pickupLocation')}>{load.originPlace}</Field>
              <Field label={t('detail.destination')}>{load.destinationPlace}</Field>
              <Field label={t('detail.pickupTime')}>
                {load.pickupDate} • {load.pickupTime}
              </Field>
              <Field label={t('loads.vehicle')}>{load.vehicle}</Field>
              <Field label={t('detail.fuelCost')}>{inr(load.fuelCost)}</Field>
              <Field label={t('detail.netEstimate')}>
                <span className="text-ok">{inr(net)}</span>
              </Field>
            </dl>
          </section>

          {/* pricing */}
          <section className="card p-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-navy-500">{t('detail.offeredPrice')}</p>
                <p className="mt-0.5 text-3xl font-semibold text-navy-900">{inr(load.price)}</p>
              </div>
              <div>
                <p className="text-xs text-navy-500">{t('detail.fairPrice')}</p>
                <p className="mt-0.5 text-lg font-semibold text-navy-900">
                  {inr(load.fairPrice.min)} – {inr(load.fairPrice.max)}
                </p>
              </div>
            </div>
            <FairPriceBar min={load.fairPrice.min} max={load.fairPrice.max} price={load.price} />
          </section>

          {/* why it matches */}
          <section className="card p-5">
            <h3 className="text-sm font-semibold text-navy-900">{t('detail.whyMatches')}</h3>
            <ul className="mt-3 space-y-2">
              {load.reasons.map((r) => (
                <li key={r.text} className="flex items-start gap-2.5 text-sm text-navy-700">
                  {r.ok ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-warn" aria-hidden />
                  )}
                  {r.text}
                </li>
              ))}
            </ul>
          </section>

          {/* trust */}
          <section className="card p-5">
            <h3 className="text-sm font-semibold text-navy-900">{t('detail.trust')}</h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-white">
                {load.trust.name.slice(0, 1)}
              </span>
              <div>
                <p className="text-sm font-medium text-navy-900">{load.trust.name}</p>
                <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-navy-500">
                  <Star className="h-3.5 w-3.5 fill-warn text-warn" aria-hidden />
                  {load.trust.rating}
                </p>
              </div>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-navy-600 sm:grid-cols-3">
              {load.trust.verified && (
                <li className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-ok" aria-hidden />
                  {t('detail.verified')}
                </li>
              )}
              <li>{t('detail.deals', { n: load.trust.deals })}</li>
              <li>{t('detail.onTime', { n: load.trust.paymentOnTime })}</li>
            </ul>
          </section>
        </div>

        {/* booking panel */}
        <aside className="space-y-3 lg:sticky lg:top-20 lg:h-fit">
          <HoldPanel itemId={load.id} bookingsPath="/driver/bookings" />

          {!heldHere && !confirmedHere && (
            <div className="card p-5">
              <p className="text-sm text-navy-500">{t('detail.offeredPrice')}</p>
              <p className="text-2xl font-semibold text-navy-900">{inr(load.price)}</p>
              <button
                type="button"
                className="btn-primary mt-4 w-full"
                onClick={() => startHold('load', load.id, `${load.cargo} (${load.origin} → ${load.destination})`)}
              >
                {t('detail.holdFor30')}
              </button>
              <Link to="/driver/loads" className="btn-secondary mt-2 w-full">
                {t('detail.back')}
              </Link>
              {holdingOther && (
                <p className="mt-3 text-xs text-navy-500">{t('hold.willRelease', { load: hold.label })}</p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
