"use client";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { useLocalProfile } from "@/hooks/use-local-profile";
import { clearAllUserData, exportUserDataJSON } from "@/lib/db/repository";
import { requestNotificationPermission, isNotificationSupported } from "@/lib/notifications";
import { toast } from "sonner";

export default function PerfilPage() {
  const { profile, updateProfile } = useLocalProfile();
  const [supported, setSupported] = useState(false);

  useEffect(() => { setSupported(isNotificationSupported()); }, []);

  if (!profile) return <AppShell><p className="text-sm text-muted">Nenhum perfil encontrado.</p></AppShell>;

  function handleExport() {
    const json = exportUserDataJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "calistrack-dados.json"; a.click();
    URL.revokeObjectURL(url);
  }

  async function handleEnableNotifications() {
    const permission = await requestNotificationPermission();
    if (!profile) return;
    updateProfile({ ...profile, reminderPreferences: { ...profile.reminderPreferences, notificationPermissionState: permission, enabled: permission === "granted" } });
    toast[permission === "granted" ? "success" : "error"](permission === "granted" ? "Notificacoes ativadas." : "Permissao nao concedida.");
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-bold">Perfil</h1>
      <div className="mt-6 flex flex-col gap-4">
        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-semibold">{profile.fullName}</p>
          <p className="text-sm text-muted">Nivel: {profile.level} - Objetivo: {profile.primaryGoal}</p>
          <p className="text-sm text-muted">Fuso horario: {profile.timezone}</p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="font-semibold">Lembretes</h2>
          <p className="mt-1 text-sm text-muted">
            Notificacoes: {profile.reminderPreferences.notificationPermissionState}
          </p>
          {supported && (
            <button onClick={handleEnableNotifications} className="mt-2 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black">
              Ativar notificacoes do navegador
            </button>
          )}
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <h2 className="font-semibold">Dados</h2>
          <div className="mt-2 flex gap-2">
            <button onClick={handleExport} className="rounded-md border border-border px-3 py-2 text-sm">Exportar dados (JSON)</button>
            <button onClick={() => { clearAllUserData(); toast.success("Dados locais apagados."); }} className="rounded-md border border-danger px-3 py-2 text-sm text-danger">
              Apagar dados locais
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
