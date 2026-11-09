import Image from "next/image";
import type { ReactNode } from "react";

/** Building blocks for the /manual page. */

export function Chapter({ id, n, title, intro, children }: { id: string; n: number; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[var(--line)] py-14 first:border-t-0 first:pt-0">
      <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] text-brass uppercase">
        Paso {String(n).padStart(2, "0")}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {intro && <p className="mt-3 max-w-2xl text-mist md:text-lg">{intro}</p>}
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-brass/60 font-[family-name:var(--font-display)] text-sm text-brass tabular-nums">
            {i + 1}
          </span>
          <span className="pt-0.5 text-fog/90">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Shot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="overflow-hidden border border-[var(--line)] bg-ink-soft">
      <a href={src} target="_blank" rel="noopener noreferrer" className="block" aria-label={`Ver ${alt} en grande`}>
        <div className="relative aspect-[16/9] w-full">
          <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 760px" className="object-contain" />
        </div>
      </a>
      {caption && <figcaption className="border-t border-[var(--line)] px-4 py-2.5 text-sm text-mist">{caption}</figcaption>}
    </figure>
  );
}

export function Tip({ children, tone = "tip" }: { children: ReactNode; tone?: "tip" | "warn" }) {
  const styles =
    tone === "warn"
      ? "border-ember/60 bg-ember/10 text-fog"
      : "border-emerald/60 bg-emerald/10 text-fog";
  return (
    <div className={`border-l-2 px-4 py-3 text-sm leading-relaxed ${styles}`}>
      <span className="mr-2 font-semibold text-white">{tone === "warn" ? "Ojo:" : "Consejo:"}</span>
      {children}
    </div>
  );
}

export function Pair({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 lg:grid-cols-2">{children}</div>;
}

export function Option({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="border border-[var(--line)] p-4">
      <p className="font-[family-name:var(--font-display)] font-semibold text-white">{name}</p>
      <p className="mt-1 text-sm leading-relaxed text-mist">{children}</p>
    </div>
  );
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}
