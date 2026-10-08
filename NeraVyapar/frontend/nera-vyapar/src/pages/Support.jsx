import { MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Support() {
  const { t } = useLanguage();
  return (
    <section className="card max-w-xl p-5">
      <h2 className="text-base font-semibold text-navy-900">{t('support.title')}</h2>
      <p className="mt-1 text-sm text-navy-600">{t('support.body')}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <a href="tel:+911800000000" className="btn-primary">
          <Phone className="h-4 w-4" aria-hidden />
          {t('support.call')}
        </a>
        <a href="https://wa.me/911800000000" className="btn-secondary" target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden />
          {t('support.whatsapp')}
        </a>
      </div>
    </section>
  );
}
