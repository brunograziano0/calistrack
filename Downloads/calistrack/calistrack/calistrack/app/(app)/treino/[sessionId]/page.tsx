"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { ExerciseVideoPlayer } from "@/components/exercise-video-player";
import { RestTimer } from "@/components/rest-timer";
import { SetLogger } from "@/components/set-logger";
import { getExerciseById, getSessionById, saveSession } from "@/lib/db/repository";
import { SetLog, WorkoutSession } from "@/types";
import { generateId } from "@/lib/utils";

export default function SessaoTreinoPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    const s = getSessionById(params.sessionId);
    if (s) {
      if (!s.startedAt) s.startedAt = new Date().toISOString();
      setSession(s);
    }
  }, [params.sessionId]);

  if (!session) {
    return (
      <AppShell><p className="text-sm text-muted">Sessao nao encontrada.</p></AppShell>
    );
  }

  const activeExercise = session.exercises[activeIndex];
  const exerciseData = activeExercise ? getExerciseById(activeExercise.exerciseId) : null;

  function persist(next: WorkoutSession) { saveSession(next); setSession(next); }

  function handleSetComplete(log: Omit<SetLog, "id" | "sessionExerciseId">) {
    if (!session || !activeExercise) return;
    const newLog: SetLog = { ...log, id: generateId(), sessionExerciseId: activeExercise.id };
    const updatedExercises = session.exercises.map((ex) =>
      ex.id === activeExercise.id ? { ...ex, setLogs: [...ex.setLogs, newLog] } : ex
    );
    persist({ ...session, exercises: updatedExercises });
    setResting(true);
  }

  function nextExercise() {
    setResting(false);
    if (activeIndex < session.exercises.length - 1) setActiveIndex((i) => i + 1);
    else finishSession();
  }

  function finishSession() {
    if (!session) return;
    const durationSeconds = session.startedAt ? Math.round((Date.now() - new Date(session.startedAt).getTime()) / 1000) : null;
    persist({ ...session, status: "concluido", completedAt: new Date().toISOString(), durationSeconds });
    toast.success("Treino concluido! Confira seu progresso.");
    router.push("/progresso");
  }

  if (!activeExercise || !exerciseData) {
    return (
      <AppShell>
        <div className="text-center">
          <h1 className="text-xl font-bold">Sessao concluida</h1>
          <button onClick={finishSession} className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">Finalizar</button>
        </div>
      </AppShell>
    );
  }

  const setsDone = activeExercise.setLogs.length;

  return (
    <AppShell>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{session.title}</h1>
        <span className="text-xs text-muted">Exercicio {activeIndex + 1} de {session.exercises.length}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold">{exerciseData.name}</h2>
      <div className="mt-2"><ExerciseVideoPlayer exercise={exerciseData} /></div>

      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
        {exerciseData.instructions.map((step, i) => <li key={i}>{step}</li>)}
      </ol>

      {resting ? (
        <div className="mt-4">
          <RestTimer restSeconds={activeExercise.restSeconds} onFinished={() => {}} />
          <button onClick={nextExercise} className="mt-3 w-full rounded-md bg-accent py-2 text-sm font-semibold text-black">Continuar</button>
        </div>
      ) : setsDone < activeExercise.plannedSets ? (
        <div className="mt-4">
          <SetLogger setNumber={setsDone + 1} suggestedReps={activeExercise.plannedRepsMin ? `${activeExercise.plannedRepsMin}-${activeExercise.plannedRepsMax}` : undefined} onComplete={handleSetComplete} />
        </div>
      ) : (
        <button onClick={nextExercise} className="mt-4 w-full rounded-md bg-accent py-2 text-sm font-semibold text-black">
          Proximo exercicio
        </button>
      )}
    </AppShell>
  );
}
