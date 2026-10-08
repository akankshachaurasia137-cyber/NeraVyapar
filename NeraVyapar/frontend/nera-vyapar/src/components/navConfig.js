import {
  Bell,
  Boxes,
  ClipboardList,
  IndianRupee,
  LayoutDashboard,
  MapPinned,
  PackagePlus,
  PackageSearch,
  Route,
  Truck,
  UserRound,
  Wallet,
} from 'lucide-react';

export const navConfig = {
  driver: [
    { to: '/driver', key: 'nav.dashboard', icon: LayoutDashboard, end: true },
    { to: '/driver/loads', key: 'nav.findLoads', icon: PackageSearch },
    { to: '/driver/truck', key: 'nav.myTruck', icon: Truck },
    { to: '/driver/trip', key: 'nav.activeTrip', icon: Route },
    { to: '/driver/bookings', key: 'nav.bookings', icon: ClipboardList },
    { to: '/driver/earnings', key: 'nav.earnings', icon: IndianRupee },
    { to: '/driver/notifications', key: 'nav.notifications', icon: Bell },
    { to: '/driver/profile', key: 'nav.profile', icon: UserRound },
  ],
  trader: [
    { to: '/trader', key: 'nav.dashboard', icon: LayoutDashboard, end: true },
    { to: '/trader/post', key: 'nav.postLoad', icon: PackagePlus },
    { to: '/trader/loads', key: 'nav.myLoads', icon: Boxes },
    { to: '/trader/trucks', key: 'nav.findTrucks', icon: Truck },
    { to: '/trader/bookings', key: 'nav.bookings', icon: ClipboardList },
    { to: '/trader/tracking', key: 'nav.tracking', icon: MapPinned },
    { to: '/trader/payments', key: 'nav.payments', icon: Wallet },
    { to: '/trader/profile', key: 'nav.profile', icon: UserRound },
  ],
};

/** Pick the page title translation key for a pathname. */
export function titleKeyFor(role, pathname) {
  const clean = pathname.replace(/\/+$/, '');
  if (role === 'driver') {
    if (clean === '/driver') return 'title.driverDashboard';
    if (/^\/driver\/loads\/.+/.test(clean)) return 'title.loadDetails';
    if (clean === '/driver/loads') return 'title.findLoads';
    if (clean === '/driver/truck') return 'title.myTruck';
    if (clean === '/driver/trip') return 'title.activeTrip';
    if (clean === '/driver/bookings') return 'title.bookings';
    if (clean === '/driver/earnings') return 'title.earnings';
    if (clean === '/driver/notifications') return 'title.notifications';
    if (clean === '/driver/profile') return 'title.profile';
    if (clean === '/driver/support') return 'nav.help';
  } else {
    if (clean === '/trader') return 'title.traderDashboard';
    if (clean === '/trader/post') return 'title.postLoad';
    if (clean === '/trader/loads') return 'title.myLoads';
    if (clean === '/trader/trucks') return 'title.findTrucks';
    if (clean === '/trader/bookings') return 'title.bookings';
    if (clean === '/trader/tracking') return 'title.tracking';
    if (clean === '/trader/payments') return 'title.payments';
    if (clean === '/trader/profile') return 'title.profile';
    if (clean === '/trader/support') return 'nav.help';
  }
  return role === 'driver' ? 'title.driverDashboard' : 'title.traderDashboard';
}
