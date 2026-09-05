import { VideoOff } from "lucide-react";
import { Exercise } from "@/types";

function toEmbedUrl(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = url.includes("youtu.be") ? url.split("/").pop() : new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("vimeo.com")) return `https://player.vimeo.com/video/${url.split("/").pop()}`;
  return url;
}

export function ExerciseVideoPlayer({ exercise }: { exercise: Exercise }) {
  if (!exercise.videoUrl) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface text-muted">
        <VideoOff size={28} /><p className="text-sm">Video ainda nao adicionado</p>
      </div>
    );
  }
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
      <iframe src={toEmbedUrl(exercise.videoUrl)} title={`Demonstracao de ${exercise.name}`} className="h-full w-full" allowFullScreen />
    </div>
  );
}
