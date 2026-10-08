import { Boxes, CheckCircle2, IndianRupee, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingsTable from '../../components/BookingsTable';
import PostLoadAndTrucks from '../../components/PostLoadAndTrucks';
import Section from '../../components/Section';
import StatCard from '../../components/StatCard';
import { useLanguage } from '../../context/LanguageContext';
import { traderBookings, traderStats } from '../../data/trader';
import { inr } from '../../utils';

export default function TraderDashboard() {
  const { t } = useLanguage();
  const rows = traderBookings.map((b) => ({ ...b }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Boxes} label={t('stats.activeLoads')} value={traderStats.activeLoads} sub={t('stats.awaitingTrucks')} tone="warn" />
        <StatCard icon={Truck} label={t('stats.availableTrucks')} value={traderStats.availableTrucks} sub={t('stats.nearYourLoads')} />
        <StatCard icon={CheckCircle2} label={t('stats.confirmedShipments')} value={traderStats.confirmedShipments} sub={t('stats.inTransitToday')} tone="ok" />
        <StatCard icon={IndianRupee} label={t('stats.monthlySpending')} value={inr(traderStats.monthlySpending)} sub={t('stats.freightPaid')} />
      </div>

      <PostLoadAndTrucks />

      <Section
        title={t('trader.recentBookings')}
        flush
        action={
          <Link to="/trader/bookings" className="text-sm font-medium text-navy-700 hover:text-navy-900 hover:underline">
            {t('book.viewAll')} →
          </Link>
        }
      >
        <BookingsTable rows={rows} />
      </Section>
    </div>
  );
}
