import { Clock } from 'lucide-react';
import { useHold } from '../context/HoldContext';
import { formatTimer } from '../utils';

/** Countdown for the active hold. Turns amber in the last 5 minutes. */
export default function HoldTimer({ size = 'lg' }) {
  const { secondsLeft, HOLD_SECONDS } = useHold();
  const low = secondsLeft <= 300;
  const pct = (secondsLeft / HOLD_SECONDS) * 100;

  return (
    <div>
      <div className="flex items-center gap-2">
        <Clock className={`${size === 'lg' ? 'h-6 w-6' : 'h-4 w-4'} ${low ? 'text-warn' : 'text-navy-600'}`} aria-hidden />
        <span
          className={`font-mono font-semibold tabular-nums ${size === 'lg' ? 'text-4xl' : 'text-base'} ${
            low ? 'text-warn' : 'text-navy-900'
          }`}
          aria-live="off"
        >
          {formatTimer(secondsLeft)}
        </span>
      </div>
      {size === 'lg' && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-100">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${low ? 'bg-warn' : 'bg-navy-700'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}
