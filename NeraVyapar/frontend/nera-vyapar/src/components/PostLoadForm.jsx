import { Search } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cargoTypes, cities, vehicleTypes } from '../data/loads';

const initial = {
  pickup: 'Hubballi',
  destination: 'Bengaluru',
  cargo: 'Onion',
  weight: 12,
  date: '',
  vehicle: 'Open Truck',
  price: 18000,
};

export default function PostLoadForm({ onSubmit }) {
  const { t } = useLanguage();
  const [v, setV] = useState(initial);
  const set = (key) => (e) => setV((s) => ({ ...s, [key]: e.target.value }));

  return (
    <form
      className="card p-4 sm:p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(v);
      }}
    >
      <h2 className="text-base font-semibold text-navy-900">{t('trader.postLoad')}</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="label" htmlFor="pl-pickup">{t('trader.pickupCity')}</label>
          <select id="pl-pickup" className="input" value={v.pickup} onChange={set('pickup')}>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pl-dest">{t('trader.destination')}</label>
          <select id="pl-dest" className="input" value={v.destination} onChange={set('destination')}>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pl-cargo">{t('trader.cargo')}</label>
          <select id="pl-cargo" className="input" value={v.cargo} onChange={set('cargo')}>
            {cargoTypes.filter((c) => c !== 'Any').map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pl-weight">{t('trader.weight')}</label>
          <input id="pl-weight" type="number" min="1" max="40" className="input" value={v.weight} onChange={set('weight')} />
        </div>
        <div>
          <label className="label" htmlFor="pl-date">{t('trader.pickupDate')}</label>
          <input id="pl-date" type="date" className="input" value={v.date} onChange={set('date')} />
        </div>
        <div>
          <label className="label" htmlFor="pl-veh">{t('trader.vehicleType')}</label>
          <select id="pl-veh" className="input" value={v.vehicle} onChange={set('vehicle')}>
            {vehicleTypes.filter((c) => c !== 'Any').map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="pl-price">{t('trader.offeredPrice')}</label>
          <input id="pl-price" type="number" min="0" step="500" className="input" value={v.price} onChange={set('price')} />
        </div>
        <div className="flex items-end">
          <button type="submit" className="btn-primary w-full">
            <Search className="h-4 w-4" aria-hidden />
            {t('trader.findTrucks')}
          </button>
        </div>
      </div>
    </form>
  );
}
