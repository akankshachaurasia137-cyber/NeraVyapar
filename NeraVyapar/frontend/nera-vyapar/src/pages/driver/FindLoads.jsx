import { SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import LoadCard from '../../components/LoadCard';
import SearchForm from '../../components/SearchForm';
import { useLanguage } from '../../context/LanguageContext';
import { loads } from '../../data/loads';
import { vehicleTypes } from '../../data/loads';
import { inr } from '../../utils';

const nearby = {
  Hubballi: ['Hubballi', 'Dharwad', 'Belagavi'],
  Dharwad: ['Dharwad', 'Hubballi', 'Belagavi'],
  Belagavi: ['Belagavi', 'Dharwad', 'Hubballi'],
};

const defaultSearch = { location: 'Hubballi', destination: '', cargo: 'Any', capacity: 12, date: '', vehicle: 'Any' };
const defaultFilters = { maxDistance: 800, minPrice: 0, pickup: 'any', minMatch: 0, vehicle: 'Any', sort: 'match' };

export default function FindLoads() {
  const { t } = useLanguage();
  const [form, setForm] = useState(defaultSearch);
  const [applied, setApplied] = useState(defaultSearch);
  const [filters, setFilters] = useState(defaultFilters);
  const setF = (key) => (e) => {
    const v = e.target.type === 'range' ? Number(e.target.value) : e.target.value;
    setFilters((f) => ({ ...f, [key]: v }));
  };

  const results = useMemo(() => {
    const origins = nearby[applied.location] || [applied.location];
    const list = loads.filter((l) => {
      if (!origins.includes(l.origin)) return false;
      if (applied.destination && l.destination !== applied.destination) return false;
      if (applied.cargo !== 'Any' && l.cargo !== applied.cargo) return false;
      if (applied.capacity && l.weightTons > Number(applied.capacity)) return false;
      if (applied.vehicle !== 'Any' && l.vehicle !== applied.vehicle) return false;
      if (l.distanceKm > filters.maxDistance) return false;
      if (l.price < filters.minPrice) return false;
      if (l.match < filters.minMatch) return false;
      if (filters.vehicle !== 'Any' && l.vehicle !== filters.vehicle) return false;
      if (filters.pickup === 'today' && l.pickupSort !== 1) return false;
      if (filters.pickup === 'tomorrow' && l.pickupSort !== 2) return false;
      return true;
    });
    const sorters = {
      match: (a, b) => b.match - a.match,
      price: (a, b) => b.price - a.price,
      distance: (a, b) => a.distanceKm - b.distanceKm,
      pickup: (a, b) => a.pickupSort - b.pickupSort,
    };
    return [...list].sort(sorters[filters.sort]);
  }, [applied, filters]);

  return (
    <div className="space-y-5">
      <SearchForm values={form} onChange={setForm} onSubmit={setApplied} />

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        {/* filters */}
        <aside className="card h-fit p-4">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-navy-900">
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              {t('search.filters')}
            </h2>
            <button
              type="button"
              className="text-xs font-medium text-navy-500 hover:text-navy-900 hover:underline"
              onClick={() => setFilters(defaultFilters)}
            >
              {t('search.reset')}
            </button>
          </div>

          <div className="mt-4 space-y-5">
            <div>
              <label className="label" htmlFor="f-dist">
                {t('search.maxDistance')}: <span className="text-navy-900">{filters.maxDistance} km</span>
              </label>
              <input id="f-dist" type="range" min="100" max="800" step="50" value={filters.maxDistance} onChange={setF('maxDistance')} className="w-full accent-navy-900" />
            </div>

            <div>
              <label className="label" htmlFor="f-price">
                {t('search.minPrice')}: <span className="text-navy-900">{inr(filters.minPrice)}</span>
              </label>
              <input id="f-price" type="range" min="0" max="40000" step="2500" value={filters.minPrice} onChange={setF('minPrice')} className="w-full accent-navy-900" />
            </div>

            <div>
              <p className="label">{t('search.pickupTime')}</p>
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-navy-50 p-1">
                {[
                  ['any', t('search.anyTime')],
                  ['today', t('search.today')],
                  ['tomorrow', t('search.tomorrow')],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setFilters((f) => ({ ...f, pickup: val }))}
                    aria-pressed={filters.pickup === val}
                    className={`rounded-md px-1 py-1.5 text-xs font-medium ${
                      filters.pickup === val ? 'bg-white text-navy-900 shadow-card' : 'text-navy-500 hover:text-navy-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label" htmlFor="f-match">
                {t('search.minMatch')}: <span className="text-navy-900">{filters.minMatch}%</span>
              </label>
              <input id="f-match" type="range" min="0" max="90" step="5" value={filters.minMatch} onChange={setF('minMatch')} className="w-full accent-navy-900" />
            </div>

            <div>
              <label className="label" htmlFor="f-veh">{t('search.vehicleType')}</label>
              <select id="f-veh" className="input" value={filters.vehicle} onChange={setF('vehicle')}>
                {vehicleTypes.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* results */}
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-navy-900">{t('loads.results', { n: results.length })}</p>
            <label className="flex items-center gap-2 text-sm text-navy-500">
              {t('loads.sortBy')}
              <select className="input w-auto py-1.5" value={filters.sort} onChange={setF('sort')}>
                <option value="match">{t('loads.sort.match')}</option>
                <option value="price">{t('loads.sort.price')}</option>
                <option value="distance">{t('loads.sort.distance')}</option>
                <option value="pickup">{t('loads.sort.pickup')}</option>
              </select>
            </label>
          </div>

          {results.length ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {results.map((l) => (
                <LoadCard key={l.id} load={l} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center text-sm text-navy-500">{t('loads.noResults')}</div>
          )}
        </section>
      </div>
    </div>
  );
}
