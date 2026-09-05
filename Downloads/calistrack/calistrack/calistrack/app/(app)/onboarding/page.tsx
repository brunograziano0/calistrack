"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Equipment, Goal, Level, OnboardingAnswers } from "@/types";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { generateWorkoutTemplate } from "@/lib/workout-generator";
import { saveTemplate } from "@/lib/db/repository";

const GOALS: { value: Goal; label: string }[] = [
  { value: "forca", label: "Forca" }, { value: "hipertrofia", label: "Hipertrofia" },
  { value: "emagrecimento", label: "Emagrecimento/condicionamento" },
  { value: "habilidades", label: "Habilidades (skills)" }, { value: "mobilidade", label: "Mobilidade" },
];
const LEVELS: { value: Level; label: string }[] = [
  { value: "iniciante", label: "Iniciante" }, { value: "intermediario", label: "Intermediario" }, { value: "avancado", label: "Avancado" },
];
const EQUIPMENT_OPTIONS: { value: Equipment; label: string }[] = [
  { value: "nenhum", label: "Nenhum" }, { value: "barra_fixa", label: "Barra fixa" }, { value: "paralelas", label: "Paralelas/dips" },
  { value: "argolas", label: "Argolas" }, { value: "elastico", label: "Elasticos" }, { value: "peso_livre", label: "Kettlebell/halter" }, { value: "colete", label: "Colete/carga" },
];
const STEPS = ["Objetivo", "Nivel", "Disponibilidade", "Equipamentos", "Lembretes", "Observacoes"];

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile } = useLocalProfile();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({
    fullName: profile?.fullName || "", primaryGoal: "forca", level: "iniciante", availableDays: 3,
    sessionDuration: 30, equipment: ["nenhum"], reminderTime: "07:00", limitations: "",
  });

  function toggleEquipment(eq: Equipment) {
    setAnswers((a) => ({ ...a, equipment: a.equipment.includes(eq) ? a.equipment.filter((e) => e !== eq) : [...a.equipment, eq] }));
  }

  function finish() {
    if (!profile) { toast.error("Crie uma conta antes de continuar."); router.push("/cadastro"); return; }
    const template = generateWorkoutTemplate(answers, profile.id);
    saveTemplate(template);
    updateProfile({
      ...profile, level: answers.level, primaryGoal: answers.primaryGoal, availableDays: answers.availableDays,
      sessionDuration: answers.sessionDuration, equipment: answers.equipment, onboardingCompleted: true,
      reminderPreferences: { ...profile.reminderPreferences, localTime: answers.reminderTime },
    });
    toast.success("Rotina inicial gerada! Voce pode edita-la a qualquer momento.");
    router.push("/rotina");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full bg-accent transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      <h1 className="text-xl font-bold">{STEPS[step]}</h1>

      {step === 0 && (
        <div className="mt-4 grid grid-cols-1 gap-2">
          {GOALS.map((g) => (
            <button key={g.value} onClick={() => setAnswers((a) => ({ ...a, primaryGoal: g.value }))}
              className={`rounded-md border px-4 py-3 text-left ${answers.primaryGoal === g.value ? "border-accent bg-accent/10" : "border-border bg-surface"}`}>
              {g.label}
            </button>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="mt-4 grid grid-cols-1 gap-2">
          {LEVELS.map((l) => (
            <button key={l.value} onClick={() => setAnswers((a) => ({ ...a, level: l.value }))}
              className={`rounded-md border px-4 py-3 text-left ${answers.level === l.value ? "border-accent bg-accent/10" : "border-border bg-surface"}`}>
              {l.label}
            </button>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="mt-4 flex flex-col gap-4">
          <label className="text-sm text-muted">Dias disponiveis por semana: {answers.availableDays}
            <input type="range" min={2} max={6} value={answers.availableDays} onChange={(e) => setAnswers((a) => ({ ...a, availableDays: Number(e.target.value) }))} className="mt-2 w-full" />
          </label>
          <label className="text-sm text-muted">Duracao media por sessao
            <select value={answers.sessionDuration} onChange={(e) => setAnswers((a) => ({ ...a, sessionDuration: Number(e.target.value) }))} className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground">
              {[20, 30, 45, 60, 90].map((d) => <option key={d} value={d}>{d} minutos</option>)}
            </select>
          </label>
        </div>
      )}
      {step === 3 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {EQUIPMENT_OPTIONS.map((eq) => (
            <button key={eq.value} onClick={() => toggleEquipment(eq.value)}
              className={`rounded-md border px-3 py-2 text-sm ${answers.equipment.includes(eq.value) ? "border-accent bg-accent/10" : "border-border bg-surface"}`}>
              {eq.label}
            </button>
          ))}
        </div>
      )}
      {step === 4 && (
        <div className="mt-4">
          <label className="text-sm text-muted">Horario preferido para lembretes
            <input type="time" value={answers.reminderTime} onChange={(e) => setAnswers((a) => ({ ...a, reminderTime: e.target.value }))} className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground" />
          </label>
        </div>
      )}
      {step === 5 && (
        <div className="mt-4">
          <textarea placeholder="Limitacoes, lesoes ou observacoes (opcional)" value={answers.limitations} onChange={(e) => setAnswers((a) => ({ ...a, limitations: e.target.value }))} className="h-28 w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground" />
          <p className="mt-2 text-xs text-muted">O CalisTrack organiza e registra seus treinos, mas nao substitui a avaliacao de um profissional de saude.</p>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40">Voltar</button>
        {step < STEPS.length - 1 ? (
          <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">Continuar</button>
        ) : (
          <button onClick={finish} className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">Gerar minha rotina</button>
        )}
      </div>
    </div>
  );
}
