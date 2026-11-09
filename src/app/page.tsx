import Image from "next/image";
import type { ReactNode } from "react";
import { ModeTabs, type Mode } from "@/components/ModeTabs";
import { Reveal } from "@/components/Reveal";
import { WhatsAppFloat, WhatsAppLink } from "@/components/WhatsAppButton";
import { getLatestRelease } from "@/lib/release";

export const revalidate = 600;

const facts = ["Sin root", "Android 9 o superior", "BlueStacks y teléfonos", "Español · English · Português"];

type Feature = { title: string; text: string; icon: ReactNode };

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
    {path}
  </svg>
);

const features: Feature[] = [
  {
    title: "Farmea en tu spot",
    text: "Viaja solo al mapa, wire y lugar que elegiste, activa el combate y vuelve si se aleja.",
    icon: icon(<><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>),
  },
  {
    title: "Caza bosses",
    text: "Recorre tus mapas y wires, encuentra los bosses vivos y pelea. Si uno está disputado, pasa al siguiente.",
    icon: icon(<><path d="M5 20h14" /><path d="M6 20l-1-9 4 3 3-7 3 7 4-3-1 9" /></>),
  },
  {
    title: "Alterna farm y bosses",
    text: "Programa ciclos u horarios: bosses cuando conviene, farm el resto del tiempo.",
    icon: icon(<><path d="M4 12a8 8 0 0 1 14-5.3L20 9" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 0 1-14 5.3L4 15" /><path d="M4 20v-5h5" /></>),
  },
  {
    title: "Buff de elfa",
    text: "Va por el buff cuando se acaba, o convierte a tu elfa en quien reparte buffs, también en guerra y APEX.",
    icon: icon(<><path d="M12 3l2.6 5.6L20 9.5l-4 4 1 5.8L12 16.6 7 19.3l1-5.8-4-4 5.4-.9Z" /></>),
  },
  {
    title: "Compra pociones",
    text: "Nota cuando se acaban, compra en la tienda y regresa a lo que estaba haciendo.",
    icon: icon(<><path d="M9 3h6" /><path d="M10 3v5L5.5 16a3 3 0 0 0 2.6 4.5h7.8a3 3 0 0 0 2.6-4.5L14 8V3" /><path d="M7.5 14h9" /></>),
  },
  {
    title: "Revive y vuelve",
    text: "Si tu personaje muere, revive, recupera el buff y regresa a su puesto.",
    icon: icon(<><path d="M12 21c4.4 0 8-3.6 8-8 0-5-4-8-8-11-4 3-8 6-8 11 0 4.4 3.6 8 8 8Z" /><path d="M12 10v6M9 13h6" /></>),
  },
  {
    title: "Inventario y mascota",
    text: "Recicla cuando el inventario se llena y mantiene la mascota correcta para cada modo.",
    icon: icon(<><rect x="4" y="7" width="16" height="13" rx="1.5" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>),
  },
  {
    title: "Te avisa por Telegram",
    text: "Si el juego se desconecta te llega una alerta. Opcional: que intente reconectar solo.",
    icon: icon(<><path d="M21 4 3 11l6 2 2 6 3-4 5 4Z" /><path d="m9 13 8-6" /></>),
  },
];

const modes: Mode[] = [
  {
    id: "farm",
    label: "Farm",
    title: "Sube de nivel mientras no juegas",
    summary: "Eliges dónde farmear y el bot se encarga de llegar, pelear y quedarse ahí.",
    points: [
      "Marca tu spot tocándolo en el mapa del juego.",
      "Si muere, se queda sin pociones o pierde el buff, lo resuelve y vuelve.",
      "Opcional: entra a Devil Square cuando abre.",
    ],
    image: "/screens/farm.jpg",
    imageAlt: "Personaje farmeando en su spot con el combate automático activo",
  },
  {
    id: "bosses",
    label: "Bosses",
    title: "Una ruta de bosses que se recorre sola",
    summary: "Le das una lista de mapas y el bot revisa cada wire buscando bosses vivos.",
    points: [
      "Solo va por los bosses que siguen vivos.",
      "Si otro jugador lo pelea y te mata, lo salta un rato.",
      "Combina con el farm por ciclos u horario.",
    ],
    image: "/screens/bosses-map.jpg",
    imageAlt: "Mapa del juego con los bosses vivos marcados",
  },
  {
    id: "elf",
    label: "Elfa que da buff",
    title: "Tu elfa reparte buffs a tu grupo",
    summary: "Se queda en un punto y da buff a los aliados que pasan, una y otra vez.",
    points: [
      "Busca aliados cercanos y les lanza los buffs.",
      "Solo apunta a tu grupo o unión, no a cualquiera.",
      "Ideal para acompañar a otras cuentas.",
    ],
    image: "/screens/elf-giver.jpg",
    imageAlt: "Elfa con un aliado seleccionado para darle buff",
  },
  {
    id: "war",
    label: "Guerra / APEX",
    title: "Buff en guerra y APEX",
    summary: "En medio de la batalla busca a tus aliados en pantalla y les da buff sin parar.",
    points: [
      "Encuentra aliados aunque haya mucho movimiento.",
      "No cambia de modo ni se mueve de su puesto.",
      "Pensado para eventos con muchos jugadores.",
    ],
    image: "/screens/war-apex.jpg",
    imageAlt: "Elfa dando buff a su unión durante APEX",
  },
];

const steps = [
  { title: "Descarga e instala", text: "Baja el APK desde esta página e instálalo en tu teléfono o en BlueStacks." },
  { title: "Activa el bot", text: "Ingresa tu licencia y da los dos permisos que pide: accesibilidad y captura de pantalla." },
  { title: "Crea tu perfil y dale Play", text: "Elige el modo, el mapa y tu spot. Abre MU y presiona Play en el botón flotante." },
];

const faqs = [
  {
    q: "¿Necesito root?",
    a: "No. El bot mira la pantalla y toca como lo harías tú, con los permisos normales de Android.",
  },
  {
    q: "¿Funciona en mi teléfono?",
    a: "Sí, si tiene Android 9 o superior. Usa el APK principal; si tu teléfono es muy antiguo y no instala, prueba la versión de 32 bits.",
  },
  {
    q: "Google Play Protect bloquea la instalación",
    a: "Es normal en apps que no vienen de la Play Store. Toca “Más detalles” y luego “Instalar de todas formas”.",
  },
  {
    q: "No me deja activar la accesibilidad",
    a: "Android 13 o superior la marca como “configuración restringida”. Ve a Ajustes › Apps › MUAmaizingBot, abre el menú ⋮ y elige “Permitir configuración restringida”. Luego actívala de nuevo.",
  },
  {
    q: "¿Necesito una licencia?",
    a: "Sí. La app pide una clave al iniciar. Cada licencia admite un número de dispositivos a la vez. Pídela por WhatsApp con el botón verde.",
  },
  {
    q: "¿Cómo actualizo?",
    a: "Descarga la versión nueva desde aquí e instálala encima: tus perfiles se mantienen. Después vuelve a activar la accesibilidad.",
  },
];

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] text-brass uppercase">{children}</p>
  );
}

