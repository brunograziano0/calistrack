export function WeeklyProgressCard({ completed, planned }: { completed: number; planned: number }) {
  const pct = planned > 0 ? Math.min(100, Math.round((completed / planned) * 100)) : 0;
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">Progresso semanal</span>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-2xl font-bold">{completed}/{planned}</span>
        <span className="text-sm text-muted">{pct}%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-background">
        <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
