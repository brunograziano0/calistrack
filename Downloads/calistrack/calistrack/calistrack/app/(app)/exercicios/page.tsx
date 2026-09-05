"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { getExerciseLibrary } from "@/lib/db/repository";
import { Level } from "@/types";
import { Search } from "lucide-react";

const LEVELS: Level[] = ["iniciante", "intermediario", "avancado"];

export default function ExerciciosPage() {
  const exercises = getExerciseLibrary();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level | "todos">("todos");

  const filtered = useMemo(() => exercises.filter((ex) => {
    const matchesQuery = ex.name.toLowerCase().includes(query.toLowerCase());
    const matchesLevel = level === "todos" || ex.level === level;
    return matchesQuery && matchesLevel;
  }), [exercises, query, level]);

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Biblioteca de exercicios</h1>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-surface px-3 py-2">
          <Search size={16} className="text-muted" />
          <input placeholder="Pesquisar exercicio" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" />
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value as Level | "todos")} className="rounded-md border border-border bg-surface px-3 py-2 text-sm">
          <option value="todos">Todos os niveis</option>
          {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {filtered.map((ex) => (
          <Link key={ex.id} href={`/exercicios/${ex.slug}`} className="rounded-lg border border-border bg-surface p-4 hover:border-accent">
            <h3 className="font-semibold">{ex.name}</h3>
            <p className="mt-1 text-xs uppercase text-muted">{ex.level} - {ex.category}</p>
            <p className="mt-2 text-xs text-muted">{ex.primaryMuscles.join(", ")}</p>
          </Link>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted">Nenhum exercicio encontrado.</p>}
      </div>
    </AppShell>
  );
}
