"use client";
import { useState } from "react";
import { SetLog } from "@/types";

export function SetLogger({ setNumber, suggestedReps, onComplete }: { setNumber: number; suggestedReps?: string; onComplete: (log: Omit<SetLog, "id" | "sessionExerciseId">) => void }) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [rpe, setRpe] = useState("7");
  const [notes, setNotes] = useState("");

  function handleSubmit() {
    onComplete({ setNumber, reps: reps ? Number(reps) : null, durationSeconds: null, extraWeightKg: weight ? Number(weight) : null, rpe: rpe ? Number(rpe) : null, completedAt: new Date().toISOString(), notes: notes || null });
    setReps(""); setWeight(""); setNotes("");
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">Serie {setNumber}</span>
        {suggestedReps && <span className="text-xs text-muted">Alvo: {suggestedReps}</span>}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="flex flex-col text-xs text-muted">Repeticoes
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="mt-1 rounded-md border border-border bg-background px-2 py-1 text-foreground" />
        </label>
        <label className="flex flex-col text-xs text-muted">Carga extra (kg)
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 rounded-md border border-border bg-background px-2 py-1 text-foreground" />
        </label>
        <label className="flex flex-col text-xs text-muted">RPE (1-10)
          <input type="number" min={1} max={10} value={rpe} onChange={(e) => setRpe(e.target.value)} className="mt-1 rounded-md border border-border bg-background px-2 py-1 text-foreground" />
        </label>
      </div>
      <input placeholder="Observacao (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-2 w-full rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground" />
      <button onClick={handleSubmit} className="mt-3 w-full rounded-md bg-accent py-2 text-sm font-semibold text-black">Concluir serie</button>
    </div>
  );
}
