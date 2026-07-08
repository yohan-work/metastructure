export type StatCardProps = {
  label: string;
  value: string;
  description?: string;
  trend?: string;
};

export function StatCard({ label, value, description, trend }: StatCardProps) {
  return (
    <article className="ui-stat-card">
      <div className="ui-stat-card__top">
        <p>{label}</p>
        {trend ? <span>{trend}</span> : null}
      </div>
      <strong>{value}</strong>
      {description ? <small>{description}</small> : null}
    </article>
  );
}
