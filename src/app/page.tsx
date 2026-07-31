import Image from "next/image";
import { ShowcaseSection, type ShowcaseBlock } from "@/components/ShowcaseSection";

const showcases: ShowcaseBlock[] = [
  {
    id: "farm",
    kicker: "Modo Farm",
    title: "Se queda farmando mientras tú no estás",
    lead:
      "El bot mantiene el personaje en el spot: combate automático, potciones y vuelta al mapa si se desconecta o muere.",
    steps: [
      "Eliges mapa, wire y el punto visual en el mapa abierto (Spot Picker).",
      "Al iniciar, navega solo hasta ese spot y activa Auto.",
      "Si se acaba una poción, compra y regresa. Si hay desconexión, intenta recuperarse.",
    ],
    image: "/screens/farm-scene.png",
    imageAlt: "Personaje en Auto Navigating hacia el farm spot en Plain of Four Winds",
  },
  {
    id: "farm-bosses",
    kicker: "Farm Bosses",
    title: "Rota bosses con checkpoints, no como farm normal",
    lead:
      "Pensado para rutas de bosses: llega, pelea, y continúa por el siguiente hito sin “irse al farm spot” como si fuera Exp.",
    steps: [
      "Configuras la secuencia de bosses / checkpoints en el perfil.",
      "El loop sabe que el destino es el boss actual, no un spot de farm.",
      "Tras revive o compra, retoma el checkpoint correcto.",
    ],
    image: "/screens/farm-bosses.png",
    imageAlt: "Mapa abierto con bosses detectados (Crystal Deer) y scores del bot",
    reverse: true,
  },
  {
    id: "elf-giver",
    kicker: "Elf Buff Giver",
    title: "All → Focus → Union → buff → limpia y repite",
    lead:
      "En modo dador, el bot usa la barra de targeting: abre PK, busca aliados, confirma focus en HUD y lanza los buffs.",
    steps: [
      "Pasa a modo All y pulsa Focus hasta ver la barra de vida del objetivo.",
      "Cambia a Union (o UnionKuaFu en mapas cross) solo cuando el focus es válido.",
      "Castea, limpia el focus y vuelve a All para el siguiente ciclo.",
    ],
    image: "/screens/elf-pk-modes.png",
    imageAlt: "Selector de modos PK All Union Peace Team abierto",
  },
  {
    id: "elf-war",
    kicker: "Elf Buff War",
    title: "En guerra busca cambio en pantalla y buffea",
    lead:
      "En APEX/war no depende de “aliado cercano” por nombre: explora celdas alrededor del personaje y prioriza donde la imagen cambió.",
    steps: [
      "Toma una referencia vacía del área y detecta movimiento / aparición de jugadores.",
      "Toca celdas prioritarias (sur-este, sur, etc.) buscando HUD de focus.",
      "Si hay focus Union válido, buffea; si no, sigue explorando con cooldown.",
    ],
    image: "/screens/elf-war.jpg",
    imageAlt: "Sesión de elf buff en modo war",
    reverse: true,
  },
  {
    id: "navigation",
    kicker: "Navegación",
    title: "Lista de mapas, teleport y cambio de wire",
    lead:
      "Abre el mapa del juego, encuentra la zona (con scroll si hace falta), teletransporta y cambia de canal HUD antes de ir al spot.",
    steps: [
      "Reconoce filas del listado con plantillas (mapsui) y hace scroll si el mapa está abajo.",
      "Espera a que el mundo cargue (techos adaptativos Normal / Rápido).",
      "Abre el selector de wire, elige el canal y confirma Switch Lane.",
    ],
    image: "/screens/nav-divine.png",
    imageAlt: "Título de mapa en la UI de navegación",
  },
  {
    id: "app",
    kicker: "App del bot",
    title: "Perfiles, modos e idioma en un solo panel",
    lead:
      "La app Android (BlueStacks) concentra perfiles, modo de juego, spots y ajustes de sistema — incluido Normal / Rápido.",
    steps: [
      "Creas un perfil con mapa, wire y spot visual calibrado.",
      "Eliges el modo: farm, farm bosses, elf giver o elf war.",
      "Arrancas desde el home; el worker hace el resto en segundo plano.",
    ],
    image: "/screens/app-home.png",
    imageAlt: "Pantalla principal de la app MUAmaizingBot",
    reverse: true,
  },
];

export default function HomePage() {
  return (
    <main className="relative bg-ink text-fog">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-10">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-brass uppercase">
          MUAmaizingBot
        </p>
        <a
          href="#modos"
          className="text-xs tracking-wide text-mist transition hover:text-brass"
        >
          Ver modos
        </a>
      </header>

      <section className="relative isolate min-h-[100svh] overflow-hidden noise-veil">
        <div className="absolute inset-0">
          <Image
            src="/screens/hero-atmosphere.png"
            alt=""
            fill
            priority
            className="animate-drift object-cover object-center opacity-55"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,11,16,0.35)_45%,rgba(7,11,16,0.92)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-10 md:pb-24 md:pt-20">
          <p className="animate-rise font-[family-name:var(--font-display)] text-5xl leading-none font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
            MUAmaizingBot
          </p>
          <h1 className="animate-rise-delay-1 mt-6 max-w-2xl font-[family-name:var(--font-display)] text-2xl font-medium text-fog sm:text-3xl md:text-4xl">
            El bot de visión para MU Immortal
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            Farm, bosses, elf buff giver y war — guiado por plantillas y OCR sobre la
            pantalla del emulador. Aquí ves qué hace hoy, paso a paso.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-4">
            <a
              href="#modos"
              className="inline-flex items-center bg-brass px-6 py-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-ink transition hover:bg-[#e0c484]"
            >
              Recorrer lo que hace
            </a>
            <a
              href="#app"
              className="inline-flex items-center border border-[var(--line)] px-6 py-3 font-[family-name:var(--font-display)] text-sm tracking-wide text-fog transition hover:border-brass hover:text-brass"
            >
              Ver la app
            </a>
          </div>
        </div>
      </section>

      <section
        id="modos"
        className="border-t border-[var(--line)] px-5 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] text-brass uppercase">
            Cómo funciona
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
            No es un macro ciego: lee la UI del juego
          </h2>
          <p className="mt-4 max-w-2xl text-mist md:text-lg">
            Cada acción (abrir mapa, cambiar wire, focus, buff) se valida con
            capturas de pantalla. Abajo, cada modo con su pantalla y una guía
            corta.
          </p>
        </div>
      </section>

      {showcases.map((block) => (
        <ShowcaseSection key={block.id} block={block} />
      ))}

      <section className="border-t border-[var(--line)] px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] text-brass uppercase">
              Próximo
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-white md:text-4xl">
              Descarga y licencias, más adelante
            </h2>
            <p className="mt-4 max-w-lg text-mist">
              Esta página es el escaparate de lo que el bot ya hace. Cuando
              publiquemos APKs y activación, vivirán aquí — por ahora priorizamos
              claridad.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden border border-[var(--line)]">
            <Image
              src="/screens/app-drawer.png"
              alt="Menú lateral de la app MUAmaizingBot"
              fill
              className="object-cover object-left"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-mist/70 md:flex-row md:items-center md:justify-between">
          <p className="font-[family-name:var(--font-display)] tracking-wide text-brass/80">
            MUAmaizingBot
          </p>
          <p>www.muamaizingbot.com · Bot no afiliado a Webzen / MU Immortal</p>
        </div>
      </footer>
    </main>
  );
}
