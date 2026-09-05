"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalProfile } from "@/hooks/use-local-profile";

export default function CadastroPage() {
  const router = useRouter();
  const { createDefaultProfile } = useLocalProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("Preencha todos os campos."); return; }
    createDefaultProfile(name);
    toast.success("Conta criada em modo local. Vamos configurar sua rotina!");
    router.push("/onboarding");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-bold">Criar conta</h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} className="rounded-md border border-border bg-surface px-3 py-2" />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border border-border bg-surface px-3 py-2" />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border border-border bg-surface px-3 py-2" />
        <button type="submit" className="rounded-md bg-accent py-2 font-semibold text-black">Criar conta e continuar</button>
      </form>
      <p className="mt-4 text-center text-sm text-muted">Ja tem conta? <Link href="/login" className="text-accent">Entrar</Link></p>
    </div>
  );
}
