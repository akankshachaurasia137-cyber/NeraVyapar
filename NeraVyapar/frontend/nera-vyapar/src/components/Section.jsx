/** Titled content block used across dashboards. */
export default function Section({ title, subtitle, action, children, className = '', flush = false }) {
  return (
    <section className={className}>
      {(title || action) && (
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-navy-900">{title}</h2>
            {subtitle && <p className="text-sm text-navy-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {flush ? <div className="card overflow-hidden">{children}</div> : children}
    </section>
  );
}
