import { ReminderPreferences } from "@/types";

export function isNotificationSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return "denied";
  return Notification.requestPermission();
}

export function showLocalNotification(title: string, body: string): void {
  if (!isNotificationSupported() || Notification.permission !== "granted") return;
  new Notification(title, { body, icon: "/icons/icon-192.png" });
}

export function scheduleInAppReminders(preferences: ReminderPreferences, onTrigger: () => void): () => void {
  if (!preferences.enabled) return () => {};
  const interval = setInterval(() => {
    const now = new Date();
    const [hh, mm] = preferences.localTime.split(":").map(Number);
    if (preferences.weekdays.includes(now.getDay()) && now.getHours() === hh && now.getMinutes() === mm) onTrigger();
  }, 60000);
  return () => clearInterval(interval);
}
