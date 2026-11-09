"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Mode = {
  id: string;
  label: string;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
};

const ROTATE_MS = 7000;

/** Mode picker: auto-advances until the visitor picks a tab. */
export function ModeTabs({ modes }: { modes: Mode[] }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % modes.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [auto, modes.length]);

  const mode = modes[index];

  return (
    <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
      <div>
        <div role="tablist" aria-label="Modos del bot" className="flex flex-wrap gap-2">
          {modes.map((m, i) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={i === index}
              aria-controls={`mode-panel-${m.id}`}
              onClick={() => {
                setIndex(i);
                setAuto(false);
              }}
              className={`relative overflow-hidden border px-4 py-2 font-[family-name:var(--font-display)] text-sm tracking-wide transition ${
                i === index
                  ? "border-brass bg-brass/10 text-brass"
                  : "border-[var(--line)] text-mist hover:border-brass/60 hover:text-fog"
              }`}
            >
              {m.label}
              {auto && i === index && (
                <span
                  key={`bar-${index}`}
                  aria-hidden
                  className="tab-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brass"
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>

        <div id={`mode-panel-${mode.id}`} role="tabpanel" key={mode.id} className="animate-rise mt-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl">
            {mode.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-mist md:text-lg">{mode.summary}</p>
          <ul className="mt-6 space-y-3">
            {mode.points.map((p) => (
              <li key={p} className="flex gap-3 text-fog/90">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-brass" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="relative self-start overflow-hidden border border-[var(--line)] bg-ink-soft shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[16/9] w-full">
          {modes.map((m, i) => (
            <Image
              key={m.id}
              src={m.image}
              alt={m.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className={`object-cover object-center transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== index}
            />
          ))}
        </div>
        <figcaption className="border-t border-[var(--line)] px-4 py-3 text-xs tracking-wide text-mist/80">
          Captura real · {mode.label}
        </figcaption>
      </figure>
    </div>
  );
}
