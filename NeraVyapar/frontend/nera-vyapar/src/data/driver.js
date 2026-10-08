export const driver = {
  name: 'Ravi',
  fullName: 'Ravi Kumar Patil',
  phone: '+91 98450 12345',
  rating: 4.7,
  trips: 312,
  status: 'Available',
  location: 'Hubballi',
};

export const truck = {
  number: 'KA25TRUCK001',
  type: 'Open Truck',
  capacityTons: 12,
  location: 'Hubballi',
  permit: 'National Permit',
  insuranceValid: '14 Mar 2027',
  fitnessValid: '02 Nov 2026',
  makeModel: 'Tata Signa 1923',
};

export const currentTrip = {
  id: 'TRP-20418',
  origin: 'Hubballi',
  destination: 'Bengaluru',
  truck: 'KA25TRUCK001',
  cargo: 'Onion',
  weightTons: 12,
  pickup: 'Today, 10:00 AM',
  earning: 18000,
  status: 'In Transit',
  progress: 38,
  distanceKm: 410,
  distanceRemainingKm: 254,
  eta: 'Today, 7:40 PM',
  currentLocation: 'Near Chitradurga, NH-48',
  stops: ['Pickup', 'In Transit', 'Destination'],
};

export const stats = {
  returnOpportunity: 18000,
  emptyReturnRisk: 77.5,
  availableLoads: 12,
  completedTrips: 24,
};

export const risk = {
  percent: 77.5,
  level: 'High',
  factors: [
    { key: 'lowAvailability', label: 'Low load availability', detail: 'Only 3 matching loads on Bengaluru → Hubballi today', level: 'High' },
    { key: 'routeDemand', label: 'Route demand', detail: 'Demand is 22% below the weekly average', level: 'Medium' },
    { key: 'history', label: 'Historical route performance', detail: '6 of your last 8 trips on this route returned empty', level: 'High' },
  ],
};

export const earnings = {
  thisMonth: 82500,
  lastMonth: 71200,
  returnLoadEarnings: 31500,
  lastSevenTrips: [
    { label: 'T1', amount: 9500 },
    { label: 'T2', amount: 14200 },
    { label: 'T3', amount: 11800 },
    { label: 'T4', amount: 16500 },
    { label: 'T5', amount: 12100 },
    { label: 'T6', amount: 18000 },
    { label: 'T7', amount: 15400 },
  ],
  history: [
    { id: 'PAY-9921', date: '06 Oct 2026', route: 'Belagavi → Pune', amount: 21500, type: 'Return load', status: 'Paid' },
    { id: 'PAY-9904', date: '03 Oct 2026', route: 'Hubballi → Hyderabad', amount: 24800, type: 'Outbound', status: 'Paid' },
    { id: 'PAY-9876', date: '29 Sep 2026', route: 'Hyderabad → Hubballi', amount: 15400, type: 'Return load', status: 'Paid' },
    { id: 'PAY-9850', date: '25 Sep 2026', route: 'Hubballi → Goa', amount: 12100, type: 'Outbound', status: 'Paid' },
    { id: 'PAY-9811', date: '21 Sep 2026', route: 'Goa → Hubballi', amount: 9500, type: 'Return load', status: 'Pending' },
  ],
};

export const notifications = [
  { id: 1, type: 'load', title: 'New load matches your route', body: 'Onion, 12 tons — Hubballi → Bengaluru at ₹18,000', time: '10 min ago', unread: true },
  { id: 2, type: 'warning', title: 'Hold expiring soon', body: 'Your hold on Potato (Hubballi → Pune) expires in 8 minutes', time: '22 min ago', unread: true },
  { id: 3, type: 'ok', title: 'Booking confirmed', body: 'TRP-20418 Onion, Hubballi → Bengaluru is confirmed', time: '2 hours ago', unread: false },
  { id: 4, type: 'ok', title: 'Payment received', body: '₹21,500 credited for Belagavi → Pune', time: 'Yesterday', unread: false },
  { id: 5, type: 'warning', title: 'Fitness certificate renewal', body: 'KA25TRUCK001 fitness certificate expires on 02 Nov 2026', time: '2 days ago', unread: false },
];
