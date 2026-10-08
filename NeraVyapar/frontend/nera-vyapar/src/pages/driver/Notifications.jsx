import { Bell, CheckCircle2, PackageSearch, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { notifications as seed } from '../../data/driver';

const icons = { load: PackageSearch, warning: TriangleAlert, ok: CheckCircle2 };
const tones = { load: 'bg-navy-100 text-navy-600', warning: 'bg-warn-soft text-warn', ok: 'bg-ok-soft text-ok' };

export default function Notifications() {
  const { t } = useLanguage();
  const [items, setItems] = useState(seed);

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm font-medium text-navy-600 hover:text-navy-900 hover:underline"
          onClick={() => setItems((list) => list.map((n) => ({ ...n, unread: false })))}
        >
          {t('notif.markAll')}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 p-10 text-sm text-navy-500">
          <Bell className="h-6 w-6" aria-hidden />
          {t('notif.none')}
        </div>
      ) : (
        <ul className="card divide-y divide-navy-100 overflow-hidden">
          {items.map((n) => {
            const Icon = icons[n.type] || Bell;
            return (
              <li key={n.id} className={`flex items-start gap-3 p-4 ${n.unread ? 'bg-navy-50/60' : ''}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tones[n.type]}`}>
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy-900">{n.title}</p>
                  <p className="mt-0.5 text-sm text-navy-600">{n.body}</p>
                  <p className="mt-1 text-xs text-navy-400">{n.time}</p>
                </div>
                {n.unread && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-danger" aria-label="unread" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
