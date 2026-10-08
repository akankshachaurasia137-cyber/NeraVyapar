import BookingsTable from '../../components/BookingsTable';
import { traderBookings } from '../../data/trader';

export default function TraderBookings() {
  return (
    <div className="card overflow-hidden">
      <BookingsTable rows={traderBookings} />
    </div>
  );
}
