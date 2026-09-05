import { EXERCISES_SEED } from "@/lib/db/exercises-seed";
import { generateId } from "@/lib/utils";
import { Equipment, Exercise, Level, OnboardingAnswers, TemplateDay, TemplateExercise, WorkoutTemplate } from "@/types";

function hasEquipment(ex: Exercise, available: Equipment[]): boolean {
  if (ex.equipment.includes("nenhum")) return true;
  return ex.equipment.some((eq) => available.includes(eq));
}

function pickExercises(categories: Exercise["category"][], level: Level, equipment: Equipment[], count = 3): Exercise[] {
  const order: Level[] = ["iniciante", "intermediario", "avancado"];
  const maxIdx = order.indexOf(level);
  return EXERCISES_SEED.filter((ex) =>
    categories.includes(ex.category) && hasEquipment(ex, equipment) && order.indexOf(ex.level) <= maxIdx
  ).slice(0, count);
}

function toTE(ex: Exercise, sets: number, rest: number, orderIndex: number, notes?: string): TemplateExercise {
  return { id: generateId(), exerciseId: ex.id, orderIndex, plannedSets: sets, plannedRepsMin: 6, plannedRepsMax: 12, plannedDurationSeconds: null, restSeconds: rest, notes: notes ?? null };
}

function levelSets(level: Level) {
  if (level === "iniciante") return { sets: 2, rest: 90 };
  if (level === "intermediario") return { sets: 3, rest: 75 };
  return { sets: 4, rest: 60 };
}

function warmup(orderIndex: number): TemplateExercise[] {
  const mobility = EXERCISES_SEED.find((e) => e.slug === "mobilidade-punho-ombro")!;
  return [{ id: generateId(), exerciseId: mobility.id, orderIndex, plannedSets: 1, plannedRepsMin: null, plannedRepsMax: null, plannedDurationSeconds: 300, restSeconds: 0, notes: "Aquecimento de 5 minutos." }];
}

function buildFullBodyDay(level: Level, eq: Equipment[], idx: number, name: string): TemplateDay {
  const { sets, rest } = levelSets(level);
  const chosen = [
    ...pickExercises(["forca"], level, eq, 4).filter((e) => e.primaryMuscles.includes("peito")).slice(0, 1),
    ...pickExercises(["forca"], level, eq, 4).filter((e) => e.primaryMuscles.includes("costas")).slice(0, 1),
    ...pickExercises(["forca"], level, eq, 4).filter((e) => e.primaryMuscles.includes("pernas")).slice(0, 1),
    ...pickExercises(["core"], level, eq, 1),
  ];
  return { id: generateId(), templateId: "", dayOfWeek: null, name, orderIndex: idx, estimatedDuration: 30,
    exercises: [...warmup(0), ...chosen.map((ex, i) => toTE(ex, sets, rest, i + 1))] };
}

function buildSplitDay(focus: "push" | "pull" | "legs_core" | "skill", level: Level, eq: Equipment[], idx: number, name: string): TemplateDay {
  const { sets, rest } = levelSets(level);
  let chosen: Exercise[] = [];
  if (focus === "push") chosen = pickExercises(["forca"], level, eq, 6).filter((e) => e.primaryMuscles.some((m) => ["peito", "triceps", "ombros"].includes(m))).slice(0, 3);
  else if (focus === "pull") chosen = pickExercises(["forca"], level, eq, 6).filter((e) => e.primaryMuscles.some((m) => ["costas", "biceps"].includes(m))).slice(0, 3);
  else if (focus === "legs_core") chosen = [...pickExercises(["forca"], level, eq, 6).filter((e) => e.primaryMuscles.includes("pernas")).slice(0, 2), ...pickExercises(["core"], level, eq, 2)];
  else chosen = pickExercises(["skill", "mobilidade"], level, eq, 3);
  return { id: generateId(), templateId: "", dayOfWeek: null, name, orderIndex: idx, estimatedDuration: 40,
    exercises: [...warmup(0), ...chosen.map((ex, i) => toTE(ex, sets, rest, i + 1))] };
}

export function generateWorkoutTemplate(answers: OnboardingAnswers, userId: string): WorkoutTemplate {
  const templateId = generateId();
  let days: TemplateDay[] = [];

  if (answers.level === "iniciante") {
    const n = Math.min(Math.max(answers.availableDays, 2), 3);
    for (let i = 0; i < n; i++) days.push(buildFullBodyDay(answers.level, answers.equipment, i, `Full Body ${i + 1}`));
  } else if (answers.level === "intermediario") {
    const n = Math.min(Math.max(answers.availableDays, 3), 5);
    const pattern: Array<"push" | "pull" | "legs_core"> = ["push", "pull", "legs_core", "push", "pull"];
    for (let i = 0; i < n; i++) {
      const f = pattern[i % pattern.length];
      days.push(buildSplitDay(f, answers.level, answers.equipment, i, f === "push" ? "Push" : f === "pull" ? "Pull" : "Legs & Core"));
    }
  } else {
    const n = Math.min(Math.max(answers.availableDays, 4), 6);
    const pattern: Array<"push" | "pull" | "legs_core" | "skill"> = ["push", "pull", "legs_core", "skill", "push", "pull"];
    for (let i = 0; i < n; i++) {
      const f = pattern[i % pattern.length];
      const label = f === "push" ? "Push" : f === "pull" ? "Pull" : f === "legs_core" ? "Legs & Core" : "Skills & Mobilidade";
      days.push(buildSplitDay(f, answers.level, answers.equipment, i, label));
    }
  }

  days = days.map((d) => ({ ...d, templateId }));
  return {
    id: templateId, userId, name: `Rotina ${answers.level} - ${days.length}x por semana`,
    description: "Rotina gerada automaticamente com base no seu onboarding.",
    level: answers.level, goal: answers.primaryGoal, isPublic: false, createdAt: new Date().toISOString(), days,
  };
}
