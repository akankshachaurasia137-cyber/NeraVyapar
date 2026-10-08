import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const HOLD_SECONDS = 30 * 60;
const HoldContext = createContext(null);

/**
 * Only one hold can be active at a time. Holding a different item
 * automatically releases the previous one (and reports it via `notice`).
 */
export function HoldProvider({ children }) {
  const [hold, setHold] = useState(null); // { kind, id, label, expiresAt }
  const [confirmed, setConfirmed] = useState(null); // { kind, id, label }
  const [notice, setNotice] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!hold) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [hold]);

  const secondsLeft = hold ? Math.max(0, Math.round((hold.expiresAt - now) / 1000)) : 0;

  useEffect(() => {
    if (hold && secondsLeft === 0) {
      setNotice({ type: 'expired', label: hold.label });
      setHold(null);
    }
  }, [hold, secondsLeft]);

  const holdRef = useRef(null);
  useEffect(() => {
    holdRef.current = hold;
  }, [hold]);

  const startHold = useCallback((kind, id, label) => {
    const prev = holdRef.current;
    if (prev && prev.id === id) return; // already held, keep the running timer
    setConfirmed(null);
    setNow(Date.now());
    setNotice(prev ? { type: 'released', label: prev.label } : null);
    const next = { kind, id, label, expiresAt: Date.now() + HOLD_SECONDS * 1000 };
    holdRef.current = next;
    setHold(next);
  }, []);

  const cancelHold = useCallback(() => {
    setHold(null);
    setNotice(null);
  }, []);

  const confirmHold = useCallback(() => {
    const prev = holdRef.current;
    if (prev) setConfirmed({ kind: prev.kind, id: prev.id, label: prev.label });
    holdRef.current = null;
    setHold(null);
    setNotice(null);
  }, []);

  const dismissNotice = useCallback(() => setNotice(null), []);
  const dismissConfirmed = useCallback(() => setConfirmed(null), []);

  const value = useMemo(
    () => ({ hold, secondsLeft, confirmed, notice, startHold, cancelHold, confirmHold, dismissNotice, dismissConfirmed, HOLD_SECONDS }),
    [hold, secondsLeft, confirmed, notice, startHold, cancelHold, confirmHold, dismissNotice, dismissConfirmed],
  );
  return <HoldContext.Provider value={value}>{children}</HoldContext.Provider>;
}

export function useHold() {
  const ctx = useContext(HoldContext);
  if (!ctx) throw new Error('useHold must be used inside HoldProvider');
  return ctx;
}
