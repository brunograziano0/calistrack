"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { toast.error("Preencha e-mail e senha."); return; }
    toast.success("Modo de demonstracao: entrando sem backend configurado.");
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="text-2xl font-bold">Entrar no CalisTrack</h1>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border border-border bg-surface px-3 py-2" />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border border-border bg-surface px-3 py-2" />
        <button type="submit" className="rounded-md bg-accent py-2 font-semibold text-black">Entrar</button>
      </form>
      <p className="mt-4 text-center text-sm text-muted">Nao tem conta? <Link href="/cadastro" className="text-accent">Cadastre-se</Link></p>
    </div>
  );
}
