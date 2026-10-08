const tones = {
  neutral: { icon: 'bg-navy-100 text-navy-600', sub: 'text-navy-400' },
  ok: { icon: 'bg-ok-soft text-ok', sub: 'text-ok' },
  warn: { icon: 'bg-warn-soft text-warn', sub: 'text-warn' },
  danger: { icon: 'bg-danger-soft text-danger', sub: 'text-danger' },
};

export default function StatCard({ icon: Icon, label, value, sub, tone = 'neutral' }) {
  const c = tones[tone] || tones.neutral;
  return (
    <div className="card flex items-start gap-3 p-4">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${c.icon}`}>
        {Icon && <Icon className="h-[18px] w-[18px]" aria-hidden />}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-navy-500">{label}</p>
        <p className="mt-0.5 text-xl font-semibold leading-tight text-navy-900">{value}</p>
        {sub && <p className={`mt-0.5 text-xs ${c.sub}`}>{sub}</p>}
      </div>
    </div>
  );
}
