"use client";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { getSessions, getTemplates, saveSession } from "@/lib/db/repository";
import { WorkoutSession } from "@/types";
import { formatDateBR, formatTimeBR } from "@/lib/utils";
import { createSessionFromTemplateDay } from "@/lib/session-factory";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { toast } from "sonner";

export default function AgendaPage() {
  const { profile } = useLocalProfile();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  useEffect(() => { setSessions(getSessions()); }, []);

  function generateWeekFromTemplate() {
    const templates = getTemplates();
    if (templates.length === 0 || !profile) { toast.error("Crie uma rotina primeiro em /rotina."); return; }
    const template = templates[0];
    const today = new Date();
    const newSessions: WorkoutSession[] = template.days.map((day, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      date.setHours(7, 0, 0, 0);
      return createSessionFromTemplateDay(day, profile.id, date);
    });
    newSessions.forEach(saveSession);
    setSessions(getSessions());
    toast.success("Semana agendada a partir da sua rotina.");
  }

  function markStatus(session: WorkoutSession, status: WorkoutSession["status"]) {
    saveSession({ ...session, status });
    setSessions(getSessions());
  }

  const sorted = [...sessions].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Agenda</h1>
        <button onClick={generateWeekFromTemplate} className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black">Gerar semana da rotina</button>
      </div>
      <div className="mt-6 flex flex-col gap-2">
        {sorted.length === 0 && <p className="text-sm text-muted">Nenhuma sessao agendada ainda. Gere a semana a partir da sua rotina.</p>}
        {sorted.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-md border border-border bg-surface p-3">
            <div>
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="text-xs text-muted">{formatDateBR(s.scheduledAt)} - {formatTimeBR(s.scheduledAt)} - {s.status}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => markStatus(s, "pulado")} className="rounded-md border border-border px-2 py-1 text-xs">Pular</button>
              <button onClick={() => markStatus(s, "concluido")} className="rounded-md bg-accent px-2 py-1 text-xs font-semibold text-black">Concluir</button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
