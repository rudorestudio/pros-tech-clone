"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { testimonialsData, type Testimonial } from "@/lib/testimonials-data";

function getBgColor(name: string) {
  const colors = [
    "bg-[hsl(var(--blue))]",
    "bg-[hsl(var(--pink))]",
    "bg-[hsl(var(--yellow))]",
    "bg-emerald-500",
    "bg-red-400",
    "bg-violet-500",
    "bg-orange-400",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialPickerAvatar({
  testimonial,
  selected,
  onClick,
  size = "small",
}: {
  testimonial: Testimonial;
  selected?: boolean;
  onClick?: () => void;
  size?: "small" | "large";
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const frame =
    size === "large"
      ? "size-[140px] sm:size-[155px]"
      : "size-[72px] sm:size-[90px] md:size-[100px]";
  const initialsText =
    size === "large" ? "text-4xl sm:text-5xl" : "text-lg sm:text-2xl";

  const photo = testimonial.photo?.trim();
  const showImage = Boolean(photo) && !imgFailed;

  return (
    <button
      type="button"
      className={`relative shrink-0 rounded-full border-2 border-foreground ${frame} cursor-pointer transition-all duration-300 overflow-hidden bg-muted ${selected ? "ring-4 ring-[hsl(var(--blue))] ring-offset-2 ring-offset-[hsl(var(--bg-soft))]" : "hover:scale-105"}`}
      onClick={onClick}
      aria-label={`Témoignage de ${testimonial.name}`}
      aria-pressed={selected}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- URLs Drive / Google + fichiers publics
        <img
          alt=""
          className="block size-full object-cover"
          src={photo}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          className={`flex size-full items-center justify-center text-white font-extrabold ${getBgColor(testimonial.name)} ${initialsText}`}
        >
          {getInitials(testimonial.name)}
        </div>
      )}
    </button>
  );
}

export function TestimonialChallengersSection() {
  const [selectedId, setSelectedId] = useState<string | null>(testimonialsData[0]?.id ?? null);
  const selected = selectedId ? testimonialsData.find((t) => t.id === selectedId) ?? null : null;

  return (
    <section className="bg-background">
      <div className="container mx-auto py-24 px-4">
        <h2 className="text-center text-3xl md:text-5xl mb-16">
          C&apos;est sûr que tu seras ébloui par <br />
          ces <span className="text-[hsl(var(--pink))] underline-wavy">témoignages</span>.
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-6xl mx-auto items-start justify-center">
          <div className="card-pop p-8 w-full lg:max-w-[616px]">
            <MessageCircle className="w-8 h-8 text-[hsl(var(--pink))] mb-4" />
            {selected ? (
              <>
                <p className="text-lg leading-relaxed whitespace-pre-line text-foreground">{selected.text}</p>
                <p className="mt-6 font-bold text-[hsl(var(--blue))] text-lg">{selected.name}</p>
              </>
            ) : (
              <p className="text-muted-foreground text-lg">Cliquez sur un challenger pour lire son témoignage.</p>
            )}
            <div className="mt-6 flex gap-2">
              <span className="inline-block size-3 rounded-full bg-[hsl(var(--blue))]" />
              <span className="inline-block size-3 rounded-full bg-muted" />
              <span className="inline-block size-3 rounded-full bg-muted" />
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            <div className="flex justify-center">
              <TestimonialPickerAvatar
                testimonial={testimonialsData[0]}
                selected={selectedId === testimonialsData[0].id}
                onClick={() => setSelectedId(testimonialsData[0].id)}
                size="large"
              />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-2 sm:gap-3 w-full max-w-lg lg:max-w-none justify-items-center">
              {testimonialsData.slice(1).map((t) => (
                <TestimonialPickerAvatar
                  key={t.id}
                  testimonial={t}
                  selected={selectedId === t.id}
                  onClick={() => setSelectedId(t.id)}
                  size="small"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
