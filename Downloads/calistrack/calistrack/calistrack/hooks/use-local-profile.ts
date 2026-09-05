"use client";
import { useCallback, useEffect, useState } from "react";
import { Profile } from "@/types";
import { getProfile, saveProfile } from "@/lib/db/repository";

const TZ = process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE || "America/Fortaleza";

export function useLocalProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setProfile(getProfile()); setLoading(false); }, []);

  const updateProfile = useCallback((next: Profile) => { saveProfile(next); setProfile(next); }, []);

  const createDefaultProfile = useCallback((fullName: string): Profile => {
    const p: Profile = {
      id: "local-user", fullName, avatarUrl: null, timezone: TZ, level: "iniciante", primaryGoal: "forca",
      availableDays: 3, sessionDuration: 30, equipment: ["nenhum"],
      reminderPreferences: { enabled: false, weekdays: [1, 3, 5], localTime: "07:00", timezone: TZ, notificationPermissionState: "default" },
      onboardingCompleted: false, theme: "dark",
    };
    saveProfile(p); setProfile(p); return p;
  }, []);

  return { profile, loading, updateProfile, createDefaultProfile };
}
