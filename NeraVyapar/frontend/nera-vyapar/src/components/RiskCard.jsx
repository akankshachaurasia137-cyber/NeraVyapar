import { Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const levelStyle = {
  Low: 'bg-ok-soft text-ok',
  Medium: 'bg-warn-soft text-warn',
  High: 'bg-danger-soft text-danger',
};
const levelKey = { Low: 'risk.low', Medium: 'risk.medium', High: 'risk.high' };

export default function RiskCard({ risk }) {
  const { t } = useLanguage();
  const tone = risk.percent >= 66 ? 'text-danger' : risk.percent >= 33 ? 'text-warn' : 'text-ok';

  return (
    <section className="card flex h-full flex-col p-5">
      <h2 className="text-sm font-semibold text-navy-900">{t('risk.title')}</h2>

      <p className={`mt-3 text-4xl font-semibold leading-none ${tone}`}>{risk.percent}%</p>
      <p className="mt-2 text-sm text-navy-600">{t('risk.description')}</p>

      {/* horizontal risk indicator: low / medium / high zones */}
      <div className="mt-4" role="img" aria-label={`${risk.percent}%`}>
        <div className="relative h-2 rounded-full bg-gradient-to-r from-ok/70 via-warn/70 to-danger/80">
          <span
            className="absolute top-1/2 h-4 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-navy-900 ring-2 ring-white"
            style={{ left: `${risk.percent}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-navy-400">
          <span>{t('risk.low')}</span>
          <span>{t('risk.medium')}</span>
          <span>{t('risk.high')}</span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-navy-100 bg-navy-50 p-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-navy-900">
          <Lightbulb className="h-3.5 w-3.5 text-warn" aria-hidden />
          {t('risk.recommendedAction')}
        </p>
        <p className="mt-1 text-sm text-navy-600">{t('risk.action')}</p>
      </div>

      <h3 className="mt-4 text-xs font-semibold uppercase tracking-wide text-navy-400">{t('risk.why')}</h3>
      <ul className="mt-2 space-y-2">
        {risk.factors.map((f) => (
          <li key={f.key} className="flex items-start justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="font-medium text-navy-900">{t(`risk.${f.key}`)}</p>
              <p className="text-xs text-navy-500">{f.detail}</p>
            </div>
            <span className={`badge shrink-0 ${levelStyle[f.level]}`}>{t(levelKey[f.level])}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
