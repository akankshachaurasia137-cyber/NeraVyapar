import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import Profile from './pages/Profile';
import Support from './pages/Support';
import ActiveTrip from './pages/driver/ActiveTrip';
import Bookings from './pages/driver/Bookings';
import DriverDashboard from './pages/driver/DriverDashboard';
import Earnings from './pages/driver/Earnings';
import FindLoads from './pages/driver/FindLoads';
import LoadDetails from './pages/driver/LoadDetails';
import MyTruck from './pages/driver/MyTruck';
import Notifications from './pages/driver/Notifications';
import FindTrucks from './pages/trader/FindTrucks';
import MyLoads from './pages/trader/MyLoads';
import Payments from './pages/trader/Payments';
import PostLoad from './pages/trader/PostLoad';
import Tracking from './pages/trader/Tracking';
import TraderBookings from './pages/trader/TraderBookings';
import TraderDashboard from './pages/trader/TraderDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/driver" replace />} />

      <Route path="/driver" element={<AppShell role="driver" />}>
        <Route index element={<DriverDashboard />} />
        <Route path="loads" element={<FindLoads />} />
        <Route path="loads/:id" element={<LoadDetails />} />
        <Route path="truck" element={<MyTruck />} />
        <Route path="trip" element={<ActiveTrip />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile role="driver" />} />
        <Route path="support" element={<Support />} />
      </Route>

      <Route path="/trader" element={<AppShell role="trader" />}>
        <Route index element={<TraderDashboard />} />
        <Route path="post" element={<PostLoad />} />
        <Route path="loads" element={<MyLoads />} />
        <Route path="trucks" element={<FindTrucks />} />
        <Route path="bookings" element={<TraderBookings />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="payments" element={<Payments />} />
        <Route path="profile" element={<Profile role="trader" />} />
        <Route path="support" element={<Support />} />
      </Route>

      <Route path="*" element={<Navigate to="/driver" replace />} />
    </Routes>
  );
}
