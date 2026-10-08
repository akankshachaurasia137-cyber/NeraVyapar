import TrackingCard from '../../components/TrackingCard';
import { currentTrip } from '../../data/driver';

export default function Tracking() {
  return (
    <div className="max-w-4xl">
      <TrackingCard trip={currentTrip} />
    </div>
  );
}
