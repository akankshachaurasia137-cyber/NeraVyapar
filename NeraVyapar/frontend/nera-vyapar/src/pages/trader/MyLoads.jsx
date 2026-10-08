import { ArrowRight } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';
import { traderLoads } from '../../data/trader';
import { inr } from '../../utils';

export default function MyLoads() {
  const { t } = useLanguage();
  return (
    <div className="card overflow-hidden">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="border-b border-navy-100 bg-navy-50/60">
            <tr>
              <th className="th">{t('book.load')}</th>
              <th className="th">{t('book.route')}</th>
              <th className="th">{t('trip.weight')}</th>
              <th className="th">{t('book.pickup')}</th>
              <th className="th text-right">{t('book.amount')}</th>
              <th className="th">{t('book.status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {traderLoads.map((l) => (
              <tr key={l.id} className="hover:bg-navy-50/50">
                <td className="px-4 py-3 font-medium text-navy-900">
                  {l.cargo}
                  <span className="block text-xs font-normal text-navy-400">{l.id}</span>
                </td>
                <td className="px-4 py-3 text-navy-600">
                  {l.origin} → {l.destination}
                </td>
                <td className="px-4 py-3 text-navy-600">{t('loads.tons', { n: l.weightTons })}</td>
                <td className="px-4 py-3 text-navy-600">{l.pickup}</td>
                <td className="px-4 py-3 text-right font-medium text-navy-900">{inr(l.price)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={l.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 p-3 md:hidden">
        {traderLoads.map((l) => (
          <article key={l.id} className="rounded-lg border border-navy-100 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-navy-900">{l.cargo}</p>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-navy-600">
                  {l.origin}
                  <ArrowRight className="h-3.5 w-3.5 text-navy-400" aria-hidden />
                  {l.destination}
                </p>
              </div>
              <StatusBadge status={l.status} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-navy-500">
              <span>
                {l.pickup} · {t('loads.tons', { n: l.weightTons })}
              </span>
              <span className="text-sm font-semibold text-navy-900">{inr(l.price)}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
