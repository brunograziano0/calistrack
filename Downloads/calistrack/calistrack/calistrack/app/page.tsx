import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <span className="text-xl font-bold text-accent">CalisTrack</span>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-muted hover:text-foreground">Entrar</Link>
          <Link href="/cadastro" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black">Comecar agora</Link>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          Treino de calistenia planejado, guiado e mensuravel
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Agenda semanal, sessao guiada com video, lembretes e acompanhamento de evolucao.
        </p>
        <Link href="/cadastro" className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-sm font-semibold text-black">
          Criar minha rotina gratis
        </Link>
      </section>
      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        CalisTrack organiza e registra treinos. Nao substitui avaliacao profissional de saude.
      </footer>
    </div>
  );
}
