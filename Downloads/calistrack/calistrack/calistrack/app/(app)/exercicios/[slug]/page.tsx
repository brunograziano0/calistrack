"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ExerciseVideoPlayer } from "@/components/exercise-video-player";
import { getExerciseById, getExerciseBySlug } from "@/lib/db/repository";

export default function ExercicioDetailPage() {
  const params = useParams<{ slug: string }>();
  const exercise = getExerciseBySlug(params.slug);

  if (!exercise) {
    return (
      <AppShell>
        <p className="text-sm text-muted">Exercicio nao encontrado.</p>
        <Link href="/exercicios" className="text-accent">Voltar para a biblioteca</Link>
      </AppShell>
    );
  }

  const regression = exercise.regressionExerciseId ? getExerciseById(exercise.regressionExerciseId) : null;
  const progression = exercise.progressionExerciseId ? getExerciseById(exercise.progressionExerciseId) : null;

  return (
    <AppShell>
      <Link href="/exercicios" className="text-sm text-muted hover:text-accent">&larr; Voltar</Link>
      <h1 className="mt-2 text-2xl font-bold">{exercise.name}</h1>
      <p className="text-sm text-muted">{exercise.level} - {exercise.category}</p>

      <div className="mt-4"><ExerciseVideoPlayer exercise={exercise} /></div>

      <p className="mt-4 text-sm">{exercise.description}</p>

      <div className="mt-4">
        <h2 className="font-semibold">Como executar</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          {exercise.instructions.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Erros comuns</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          {exercise.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>

      <p className="mt-4 rounded-md border border-border bg-surface p-3 text-xs text-muted">{exercise.safetyNotes}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {regression && (
          <Link href={`/exercicios/${regression.slug}`} className="rounded-md border border-border bg-surface p-3 text-sm">
            <span className="block text-xs text-muted">Regressao</span>{regression.name}
          </Link>
        )}
        {progression && (
          <Link href={`/exercicios/${progression.slug}`} className="rounded-md border border-border bg-surface p-3 text-sm">
            <span className="block text-xs text-muted">Progressao</span>{progression.name}
          </Link>
        )}
      </div>
    </AppShell>
  );
}