function DownloadButton({ size, className = "" }: { size?: number | null; className?: string }) {
  return (
    <a
      href="/descargar"
      className={`group inline-flex items-center gap-3 bg-brass px-6 py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-ink transition hover:bg-[#e0c484] ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 transition group-hover:translate-y-0.5" aria-hidden>
        <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Descargar APK{size ? ` · ${size} MB` : ""}
    </a>
  );
}

export default async function HomePage() {
  const release = await getLatestRelease();

  return (
    <main className="relative bg-ink text-fog">
      <header className="fixed inset-x-0 top-0 z-30 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-10">
          <a href="#" className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-brass uppercase">
            MUAmaizingBot
          </a>
          <nav className="flex items-center gap-5 text-xs tracking-wide text-mist">
            <a href="#que-hace" className="hidden transition hover:text-brass sm:inline">Qué hace</a>
            <a href="#modos" className="hidden transition hover:text-brass sm:inline">Modos</a>
            <a href="/manual" className="transition hover:text-brass">Manual</a>
            <a href="#preguntas" className="hidden transition hover:text-brass md:inline">Preguntas</a>
            <a href="#descargar" className="border border-brass/70 px-3 py-1.5 text-brass transition hover:bg-brass hover:text-ink">
              Descargar
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate min-h-[100svh] overflow-hidden noise-veil">
        <div className="absolute inset-0">
          <Image
            src="/screens/hero.jpg"
            alt=""
            fill
            priority
            className="animate-drift object-cover object-center opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,16,0.35)_45%,rgba(7,11,16,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-10 md:pb-24">
          <p className="animate-rise font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-brass uppercase">
            Bot para MU en Android
          </p>
          <h1 className="animate-rise-delay-1 mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
            Tu personaje sigue avanzando, aunque no estés jugando.
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            MUAmaizingBot juega por ti: farmea, caza bosses, reparte buffs y se recupera solo cuando algo sale mal.
          </p>
          <div className="animate-rise-delay-2 mt-9 flex flex-wrap items-center gap-4">
            <DownloadButton size={release?.sizeMb.arm64} />
            <a
              href="#que-hace"
              className="inline-flex items-center border border-[var(--line)] px-6 py-3.5 font-[family-name:var(--font-display)] text-sm tracking-wide text-fog transition hover:border-brass hover:text-brass"
            >
              Ver qué hace
            </a>
          </div>
          {release && (
            <p className="animate-rise-delay-2 mt-4 text-xs text-mist/80">
              Versión {release.version} · {formatDate(release.publishedAt)}
            </p>
          )}
          <ul className="animate-rise-delay-2 mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fog/80">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-emerald" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section id="que-hace" className="scroll-mt-20 border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker>Qué hace por ti</Kicker>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
              Lo repetitivo, en piloto automático
            </h2>
            <p className="mt-4 max-w-2xl text-mist md:text-lg">
              Configuras una vez. El bot cuida a tu personaje las horas que haga falta.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 80} className="h-full">
                <article className="group h-full bg-ink p-6 transition hover:bg-ink-soft">
                  <div className="text-brass transition group-hover:-translate-y-0.5">{f.icon}</div>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section id="modos" className="scroll-mt-20 border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker>Modos</Kicker>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
              Elige cómo quieres jugar
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <ModeTabs modes={modes} />
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Kicker>Cómo empezar</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
              Listo en tres pasos
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <a href="/manual" className="mt-4 inline-flex items-center gap-2 text-brass underline decoration-brass/40 underline-offset-4 transition hover:decoration-brass">
              Ver el manual completo con capturas →
            </a>
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 120} className="border-t border-brass/50 pt-6">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-brass/30 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-mist">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Download */}
      <section id="descargar" className="relative scroll-mt-20 overflow-hidden border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,176,106,0.12),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <Kicker>Descarga</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-5xl">
              Siempre la última versión
            </h2>
            <p className="mt-4 max-w-lg text-mist md:text-lg">
              Este botón descarga la versión más reciente. Para actualizar, instálala encima de la anterior: tus perfiles se conservan.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <DownloadButton size={release?.sizeMb.arm64} />
              <a href="/descargar/32" className="text-sm text-mist underline decoration-[var(--line)] underline-offset-4 transition hover:text-brass">
                ¿Teléfono antiguo? Descarga la versión de 32 bits{release?.sizeMb.arm32 ? ` (${release.sizeMb.arm32} MB)` : ""}
              </a>
            </div>
            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <p className="text-sm text-mist">¿Aún no tienes licencia o tienes dudas?</p>
              <WhatsAppLink label="Pide tu licencia por WhatsApp" className="mt-3" />
            </div>
            {release && (
              <p className="mt-6 text-xs text-mist/70">
                Versión {release.version} · publicada el {formatDate(release.publishedAt)}
              </p>
            )}
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[16/9] overflow-hidden border border-[var(--line)] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <Image
                src="/screens/boss-fight.jpg"
                alt="Personaje peleando contra un boss"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="scroll-mt-20 border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Kicker>Preguntas frecuentes</Kicker>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
              Antes de instalar
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-lg text-white transition hover:text-brass">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-brass transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-mist">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-mist/70 md:flex-row md:items-center md:justify-between">
          <p className="font-[family-name:var(--font-display)] tracking-wide text-brass/80">MUAmaizingBot</p>
          <a href="/manual" className="transition hover:text-brass">Manual de usuario</a>
          <p>www.muamaizingbot.com · No afiliado a Webzen ni a los desarrolladores de MU</p>
        </div>
      </footer>

      <WhatsAppFloat />
    </main>
  );
}
