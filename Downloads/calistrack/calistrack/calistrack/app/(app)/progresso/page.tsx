"use client";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { getSessions } from "@/lib/db/repository";
import { WorkoutSession } from "@/types";
import { computeVolume, filterSessionsByPeriod } from "@/lib/metrics";

export default function ProgressoPage() {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [period, setPeriod] = useState(7);

  useEffect(() => { setSessions(getSessions()); }, []);

  const filtered = useMemo(() => filterSessionsByPeriod(sessions, period), [sessions, period]);
  const completed = filtered.filter((s) => s.status === "concluido");
  const adherence = filtered.length > 0 ? Math.round((completed.length / filtered.length) * 100) : 0;
  const totalVolume = completed.reduce((acc, s) => acc + computeVolume(s), 0);
  const totalMinutes = Math.round(completed.reduce((acc, s) => acc + (s.durationSeconds ?? 0), 0) / 60);

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Progresso</h1>
        <select value={period} onChange={(e) => setPeriod(Number(e.target.value))} className="rounded-md border border-border bg-surface px-3 py-2 text-sm">
          <option value={7}>7 dias</option>
          <option value={30}>30 dias</option>
          <option value={90}>90 dias</option>
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-border bg-surface p-4">
          <span className="text-xs text-muted">Treinos concluidos</span>
          <p className="text-xl font-bold">{completed.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <span className="text-xs text-muted">Adesao</span>
          <p className="text-xl font-bold">{adherence}%</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <span className="text-xs text-muted">Tempo total</span>
          <p className="text-xl font-bold">{totalMinutes} min</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <span className="text-xs text-muted">Volume total</span>
          <p className="text-xl font-bold">{Math.round(totalVolume)}</p>
        </div>
      </div>

      {completed.length === 0 && (
        <p className="mt-6 text-sm text-muted">Ainda nao ha dados suficientes neste periodo. Complete treinos para ver sua evolucao aqui.</p>
      )}
    </AppShell>
  );
}
