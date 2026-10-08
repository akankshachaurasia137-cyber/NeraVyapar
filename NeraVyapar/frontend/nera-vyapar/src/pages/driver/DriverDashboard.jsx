import { useHold } from '../../context/HoldContext';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Headset,
  IndianRupee,
  MapPin,
  PackageSearch,
  Route,
  ClipboardList,
  CheckCircle2,
  TriangleAlert,
  Boxes,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import BookingsTable from '../../components/BookingsTable';
import EarningsCard from '../../components/EarningsCard';
import LoadCard from '../../components/LoadCard';
import RiskCard from '../../components/RiskCard';
import RouteProgress from '../../components/RouteProgress';
import Section from '../../components/Section';
import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';

import { useLanguage } from '../../context/LanguageContext';
import { bookings } from '../../data/bookings';
import {
  currentTrip,
  driver,
  earnings,
  risk,
  stats,
  truck,
} from '../../data/driver';
import { loads } from '../../data/loads';

import { inr } from '../../utils';
import {
  analyzeTruck,
  createBookingHold,
  confirmBooking,
} from '../../utils/api';

export default function DriverDashboard() {
  const { t } = useLanguage();

  const {
    hold,
    secondsLeft,
    startHold,
    cancelHold,
    confirmHold,
  } = useHold();

  // -----------------------------
  // LIVE BACKEND ANALYSIS STATE
  // -----------------------------
  const [analysis, setAnalysis] = useState(null);

  const [bookingId, setBookingId] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------------
  // CALL BACKEND / ML ANALYSIS
  // -----------------------------
  const runAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('nera_token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const result = await analyzeTruck(
        {
          current_city: truck.location,
          destination_city: currentTrip.destination,
          capacity_tons: truck.capacityTons,
          vehicle_type: truck.type.toLowerCase(),
          cargo_type: currentTrip.cargo,
          days_until_available: 1,
        },
        token
      );

      console.log('Nera Vyapar analysis:', result);

      setAnalysis(result);
    } catch (err) {
      console.error('Analysis error:', err);

      setError(
        err.message || 'Unable to connect to Nera Vyapar backend.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  // -----------------------------
  // BEST MATCH
  // -----------------------------
  const bestMatch =
    analysis?.matching?.top_matches?.length > 0
      ? analysis.matching.top_matches[0]
      : null;

  // -----------------------------
  // HOLD LOAD
  // -----------------------------
  const handleHoldLoad = async () => {
    if (!bestMatch) {
      setBookingError('No matching load available.');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');

      const token = localStorage.getItem('nera_token');

      if (!token) {
        throw new Error('Please log in first.');
      }

      const booking = await createBookingHold(
        {
          load_id: bestMatch.load_id,
          driver_id: 1,
          agreed_price:
            analysis?.fair_price?.estimated_price || 0,
        },
        token
      );

      console.log('Booking hold created:', booking);

      setBookingId(booking.id);

      startHold(
        'load',
        bestMatch.load_id,
        `Load #${bestMatch.load_id}`
      );
    } catch (err) {
      console.error('Booking hold error:', err);

      setBookingError(
        err.message || 'Failed to hold this load.'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // -----------------------------
  // CONFIRM BOOKING
  // -----------------------------
  const handleConfirmBooking = async () => {
    if (!bookingId) {
      setBookingError('No booking found.');
      return;
    }

    try {
      setBookingLoading(true);
      setBookingError('');

      const token = localStorage.getItem('nera_token');

      if (!token) {
        throw new Error('Please log in first.');
      }

      const result = await confirmBooking(
        bookingId,
        token
      );

      console.log('Booking confirmed:', result);

      // Update frontend hold state
      confirmHold();

      // Keep booking ID for reference
      setBookingId(result.id);
    } catch (err) {
      console.error('Booking confirmation error:', err);

      setBookingError(
        err.message || 'Failed to confirm booking.'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // -----------------------------
  // RECOMMENDED LOADS
  // -----------------------------
  const recommended = loads.slice(0, 4);

  // -----------------------------
  // ACTIVE BOOKINGS
  // -----------------------------
  const activeBookings = bookings
    .filter(
      (b) =>
        b.status === 'Confirmed' ||
        b.status === 'Held'
    )
    .map((b) => ({
      ...b,
      route: `${b.origin} → ${b.destination}`,
    }));

  // -----------------------------
  // QUICK ACTIONS
  // -----------------------------
  const quick = [
    {
      to: '/driver/loads',
      icon: PackageSearch,
      label: t('quick.findLoad'),
    },
    {
      to: '/driver/trip',
      icon: Route,
      label: t('quick.trackTrip'),
    },
    {
      to: '/driver/bookings',
      icon: ClipboardList,
      label: t('quick.myBookings'),
    },
    {
      to: '/driver/support',
      icon: Headset,
      label: t('quick.support'),
    },
  ];

  // -----------------------------
  // LIVE VALUES
  // -----------------------------
  const liveRisk =
    analysis?.empty_return?.empty_return_probability != null
      ? Math.round(
          analysis.empty_return.empty_return_probability * 100
        )
      : stats.emptyReturnRisk;

  const liveFairPrice =
    analysis?.fair_price?.estimated_price != null
      ? analysis.fair_price.estimated_price
      : stats.returnOpportunity;

  const liveRouteRisk =
    analysis?.route_risk?.risk_level ||
    risk.level ||
    'MEDIUM';

  return (
    <div className="space-y-6">

      {/* =====================================================
          1. WELCOME
      ====================================================== */}
      <section className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-navy-900">
            {t('welcome.greeting', {
              name: driver.name,
            })}
          </h2>

          <p className="mt-0.5 text-sm text-navy-500">
            {t('welcome.subtitle')}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">

          {/* TRUCK INFO */}
          <div className="rounded-lg border border-navy-100 bg-navy-50 px-4 py-2.5">

            <p className="font-mono text-sm font-semibold tracking-wide text-navy-900">
              {truck.number}
            </p>

            <p className="text-xs text-navy-600">
              {truck.type} •{' '}
              {t('truck.capacityValue', {
                n: truck.capacityTons,
              })}
            </p>

            <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-navy-500">
              <MapPin
                className="h-3 w-3"
                aria-hidden
              />

              {t('welcome.currentLocation')}:

              <span className="font-medium text-navy-900">
                {truck.location}
              </span>
            </p>

          </div>

          {/* FIND LOAD */}
          <Link
            to="/driver/loads"
            className="btn-primary"
          >
            {t('welcome.findReturnLoad')}
          </Link>

        </div>
      </section>


      {/* =====================================================
          2. STATS
      ====================================================== */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          icon={IndianRupee}
          label={t('stats.returnOpportunity')}
          value={inr(liveFairPrice)}
          sub={t('stats.potentialEarning')}
          tone="ok"
        />

        <StatCard
          icon={TriangleAlert}
          label={t('stats.emptyReturnRisk')}
          value={`${liveRisk}%`}
          sub={
            liveRisk >= 70
              ? t('stats.highRisk')
              : 'Moderate risk'
          }
          tone={
            liveRisk >= 70
              ? 'danger'
              : 'warn'
          }
        />

        <StatCard
          icon={Boxes}
          label={t('stats.availableLoads')}
          value={
            analysis?.matching?.total_matches ??
            stats.availableLoads
          }
          sub={t('stats.withinRoutes')}
        />

        <StatCard
          icon={CheckCircle2}
          label={t('stats.completedTrips')}
          value={stats.completedTrips}
          sub={t('stats.thisMonth')}
        />

      </div>


      {/* =====================================================
          3. CURRENT TRIP + RISK
      ====================================================== */}
      <div className="grid gap-4 lg:grid-cols-5">

        {/* CURRENT TRIP */}
        <section className="card flex flex-col p-5 lg:col-span-3">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <h2 className="text-base font-semibold text-navy-900">
              {t('trip.current')}
            </h2>

            <StatusBadge status="In Transit" />

          </div>

          <p className="mt-3 flex flex-wrap items-center gap-x-2 text-lg font-semibold text-navy-900">

            {currentTrip.origin}

            <ArrowRight
              className="h-5 w-5 text-navy-400"
              aria-hidden
            />

            {currentTrip.destination}

          </p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">

            <div>
              <dt className="text-xs text-navy-500">
                {t('trip.truck')}
              </dt>

              <dd className="mt-0.5 font-mono font-medium text-navy-900">
                {currentTrip.truck}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-navy-500">
                {t('trip.cargo')}
              </dt>

              <dd className="mt-0.5 font-medium text-navy-900">
                {currentTrip.cargo}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-navy-500">
                {t('trip.weight')}
              </dt>

              <dd className="mt-0.5 font-medium text-navy-900">
                {t('loads.tons', {
                  n: currentTrip.weightTons,
                })}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-navy-500">
                {t('trip.pickup')}
              </dt>

              <dd className="mt-0.5 font-medium text-navy-900">
                {currentTrip.pickup}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-navy-500">
                {t('trip.expectedEarning')}
              </dt>

              <dd className="mt-0.5 font-semibold text-ok">
                {inr(currentTrip.earning)}
              </dd>
            </div>

            <div>
              <dt className="text-xs text-navy-500">
                {t('trip.status')}
              </dt>

              <dd className="mt-0.5 font-medium text-navy-900">
                {t('trip.inTransit')}
              </dd>
            </div>

          </dl>

          <div className="mt-5 border-t border-navy-100 pt-4">

            <RouteProgress
              origin={currentTrip.origin}
              destination={currentTrip.destination}
              progress={currentTrip.progress}
              stage={1}
            />

          </div>

          <div className="mt-5">

            <Link
              to="/driver/trip"
              className="btn-secondary"
            >
              {t('trip.viewTrip')}
            </Link>

          </div>

        </section>


        {/* RISK CARD */}
        <div className="lg:col-span-2">

          <RiskCard
            risk={{
              ...risk,
              score:
                analysis?.route_risk?.risk_score ??
                risk.score,
              level: liveRouteRisk,
            }}
          />

        </div>

      </div>


      {/* =====================================================
          4. LIVE BACKEND ANALYSIS
      ====================================================== */}
      <section className="card p-5">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h2 className="text-base font-semibold text-navy-900">
              Live Nera Vyapar Analysis
            </h2>

            <p className="mt-1 text-sm text-navy-500">
              Analyze this truck using the Nera Vyapar backend,
              ML prediction and logistics engines.
            </p>

          </div>

        </div>


        {/* ERROR */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

            <p className="mt-1 text-xs text-red-600">
              Make sure the backend is running and your
              authentication token is valid.
            </p>

          </div>
        )}


        {/* LIVE RESULT */}
        {analysis && (

          <div className="mt-5">

            {/* RESULT CARDS */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {/* EMPTY RETURN */}
              <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">

                <p className="text-xs text-navy-500">
                  Empty Return Risk
                </p>

                <p className="mt-1 text-xl font-semibold text-navy-900">
                  {Math.round(
                    analysis.empty_return.empty_return_probability *
                      100
                  )}
                  %
                </p>

                <p className="mt-1 text-xs text-navy-500">
                  {analysis.empty_return.risk_level}
                </p>

              </div>


              {/* FAIR PRICE */}
              <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">

                <p className="text-xs text-navy-500">
                  Estimated Fair Price
                </p>

                <p className="mt-1 text-xl font-semibold text-navy-900">
                  {inr(
                    analysis.fair_price.estimated_price
                  )}
                </p>

                <p className="mt-1 text-xs text-navy-500">
                  Range:{' '}
                  {inr(
                    analysis.fair_price.range_low
                  )}{' '}
                  –{' '}
                  {inr(
                    analysis.fair_price.range_high
                  )}
                </p>

              </div>


              {/* ROUTE RISK */}
              <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">

                <p className="text-xs text-navy-500">
                  Route Risk
                </p>

                <p className="mt-1 text-xl font-semibold text-navy-900">
                  {analysis.route_risk.risk_level}
                </p>

                <p className="mt-1 text-xs text-navy-500">
                  Score:{' '}
                  {analysis.route_risk.risk_score}
                </p>

              </div>


              {/* MATCHES */}
              <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">

                <p className="text-xs text-navy-500">
                  Matching Loads
                </p>

                <p className="mt-1 text-xl font-semibold text-navy-900">
                  {analysis.matching.total_matches}
                </p>

                <p className="mt-1 text-xs text-navy-500">
                  Top available matches
                </p>

              </div>

            </div>


            {/* RECOMMENDED ACTION */}
            <div className="mt-4 rounded-lg border border-navy-100 p-4">

              <p className="text-xs font-medium text-navy-500">
                Recommended Action
              </p>

              <p className="mt-1 text-sm font-semibold text-navy-900">
                {analysis.empty_return.recommended_action}
              </p>

            </div>


            {/* TOP MATCH */}
            {bestMatch && (

              <div className="mt-4">

                <h3 className="text-sm font-semibold text-navy-900">
                  Best Match
                </h3>

                <div className="mt-2 rounded-lg border border-navy-100 p-4">

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

                    <div>
                      <p className="text-xs text-navy-500">
                        Match Score
                      </p>

                      <p className="mt-1 font-semibold text-navy-900">
                        {bestMatch.score.toFixed(1)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-navy-500">
                        Route
                      </p>

                      <p className="mt-1 font-semibold text-navy-900">
                        {bestMatch.route_score}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-navy-500">
                        Capacity
                      </p>

                      <p className="mt-1 font-semibold text-navy-900">
                        {bestMatch.capacity_score}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-navy-500">
                        Vehicle
                      </p>

                      <p className="mt-1 font-semibold text-navy-900">
                        {bestMatch.vehicle_score}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-navy-500">
                        Price
                      </p>

                      <p className="mt-1 font-semibold text-navy-900">
                        {bestMatch.price_score.toFixed(0)}%
                      </p>
                    </div>

                  </div>


                  <p className="mt-4 text-xs text-navy-600">
                    {bestMatch.explanation}
                  </p>


                  {/* BOOKING ACTIONS */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">

                    {!hold && (
                      <button
                        type="button"
                        onClick={handleHoldLoad}
                        disabled={bookingLoading}
                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {bookingLoading
                          ? 'Holding...'
                          : 'Hold This Load'}
                      </button>
                    )}

                    {hold && (
                      <>
                        <div className="rounded-lg bg-warn-soft px-3 py-2 text-sm font-medium text-warn">
                          Hold active:{' '}
                          {Math.floor(secondsLeft / 60)}:
                          {String(secondsLeft % 60).padStart(2, '0')}
                        </div>

                        <button
                          type="button"
                          onClick={cancelHold}
                          disabled={bookingLoading}
                          className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Release
                        </button>

                        <button
                          type="button"
                          onClick={handleConfirmBooking}
                          disabled={bookingLoading}
                          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {bookingLoading
                            ? 'Confirming...'
                            : 'Confirm Booking'}
                        </button>
                      </>
                    )}

                  </div>


                  {/* BOOKING ERROR */}
                  {bookingError && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                      <p className="text-sm font-medium text-red-700">
                        {bookingError}
                      </p>
                    </div>
                  )}


                  {/* CONFIRMED BOOKING */}
                  {!hold && bookingId && !bookingError && (
                    <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                      <p className="text-sm font-semibold text-green-700">
                        Booking confirmed successfully.
                      </p>

                      <p className="mt-1 text-xs text-green-600">
                        Booking ID: #{bookingId}
                      </p>
                    </div>
                  )}

                </div>

              </div>

            )}


            {/* MULTI-HOP */}
            {analysis.multi_hop?.length > 0 && (

              <div className="mt-4">

                <h3 className="text-sm font-semibold text-navy-900">
                  Suggested Return Journey
                </h3>

                <div className="mt-2 space-y-2">

                  {analysis.multi_hop.map(
                    (hop, index) => (

                      <div
                        key={`${hop.load_id}-${index}`}
                        className="flex flex-col gap-2 rounded-lg border border-navy-100 p-3 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div className="flex items-center gap-2 text-sm font-medium text-navy-900">

                          <span>
                            {hop.from}
                          </span>

                          <ArrowRight className="h-4 w-4 text-navy-400" />

                          <span>
                            {hop.to}
                          </span>

                        </div>

                        <span className="text-sm font-semibold text-ok">
                          {inr(hop.price)}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        )}

      </section>


      {/* =====================================================
          5. RECOMMENDED LOADS
      ====================================================== */}
      <Section
        title={t('loads.recommended')}
        subtitle={t('loads.matching')}
        action={
          <Link
            to="/driver/loads"
            className="text-sm font-medium text-navy-700 hover:text-navy-900 hover:underline"
          >
            {t('loads.viewAll')} →
          </Link>
        }
      >

        <div className="grid gap-4 md:grid-cols-2">

          {recommended.map((load) => (
            <LoadCard
              key={load.id}
              load={load}
            />
          ))}

        </div>

      </Section>


      {/* =====================================================
          6. EARNINGS + QUICK ACTIONS
      ====================================================== */}
      <div className="grid gap-4 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <EarningsCard
            earnings={earnings}
          />

        </div>


        <section className="card p-5">

          <h2 className="text-sm font-semibold text-navy-900">
            {t('quick.title')}
          </h2>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">

            {quick.map(
              ({
                to,
                icon: Icon,
                label,
              }) => (

                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 rounded-lg border border-navy-100 px-3 py-3 text-sm font-medium text-navy-900 transition-colors hover:border-navy-300 hover:bg-navy-50"
                >

                  <Icon
                    className="h-[18px] w-[18px] shrink-0 text-navy-600"
                    aria-hidden
                  />

                  <span className="min-w-0 leading-snug">
                    {label}
                  </span>

                </Link>

              )
            )}

          </div>

        </section>

      </div>


      {/* =====================================================
          7. ACTIVE BOOKINGS
      ====================================================== */}
      <Section
        title={t('book.active')}
        flush
        action={
          <Link
            to="/driver/bookings"
            className="text-sm font-medium text-navy-700 hover:text-navy-900 hover:underline"
          >
            {t('book.viewAll')} →
          </Link>
        }
      >

        <BookingsTable
          rows={activeBookings}
        />

      </Section>

    </div>
  );
}