"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Plus, SkipForward } from "lucide-react";

export function RestTimer({ restSeconds, onFinished }: { restSeconds: number; onFinished?: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(restSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      ref.current = setInterval(() => setSecondsLeft((s) => {
        if (s <= 1) { setIsRunning(false); return 0; }
        return s - 1;
      }), 1000);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [isRunning]);

  useEffect(() => { if (secondsLeft === 0 && onFinished) onFinished(); }, [secondsLeft, onFinished]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
      <div>
        <span className="text-xs uppercase tracking-wide text-muted">Descanso</span>
        <p className="text-2xl font-bold tabular-nums">{minutes}:{seconds.toString().padStart(2, "0")}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setSecondsLeft((s) => s + 15)} className="rounded-md border border-border p-2 text-muted"><Plus size={16} /></button>
        <button onClick={() => setIsRunning((r) => !r)} className="rounded-md bg-accent p-2 text-black">
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={() => { setIsRunning(false); setSecondsLeft(0); }} className="rounded-md border border-border p-2 text-muted"><SkipForward size={16} /></button>
      </div>
    </div>
  );
}
