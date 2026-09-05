import { generateId } from "@/lib/utils";
import { SessionExercise, TemplateDay, WorkoutSession } from "@/types";

export function createSessionFromTemplateDay(day: TemplateDay, userId: string, scheduledAt: Date): WorkoutSession {
  const sessionId = generateId();
  const exercises: SessionExercise[] = day.exercises.map((te) => ({
    id: generateId(), sessionId, exerciseId: te.exerciseId, orderIndex: te.orderIndex,
    plannedSets: te.plannedSets, plannedRepsMin: te.plannedRepsMin, plannedRepsMax: te.plannedRepsMax,
    plannedDurationSeconds: te.plannedDurationSeconds, restSeconds: te.restSeconds,
    status: "planejado", notes: te.notes, setLogs: [],
  }));
  return {
    id: sessionId, userId, templateDayId: day.id, scheduledAt: scheduledAt.toISOString(),
    startedAt: null, completedAt: null, status: "planejado", title: day.name,
    notes: null, perceivedEffort: null, durationSeconds: null, exercises,
  };
}
