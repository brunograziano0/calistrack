import { WorkoutSession } from "@/types";
import { differenceInCalendarDays, isWithinInterval, subDays } from "date-fns";

export function filterSessionsByPeriod(sessions: WorkoutSession[], days: number): WorkoutSession[] {
  const end = new Date(); const start = subDays(end, days);
  return sessions.filter((s) => isWithinInterval(new Date(s.scheduledAt), { start, end }));
}

export function computeVolume(session: WorkoutSession): number {
  return session.exercises.reduce((acc, ex) => acc + ex.setLogs.reduce((a, log) => {
    const reps = log.reps ?? 0; const weight = log.extraWeightKg ?? 0;
    return a + reps * (1 + weight / 10);
  }, 0), 0);
}

export function computeCurrentStreak(completed: WorkoutSession[]): number {
  if (completed.length === 0) return 0;
  const dates = completed.map((s) => new Date(s.completedAt ?? s.scheduledAt)).sort((a, b) => b.getTime() - a.getTime());
  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    if (differenceInCalendarDays(dates[i - 1], dates[i]) <= 2) streak += 1; else break;
  }
  return streak;
}
