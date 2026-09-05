export type Level = "iniciante" | "intermediario" | "avancado";
export type Goal = "forca" | "hipertrofia" | "emagrecimento" | "habilidades" | "mobilidade";
export type Equipment = "nenhum" | "barra_fixa" | "paralelas" | "argolas" | "elastico" | "peso_livre" | "colete";
export type ExerciseCategory = "forca" | "skill" | "mobilidade" | "core" | "condicionamento";
export type MuscleGroup = "peito" | "costas" | "ombros" | "biceps" | "triceps" | "core" | "pernas" | "gluteos" | "panturrilha" | "corpo_todo";
export type SessionStatus = "planejado" | "concluido" | "pulado" | "reagendado";

export interface Exercise {
  id: string; slug: string; name: string; description: string;
  instructions: string[]; commonMistakes: string[]; safetyNotes: string;
  primaryMuscles: MuscleGroup[]; secondaryMuscles: MuscleGroup[];
  equipment: Equipment[]; level: Level; category: ExerciseCategory;
  videoUrl: string | null; thumbnailUrl: string | null;
  regressionExerciseId: string | null; progressionExerciseId: string | null;
  isPublic: boolean;
}

export interface TemplateExercise {
  id: string; exerciseId: string; orderIndex: number; plannedSets: number;
  plannedRepsMin: number | null; plannedRepsMax: number | null;
  plannedDurationSeconds: number | null; restSeconds: number; notes: string | null;
}

export interface TemplateDay {
  id: string; templateId: string; dayOfWeek: number | null; name: string;
  orderIndex: number; estimatedDuration: number; exercises: TemplateExercise[];
}

export interface WorkoutTemplate {
  id: string; userId: string | null; name: string; description: string;
  level: Level; goal: Goal; isPublic: boolean; createdAt: string; days: TemplateDay[];
}

export interface SetLog {
  id: string; sessionExerciseId: string; setNumber: number;
  reps: number | null; durationSeconds: number | null; extraWeightKg: number | null;
  rpe: number | null; completedAt: string | null; notes: string | null;
}

export interface SessionExercise {
  id: string; sessionId: string; exerciseId: string; orderIndex: number;
  plannedSets: number; plannedRepsMin: number | null; plannedRepsMax: number | null;
  plannedDurationSeconds: number | null; restSeconds: number;
  status: SessionStatus; notes: string | null; setLogs: SetLog[];
}

export interface WorkoutSession {
  id: string; userId: string; templateDayId: string | null; scheduledAt: string;
  startedAt: string | null; completedAt: string | null; status: SessionStatus;
  title: string; notes: string | null; perceivedEffort: number | null;
  durationSeconds: number | null; exercises: SessionExercise[];
}

export interface ReminderPreferences {
  enabled: boolean; weekdays: number[]; localTime: string; timezone: string;
  notificationPermissionState: "default" | "granted" | "denied";
}

export interface Profile {
  id: string; fullName: string; avatarUrl: string | null; timezone: string;
  level: Level; primaryGoal: Goal; availableDays: number; sessionDuration: number;
  equipment: Equipment[]; reminderPreferences: ReminderPreferences;
  onboardingCompleted: boolean; theme: "dark" | "light";
}

export interface PersonalRecord {
  id: string; userId: string; exerciseId: string;
  recordType: "reps" | "duration" | "weight"; recordValue: number; unit: string;
  achievedAt: string; sessionId: string;
}

export interface OnboardingAnswers {
  fullName: string; primaryGoal: Goal; level: Level; availableDays: number;
  sessionDuration: number; equipment: Equipment[]; reminderTime: string; limitations: string;
}
