import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cargoTypes, cities, vehicleTypes } from '../data/loads';

export default function SearchForm({ values, onChange, onSubmit }) {
  const { t } = useLanguage();
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <form
      className="card p-4 sm:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="label" htmlFor="sf-loc">{t('search.currentLocation')}</label>
          <select id="sf-loc" className="input" value={values.location} onChange={set('location')}>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sf-dest">{t('search.destination')}</label>
          <select id="sf-dest" className="input" value={values.destination} onChange={set('destination')}>
            <option value="">{t('search.anywhere')}</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sf-cargo">{t('search.cargoType')}</label>
          <select id="sf-cargo" className="input" value={values.cargo} onChange={set('cargo')}>
            {cargoTypes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sf-cap">{t('search.capacity')}</label>
          <input id="sf-cap" type="number" min="1" max="40" className="input" value={values.capacity} onChange={set('capacity')} />
        </div>
        <div>
          <label className="label" htmlFor="sf-date">{t('search.pickupDate')}</label>
          <input id="sf-date" type="date" className="input" value={values.date} onChange={set('date')} />
        </div>
        <div>
          <label className="label" htmlFor="sf-veh">{t('search.vehicleType')}</label>
          <select id="sf-veh" className="input" value={values.vehicle} onChange={set('vehicle')}>
            {vehicleTypes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Search className="h-4 w-4" aria-hidden />
          {t('search.searchLoads')}
        </button>
      </div>
    </form>
  );
}
