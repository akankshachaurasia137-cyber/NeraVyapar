import { useLanguage } from '../context/LanguageContext';
import { inr } from '../utils';
import BookingCard from './BookingCard';
import StatusBadge from './StatusBadge';

/**
 * rows: [{ id, cargo, route: 'A → B', pickup, amount, status }]
 * Table on md+, stacked cards on mobile.
 */
export default function BookingsTable({ rows }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-navy-100 bg-navy-50/60">
            <tr>
              <th className="th">{t('book.load')}</th>
              <th className="th">{t('book.route')}</th>
              <th className="th">{t('book.pickup')}</th>
              <th className="th text-right">{t('book.amount')}</th>
              <th className="th">{t('book.status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-navy-50/50">
                <td className="px-4 py-3 font-medium text-navy-900">
                  {r.cargo}
                  <span className="block text-xs font-normal text-navy-400">{r.id}</span>
                </td>
                <td className="px-4 py-3 text-navy-600">{r.route}</td>
                <td className="px-4 py-3 text-navy-600">{r.pickup}</td>
                <td className="px-4 py-3 text-right font-medium text-navy-900">{inr(r.amount)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 p-3 md:hidden">
        {rows.map((r) => (
          <BookingCard key={r.id} row={r} />
        ))}
      </div>
    </>
  );
}
