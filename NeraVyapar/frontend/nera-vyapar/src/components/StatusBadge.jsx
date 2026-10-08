import { useLanguage } from '../context/LanguageContext';
import { statusStyles } from '../utils';

const labelKeys = {
  Confirmed: 'book.confirmed',
  Held: 'book.held',
  Completed: 'book.completed',
  Cancelled: 'book.cancelled',
  Paid: 'common.paid',
  Pending: 'common.pending',
  'Truck Assigned': 'trader.truckAssigned',
  'Finding Truck': 'trader.findingTruck',
  Draft: 'trader.draft',
  'In Transit': 'trip.inTransit',
};

export default function StatusBadge({ status }) {
  const { t } = useLanguage();
  return (
    <span className={`badge whitespace-nowrap ${statusStyles[status] || 'bg-navy-100 text-navy-600'}`}>
      {labelKeys[status] ? t(labelKeys[status]) : status}
    </span>
  );
}
