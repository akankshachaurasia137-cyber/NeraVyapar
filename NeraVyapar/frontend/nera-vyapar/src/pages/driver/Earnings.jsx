import EarningsCard from '../../components/EarningsCard';
import StatusBadge from '../../components/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';
import { earnings } from '../../data/driver';
import { inr } from '../../utils';

export default function Earnings() {
  const { t } = useLanguage();
  return (
    <div className="space-y-5">
      <EarningsCard earnings={earnings} />

      <section>
        <h2 className="mb-3 text-base font-semibold text-navy-900">{t('earn.history')}</h2>
        <div className="card overflow-hidden">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-b border-navy-100 bg-navy-50/60">
                <tr>
                  <th className="th">{t('trader.date')}</th>
                  <th className="th">{t('book.route')}</th>
                  <th className="th">{t('book.load')}</th>
                  <th className="th text-right">{t('book.amount')}</th>
                  <th className="th">{t('book.status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {earnings.history.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-navy-600">{p.date}</td>
                    <td className="px-4 py-3 font-medium text-navy-900">{p.route}</td>
                    <td className="px-4 py-3 text-navy-600">{p.type}</td>
                    <td className="px-4 py-3 text-right font-medium text-navy-900">{inr(p.amount)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 p-3 md:hidden">
            {earnings.history.map((p) => (
              <article key={p.id} className="rounded-lg border border-navy-100 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-navy-900">{p.route}</p>
                  <StatusBadge status={p.status} />
                </div>
                <div className="mt-1 flex justify-between text-xs text-navy-500">
                  <span>
                    {p.date} · {p.type}
                  </span>
                  <span className="text-sm font-semibold text-navy-900">{inr(p.amount)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
