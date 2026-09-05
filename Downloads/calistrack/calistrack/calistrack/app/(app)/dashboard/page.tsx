"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { TodayWorkoutCard } from "@/components/today-workout-card";
import { WeeklyProgressCard } from "@/components/weekly-progress-card";
import { EmptyState } from "@/components/empty-state";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { getSessions, getTemplates } from "@/lib/db/repository";
import { WorkoutSession } from "@/types";
import { computeCurrentStreak, filterSessionsByPeriod } from "@/lib/metrics";
import { formatDateBR } from "@/lib/utils";
import { Flame } from "lucide-react";

export default function DashboardPage() {
  const { profile, loading } = useLocalProfile();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [hasTemplate, setHasTemplate] = useState(false);

  useEffect(() => { setSessions(getSessions()); setHasTemplate(getTemplates().length > 0); }, []);

  const todaySession = useMemo(() => {
    const today = new Date().toDateString();
    return sessions.find((s) => new Date(s.scheduledAt).toDateString() === today && s.status === "planejado") || null;
  }, [sessions]);

  const weekSessions = useMemo(() => filterSessionsByPeriod(sessions, 7), [sessions]);
  const completed = weekSessions.filter((s) => s.status === "concluido");
  const streak = computeCurrentStreak(sessions.filter((s) => s.status === "concluido"));

  const upcoming = useMemo(() => sessions
    .filter((s) => s.status === "planejado" && new Date(s.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 4), [sessions]);

  if (loading) return null;

  if (!hasTemplate) {
    return (
      <AppShell>
        <EmptyState title="Crie sua primeira rotina" description="Responda o onboarding para gerar uma rotina semanal editavel de calistenia."
          action={<Link href="/onboarding" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">Comecar onboarding</Link>} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Ola, {profile?.fullName || "atleta"}</h1>
      <p className="text-sm text-muted">Aqui esta o resumo do seu treino.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <TodayWorkoutCard session={todaySession} />
        <WeeklyProgressCard completed={completed.length} planned={weekSessions.length} />
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-surface p-4">
        <Flame className="text-accent" />
        <span className="text-sm">Sequencia atual: <strong>{streak}</strong> {streak === 1 ? "treino" : "treinos"}</span>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Proximos treinos</h2>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Nenhum treino agendado. Configure sua agenda.</p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {upcoming.map((s) => (
              <li key={s.id} className="rounded-md border border-border bg-surface p-3 text-sm">
                <span className="font-medium">{s.title}</span> - {formatDateBR(s.scheduledAt)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}
