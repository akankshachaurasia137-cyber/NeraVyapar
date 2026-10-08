import { useHold } from '../context/HoldContext';
import { useLanguage } from '../context/LanguageContext';
import { trucks } from '../data/trader';
import HoldPanel from './HoldPanel';
import PostLoadForm from './PostLoadForm';
import Section from './Section';
import TruckCard from './TruckCard';

/** Post a Load form + Recommended Trucks (shared by the trader dashboard and Post Load page). */
export default function PostLoadAndTrucks() {
  const { t } = useLanguage();
  const { hold, confirmed } = useHold();
  const activeTruck = [hold, confirmed].find((h) => h?.kind === 'truck');

  return (
    <div className="space-y-6">
      <PostLoadForm />

      {activeTruck && <HoldPanel itemId={activeTruck.id} bookingsPath="/trader/bookings" />}

      <Section title={t('trader.recommendedTrucks')} subtitle={t('trader.trucksSubtitle')}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trucks.map((truck) => (
            <TruckCard key={truck.id} truck={truck} />
          ))}
        </div>
      </Section>
    </div>
  );
}
