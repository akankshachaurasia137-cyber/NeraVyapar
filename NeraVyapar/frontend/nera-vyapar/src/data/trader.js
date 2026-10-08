export const trader = {
  name: 'Suresh',
  business: 'Shree Ganesh Traders',
  location: 'Hubballi',
};

export const traderStats = {
  activeLoads: 5,
  availableTrucks: 18,
  confirmedShipments: 9,
  monthlySpending: 246500,
};

export const trucks = [
  { id: 'TK-101', number: 'KA25AB4821', type: 'Open Truck', capacityTons: 12, location: 'Hubballi', driver: 'Ravi Patil', rating: 4.7, trust: 92, price: 18500, match: 91, trips: 312 },
  { id: 'TK-102', number: 'KA22C7710', type: 'Covered Truck', capacityTons: 10, location: 'Dharwad', driver: 'Mahesh Naik', rating: 4.5, trust: 88, price: 19200, match: 84, trips: 205 },
  { id: 'TK-103', number: 'KA26D1096', type: 'Open Truck', capacityTons: 14, location: 'Belagavi', driver: 'Imran Shaikh', rating: 4.6, trust: 90, price: 20100, match: 78, trips: 268 },
  { id: 'TK-104', number: 'MH12FZ3345', type: 'Container', capacityTons: 15, location: 'Hubballi', driver: 'Santosh Jadhav', rating: 4.3, trust: 81, price: 21800, match: 71, trips: 143 },
];

export const traderLoads = [
  { id: 'TL-701', cargo: 'Onion', origin: 'Hubballi', destination: 'Bengaluru', weightTons: 12, pickup: 'Today, 10:00 AM', price: 18000, status: 'Truck Assigned' },
  { id: 'TL-702', cargo: 'Potato', origin: 'Hubballi', destination: 'Pune', weightTons: 11, pickup: 'Tomorrow, 6:30 AM', price: 27500, status: 'Finding Truck' },
  { id: 'TL-703', cargo: 'Maize', origin: 'Hubballi', destination: 'Hyderabad', weightTons: 12, pickup: 'Tomorrow, 9:00 AM', price: 24800, status: 'Finding Truck' },
  { id: 'TL-704', cargo: 'Groundnut', origin: 'Hubballi', destination: 'Mumbai', weightTons: 10, pickup: '09 Oct, 7:00 AM', price: 36500, status: 'Draft' },
];

export const traderBookings = [
  { id: 'TB-411', cargo: 'Onion', route: 'Hubballi → Bengaluru', truck: 'KA25AB4821', pickup: 'Today', amount: 18000, status: 'Confirmed' },
  { id: 'TB-409', cargo: 'Cotton', route: 'Hubballi → Pune', truck: 'KA22C7710', pickup: 'Tomorrow', amount: 26500, status: 'Held' },
  { id: 'TB-402', cargo: 'Tomato', route: 'Dharwad → Mumbai', truck: 'KA26D1096', pickup: '02 Oct', amount: 31200, status: 'Completed' },
];

export const payments = [
  { id: 'INV-8801', date: '06 Oct 2026', to: 'Ravi Patil', route: 'Hubballi → Bengaluru', amount: 18000, status: 'Pending' },
  { id: 'INV-8794', date: '02 Oct 2026', to: 'Imran Shaikh', route: 'Dharwad → Mumbai', amount: 31200, status: 'Paid' },
  { id: 'INV-8760', date: '27 Sep 2026', to: 'Mahesh Naik', route: 'Hubballi → Goa', amount: 14200, status: 'Paid' },
];
