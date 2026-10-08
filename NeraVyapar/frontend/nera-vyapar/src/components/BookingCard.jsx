import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { inr } from '../utils';
import StatusBadge from './StatusBadge';

/** Mobile card version of one booking row. */
export default function BookingCard({ row }) {
  const { t } = useLanguage();
  return (
    <article className="rounded-lg border border-navy-100 bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy-900">{row.cargo}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-1 text-sm text-navy-600">
            {row.route.split(' → ').map((part, i, arr) => (
              <span key={part} className="inline-flex items-center gap-1">
                {part}
                {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-navy-400" aria-hidden />}
              </span>
            ))}
          </p>
        </div>
        <StatusBadge status={row.status} />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-navy-500">
        <span>
          {t('book.pickup')}: <span className="font-medium text-navy-900">{row.pickup}</span>
        </span>
        <span className="text-sm font-semibold text-navy-900">{inr(row.amount)}</span>
      </div>
    </article>
  );
}
