import { useState } from 'react';
import BookingsTable from '../../components/BookingsTable';
import { useLanguage } from '../../context/LanguageContext';
import { bookings } from '../../data/bookings';

export default function Bookings() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('All');
  const tabs = [
    ['All', t('book.all')],
    ['Confirmed', t('book.confirmed')],
    ['Held', t('book.held')],
    ['Completed', t('book.completed')],
    ['Cancelled', t('book.cancelled')],
  ];
  const rows = bookings
    .filter((b) => tab === 'All' || b.status === tab)
    .map((b) => ({ ...b, route: `${b.origin} → ${b.destination}` }));

  return (
    <div className="space-y-4">
      <div className="flex gap-1 overflow-x-auto rounded-lg bg-white p-1 ring-1 ring-navy-100" role="tablist">
        {tabs.map(([val, label]) => (
          <button
            key={val}
            type="button"
            role="tab"
            aria-selected={tab === val}
            onClick={() => setTab(val)}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ${
              tab === val ? 'bg-navy-900 text-white' : 'text-navy-500 hover:text-navy-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="card overflow-hidden">
        <BookingsTable rows={rows} />
      </div>
    </div>
  );
}
