"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Dumbbell, Home, LineChart, ListChecks, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/rotina", label: "Rotina", icon: ListChecks },
  { href: "/exercicios", label: "Exercicios", icon: Dumbbell },
  { href: "/progresso", label: "Progresso", icon: LineChart },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-border bg-surface p-4 md:flex">
        <span className="mb-8 px-2 text-xl font-bold text-accent">CalisTrack</span>
        <nav className="flex flex-1 flex-col gap-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                active ? "bg-accent/15 text-accent" : "text-muted hover:bg-background hover:text-foreground")}>
                <Icon size={18} />{label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 pb-20 md:pb-8">
        <div className="mx-auto w-full max-w-5xl px-4 py-6">{children}</div>
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 backdrop-blur md:hidden">
        {items.filter((i) => i.href !== "/rotina").map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link key={href} href={href} className={cn("flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium", active ? "text-accent" : "text-muted")}>
              <Icon size={20} />{label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
