import { EXERCISES_SEED } from "@/lib/db/exercises-seed";
import { generateId } from "@/lib/utils";
import { Exercise, PersonalRecord, Profile, WorkoutSession, WorkoutTemplate } from "@/types";

const KEYS = {
  profile: "calistrack:profile", templates: "calistrack:templates",
  sessions: "calistrack:sessions", records: "calistrack:records",
} as const;

function isBrowser() { return typeof window !== "undefined"; }

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try { const raw = window.localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; }
  catch { return fallback; }
}
function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getExerciseLibrary(): Exercise[] { return EXERCISES_SEED; }
export function getExerciseBySlug(slug: string): Exercise | undefined { return EXERCISES_SEED.find((e) => e.slug === slug); }
export function getExerciseById(id: string): Exercise | undefined { return EXERCISES_SEED.find((e) => e.id === id); }

export function getProfile(): Profile | null { return read<Profile | null>(KEYS.profile, null); }
export function saveProfile(profile: Profile): void { write(KEYS.profile, profile); }

export function getTemplates(): WorkoutTemplate[] { return read<WorkoutTemplate[]>(KEYS.templates, []); }
export function saveTemplate(template: WorkoutTemplate): void {
  const templates = getTemplates().filter((t) => t.id !== template.id);
  templates.push(template);
  write(KEYS.templates, templates);
}

export function getSessions(): WorkoutSession[] { return read<WorkoutSession[]>(KEYS.sessions, []); }
export function getSessionById(id: string): WorkoutSession | undefined { return getSessions().find((s) => s.id === id); }
export function saveSession(session: WorkoutSession): void {
  const sessions = getSessions().filter((s) => s.id !== session.id);
  sessions.push(session);
  write(KEYS.sessions, sessions);
}

export function getPersonalRecords(): PersonalRecord[] { return read<PersonalRecord[]>(KEYS.records, []); }
export function upsertPersonalRecord(record: Omit<PersonalRecord, "id">): PersonalRecord {
  const records = getPersonalRecords();
  const idx = records.findIndex((r) => r.exerciseId === record.exerciseId && r.recordType === record.recordType);
  const isBest = idx === -1 || record.recordValue > records[idx].recordValue;
  if (isBest) {
    const newRecord: PersonalRecord = { ...record, id: generateId() };
    if (idx >= 0) records[idx] = newRecord; else records.push(newRecord);
    write(KEYS.records, records);
    return newRecord;
  }
  return records[idx];
}

export function exportUserDataJSON(): string {
  return JSON.stringify({
    profile: getProfile(), templates: getTemplates(), sessions: getSessions(),
    personalRecords: getPersonalRecords(), exportedAt: new Date().toISOString(),
  }, null, 2);
}

export function clearAllUserData(): void {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}

export const isSupabaseEnabled = (): boolean =>
  process.env.NEXT_PUBLIC_USE_SUPABASE === "true" &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
