"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { getExerciseById, getTemplates } from "@/lib/db/repository";
import { WorkoutTemplate } from "@/types";

export default function RotinaPage() {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);

  useEffect(() => { setTemplates(getTemplates()); }, []);

  if (templates.length === 0) {
    return (
      <AppShell>
        <EmptyState title="Voce ainda nao tem uma rotina" description="Complete o onboarding para gerar sua primeira rotina semanal editavel."
          action={<Link href="/onboarding" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">Comecar onboarding</Link>} />
      </AppShell>
    );
  }

  const template = templates[0];

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">{template.name}</h1>
      <p className="text-sm text-muted">{template.description}</p>
      <div className="mt-6 flex flex-col gap-4">
        {template.days.map((day) => (
          <div key={day.id} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{day.name}</h2>
              <span className="text-xs text-muted">~{day.estimatedDuration} min</span>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {day.exercises.map((te) => {
                const ex = getExerciseById(te.exerciseId);
                return (
                  <li key={te.id} className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm">
                    <Link href={ex ? `/exercicios/${ex.slug}` : "#"} className="font-medium hover:text-accent">
                      {ex?.name ?? "Exercicio"}
                    </Link>
                    <span className="text-xs text-muted">
                      {te.plannedSets}x {te.plannedRepsMin ? `${te.plannedRepsMin}-${te.plannedRepsMax} reps` : `${te.plannedDurationSeconds}s`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
