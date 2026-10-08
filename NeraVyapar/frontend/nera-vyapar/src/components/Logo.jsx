export default function Logo({ className = '' }) {
  return (
    <img
      src="/logo-wordmark.png"
      alt="Nera Vyapar"
      className={`block h-auto w-full select-none ${className}`}
      draggable="false"
    />
  );
}
