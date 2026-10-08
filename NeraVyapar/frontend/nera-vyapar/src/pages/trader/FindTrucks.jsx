import { useMemo, useState } from 'react';
import HoldPanel from '../../components/HoldPanel';
import TruckCard from '../../components/TruckCard';
import { useHold } from '../../context/HoldContext';
import { useLanguage } from '../../context/LanguageContext';
import { cities, vehicleTypes } from '../../data/loads';
import { trucks } from '../../data/trader';

export default function FindTrucks() {
  const { t } = useLanguage();
  const { hold, confirmed } = useHold();
  const [city, setCity] = useState('');
  const [vehicle, setVehicle] = useState('Any');
  const activeTruck = [hold, confirmed].find((h) => h?.kind === 'truck');

  const list = useMemo(
    () =>
      trucks
        .filter((x) => (!city || x.location === city) && (vehicle === 'Any' || x.type === vehicle))
        .sort((a, b) => b.match - a.match),
    [city, vehicle],
  );

  return (
    <div className="space-y-5">
      <div className="card grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="ft-city">{t('truck.location')}</label>
          <select id="ft-city" className="input" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">{t('search.anywhere')}</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="ft-veh">{t('search.vehicleType')}</label>
          <select id="ft-veh" className="input" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            {vehicleTypes.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {activeTruck && <HoldPanel itemId={activeTruck.id} bookingsPath="/trader/bookings" />}

      {list.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((x) => (
            <TruckCard key={x.id} truck={x} />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center text-sm text-navy-500">{t('loads.noResults')}</div>
      )}
    </div>
  );
}
