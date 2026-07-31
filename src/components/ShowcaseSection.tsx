import Image from "next/image";

export type ShowcaseBlock = {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  steps: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export function ShowcaseSection({ block }: { block: ShowcaseBlock }) {
  return (
    <section
      id={block.id}
      className="relative border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28"
    >
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 md:gap-16 ${
          block.reverse ? "md:grid-cols-[1.05fr_0.95fr]" : "md:grid-cols-[0.95fr_1.05fr]"
        }`}
      >
        <div className={block.reverse ? "md:order-2" : undefined}>
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] text-brass uppercase">
            {block.kicker}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {block.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            {block.lead}
          </p>
          <ol className="mt-8 space-y-4">
            {block.steps.map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-relaxed text-fog/90 md:text-base">
                <span className="mt-0.5 font-[family-name:var(--font-display)] text-brass tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <figure
          className={`relative overflow-hidden rounded-sm border border-[var(--line)] bg-ink-soft shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${
            block.reverse ? "md:order-1" : ""
          }`}
        >
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={block.image}
              alt={block.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
          <figcaption className="border-t border-[var(--line)] px-4 py-3 text-xs tracking-wide text-mist/80">
            Captura real del bot en emulador · {block.kicker}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
