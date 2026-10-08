export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN');

export const formatTimer = (secs) => {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
};

export const statusStyles = {
  Confirmed: 'bg-ok-soft text-ok',
  Completed: 'bg-navy-100 text-navy-600',
  Held: 'bg-warn-soft text-warn',
  Cancelled: 'bg-danger-soft text-danger',
  Paid: 'bg-ok-soft text-ok',
  Pending: 'bg-warn-soft text-warn',
  'Truck Assigned': 'bg-ok-soft text-ok',
  'Finding Truck': 'bg-warn-soft text-warn',
  Draft: 'bg-navy-100 text-navy-600',
  'In Transit': 'bg-ok-soft text-ok',
};

export const matchTone = (score) =>
  score >= 80 ? 'text-ok bg-ok-soft' : score >= 70 ? 'text-warn bg-warn-soft' : 'text-navy-600 bg-navy-100';
