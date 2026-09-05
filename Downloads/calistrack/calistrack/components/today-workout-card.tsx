import Link from "next/link";
import { WorkoutSession } from "@/types";
import { formatTimeBR } from "@/lib/utils";
import { Play } from "lucide-react";

export function TodayWorkoutCard({ session }: { session: WorkoutSession | null }) {
  if (!session) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Hoje e dia de descanso</h2>
        <p className="mt-1 text-sm text-muted">Nenhum treino planejado para hoje.</p>
        <Link href="/agenda" className="mt-4 inline-block text-sm font-medium text-accent">Ver agenda completa</Link>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">Treino de hoje</span>
      <h2 className="mt-1 text-xl font-bold">{session.title}</h2>
      <p className="mt-1 text-sm text-muted">{formatTimeBR(session.scheduledAt)} - {session.exercises.length} exercicios</p>
      <Link href={`/treino/${session.id}`} className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">
        <Play size={16} /> Iniciar treino
      </Link>
    </div>
  );
}
