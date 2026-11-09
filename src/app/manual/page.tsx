import type { Metadata } from "next";
import Link from "next/link";
import { B, Chapter, Option, Pair, Shot, Steps, Tip } from "@/components/manual";
import { WhatsAppFloat, WhatsAppLink } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Manual de usuario",
  description: "Guía paso a paso de MUAmaizingBot: instalar, activar, crear tu perfil, marcar tu spot y elegir el modo de juego.",
};

const toc = [
  { id: "instalar", label: "Instalar" },
  { id: "activar", label: "Activar el bot" },
  { id: "perfil", label: "Crear tu perfil" },
  { id: "spot", label: "Marcar tu spot" },
  { id: "modos", label: "Elegir el modo" },
  { id: "mantenimiento", label: "Pociones, buff y pets" },
  { id: "avanzado", label: "Opciones avanzadas" },
  { id: "jugar", label: "Darle Play" },
  { id: "sistema", label: "Idioma y Telegram" },
  { id: "problemas", label: "Si algo falla" },
];

const problems: [string, string][] = [
  ["Play no hace nada", "Revisa en Inicio que Accesibilidad diga «Conectado» y Captura diga «Activa». Si no, actívalos de nuevo."],
  ["«Sin sesión activa» o licencia inválida", "Ve a Licencia, pega tu clave y toca Guardar. Si usas la licencia en otro dispositivo, detén el bot allí primero."],
  ["«Configurá el farm spot»", "Tu perfil no tiene punto. Ve a Perfiles › tu perfil › Lugares › Farm spot y márcalo en el mapa."],
  ["«Agregá al menos un mapa de bosses»", "En Lugares › Farm Bosses agrega uno o más mapas a tu ruta."],
  ["El personaje llega al spot pero no farmea", "Espera unos segundos: el bot activa Auto cuando confirma que llegó. Si no, revisa que el spot esté dentro del mapa caminable."],
  ["Se desconectó el juego", "El bot se pausa y te avisa por Telegram. Si activaste «Reconectar» en Avanzado, intentará volver solo."],
  ["Después de actualizar la app no funciona", "Android apaga la accesibilidad en cada actualización. Vuelve a activarla y da permiso de captura otra vez."],
  ["Algo raro que no está aquí", "Toca «Reportar» en el panel flotante: nos llega una captura y lo que estaba haciendo el bot."],
];

export default function ManualPage() {
  return (
    <main className="bg-ink text-fog">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-10">
          <Link href="/" className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-brass uppercase">
            MUAmaizingBot
          </Link>
          <nav className="flex items-center gap-5 text-xs tracking-wide text-mist">
            <Link href="/" className="transition hover:text-brass">Inicio</Link>
            <Link href="/#descargar" className="border border-brass/70 px-3 py-1.5 text-brass transition hover:bg-brass hover:text-ink">
              Descargar
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pt-14 pb-24 md:px-10">
        <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.3em] text-brass uppercase">Manual de usuario</p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-white md:text-5xl">
          De cero a farmeando en 10 minutos
        </h1>
        <p className="mt-4 max-w-2xl text-mist md:text-lg">
          Sigue los pasos en orden. Cada uno muestra la pantalla exacta de la app y qué tocar.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-mist uppercase">Contenido</p>
            <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3 lg:grid-cols-1">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="flex gap-2 text-mist transition hover:text-brass">
                    <span className="text-brass/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <Chapter id="instalar" n={1} title="Instalar la app" intro="Funciona en teléfonos Android 9 o superior y en BlueStacks.">
              <Steps
                items={[
                  <>Descarga el APK desde el <Link href="/#descargar" className="text-brass underline underline-offset-4">botón de descarga</Link>.</>,
                  <>Abre el archivo descargado y toca <B>Instalar</B>.</>,
                  <>Si aparece Google Play Protect, toca <B>Más detalles</B> › <B>Instalar de todas formas</B>. Es normal en apps que no vienen de la Play Store.</>,
                ]}
              />
              <Tip>En BlueStacks configura la pantalla en <B>1280×720</B> y <B>240 DPI</B> (Ajustes › Pantalla). Es la resolución con la que el bot trabaja mejor.</Tip>
            </Chapter>

            <Chapter id="activar" n={2} title="Activar el bot" intro="Antes del primer uso el bot necesita tu licencia y dos permisos de Android.">
              <Shot src="/manual/licencia.jpg" alt="Pantalla de Licencia" caption="Menú ☰ › Licencia. Pega tu clave y toca Guardar." />
              <Steps
                items={[
                  <>Abre el menú <B>☰</B> › <B>Licencia</B>, pega tu clave y toca <B>Guardar</B>.</>,
                  <>Vuelve a <B>Inicio</B>. Activa la <B>Accesibilidad</B>: es lo que permite al bot tocar la pantalla del juego.</>,
                  <>Toca <B>Iniciar captura</B> y acepta: así el bot puede ver el juego.</>,
                  <>Toca <B>Mostrar overlay</B> para tener el panel flotante encima del juego.</>,
                ]}
              />
              <Shot src="/manual/inicio.jpg" alt="Pantalla de Inicio" caption="Inicio: cuando todo está listo verás Accesibilidad «Conectado», Captura «Activa» y Overlay «Activo»." />
              <Tip tone="warn">
                En Android 13 o superior, si no te deja activar la accesibilidad: Ajustes › Apps › MUAmaizingBot › menú <B>⋮</B> › <B>Permitir configuración restringida</B>. Luego actívala de nuevo.
              </Tip>
              <WhatsAppLink label="¿No tienes licencia? Pídela por WhatsApp" />
            </Chapter>

            <Chapter id="perfil" n={3} title="Crear tu perfil" intro="Un perfil guarda todo lo de un personaje: qué hace, dónde y cómo se cuida. Puedes tener varios y elegir cuál está activo.">
              <Shot src="/manual/perfiles.jpg" alt="Lista de perfiles" caption="Menú ☰ › Perfiles. El perfil con la etiqueta ACTIVO es el que usa Play." />
              <Steps
                items={[
                  <>Ve a <B>Perfiles</B> y toca <B>Crear con asistente</B>.</>,
                  <>Escribe un nombre y elige el estilo de juego (lo explicamos en el paso 5).</>,
                  <>Toca <B>Siguiente</B> y sigue los 5 pasos del asistente. Al final toca <B>Empezar</B>.</>,
                ]}
              />
              <Shot src="/manual/asistente-estilo.jpg" alt="Asistente, paso 1" caption="Asistente, paso 1: nombre y estilo." />
              <Shot src="/manual/asistente-lugares.jpg" alt="Asistente, paso 2" caption="Paso 2: marca tu spot. El asistente no te deja seguir hasta que el punto esté puesto." />
              <p className="text-mist">
                Para cambiar algo después, toca tu perfil en la lista. El editor tiene cuatro secciones a la izquierda:
                <B> Estilo</B>, <B>Lugares</B>, <B>Mantenimiento</B> y <B>Avanzado</B>. Los cambios se guardan solos.
              </p>
              <Shot src="/manual/editor-estilo.jpg" alt="Editor de perfil, sección Estilo" caption="Editor del perfil. Arriba ves un resumen: programación, spot y mapas de bosses." />
            </Chapter>

            <Chapter id="spot" n={4} title="Marcar tu spot en el mapa" intro="Es el lugar al que el bot lleva a tu personaje a farmear. Se marca tocando el mapa del juego, igual que en MU.">
              <Shot src="/manual/editor-lugares.jpg" alt="Sección Lugares" caption="Lugares: farm spot, mapas de bosses, zona del elfo y salida tras el buff." />
              <Steps
                items={[
                  <>En tu perfil abre <B>Lugares</B> › <B>Farm spot</B>.</>,
                  <>Elige la mascota que usará al farmear y toca <B>Editar punto en mapa</B>.</>,
                  <>Arriba elige el <B>Mapa</B> y el <B>Wire</B>.</>,
                  <>Toca en el mapa el lugar exacto donde quieres farmear. Aparece un círculo y abajo las coordenadas del juego.</>,
                  <>Toca <B>Guardar</B>.</>,
                ]}
              />
              <Pair>
                <Shot src="/manual/spot-opciones.jpg" alt="Opciones del farm spot" caption="Mascota de farm y botón para editar el punto." />
                <Shot src="/manual/spot-mapa.jpg" alt="Selector de punto en el mapa" caption="El círculo verde es tu spot. Abajo: la coordenada (x: 216 y: 39)." />
              </Pair>
              <Tip>Usa <B>+</B> y <B>−</B> para acercar el mapa y ser más preciso. Si sabes la coordenada, puedes escribirla arriba en Coord X y Coord Y.</Tip>
              <p className="text-mist">La zona del elfo, la salida tras el buff y el puesto de guerra se marcan igual.</p>
            </Chapter>

            <Chapter id="modos" n={5} title="Elegir el modo de juego" intro="En Estilo eliges qué hace el bot. Puedes cambiarlo cuando quieras.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Option name="Solo farm">Va a tu spot, activa Auto y se queda ahí. Si se aleja, muere o necesita algo, vuelve solo.</Option>
                <Option name="Solo bosses">Recorre tu lista de mapas, busca bosses vivos en cada wire y los pelea.</Option>
                <Option name="Farm ↔ Bosses">Alterna los dos: caza bosses y descansa farmeando. Puedes programarlo por ciclos u horario.</Option>
                <Option name="Elf buff">Tu elfa se queda en un punto dando buff a tu grupo. Tiene versión para mundo abierto y para guerra/APEX.</Option>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">Armar tu ruta de bosses</h3>
              <Steps
                items={[
                  <>En <B>Lugares</B> toca <B>Farm Bosses</B>.</>,
                  <>En <B>Agregar mapa</B> busca el mapa (por ejemplo «Kalima») y tócalo. Se suma a <B>Tu ruta</B>.</>,
                  <>Ordena la ruta con las flechas <B>↑ ↓</B> o arrastrando. El bot la recorre en ese orden.</>,
                  <>Activa <B>Incluir golden mobs</B> si también quieres que cace los dorados.</>,
                ]}
              />
              <Shot src="/manual/bosses-ruta.jpg" alt="Ruta de bosses" caption="Tu ruta a la izquierda, mapas disponibles a la derecha." />

              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">Alternar farm y bosses</h3>
              <p className="text-mist">Con el estilo <B>Farm ↔ Bosses</B>, en <B>Programación</B> eliges:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Option name="Ciclos">Termina una vuelta completa de bosses y farmea en tu spot los minutos que elijas. Luego repite.</Option>
                <Option name="Horario">Indicas a qué hora (HH:MM) va al spot y a qué hora a bosses.</Option>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">Elfa que da buff</h3>
              <p className="text-mist">
                Marca el puesto de la elfa en Lugares. En <B>mundo abierto</B> da buff a los aliados que pasan. En
                <B> guerra / APEX</B> actívalo ya dentro del evento: busca aliados en pantalla y no se mueve de su puesto.
              </p>
            </Chapter>

            <Chapter id="mantenimiento" n={6} title="Pociones, buff y mascotas" intro="Así el bot cuida a tu personaje sin que estés mirando.">
              <Pair>
                <Shot src="/manual/mantenimiento.jpg" alt="Mantenimiento: pociones y buff" caption="Pociones y búsqueda del buff de elfa." />
                <Shot src="/manual/mantenimiento-sellos.jpg" alt="Mantenimiento: mascotas y sellos" caption="Mascotas y Random Teleport Seal." />
              </Pair>
              <div className="grid gap-4 sm:grid-cols-2">
                <Option name="Config Pociones">Cuando se acaban, compra la cantidad de stacks de HP y MP que indiques y vuelve.</Option>
                <Option name="Buscar elf buff">Si se acaba el buff, va a la zona del elfo (en Lugares), lo recibe y regresa.</Option>
                <Option name="Pet (Farm) / Pet (Bosses)">La mascota de cada modo. Si falta, la equipa o la compra.</Option>
                <Option name="Random Teleport Seal">Usa sellos para acortar caminatas largas hacia el spot. Puedes limitar cuántos usa por viaje.</Option>
              </div>
              <Tip>El inventario lleno se recicla solo y, si el personaje muere, revive y vuelve. No necesitas activarlo.</Tip>
            </Chapter>

            <Chapter id="avanzado" n={7} title="Opciones avanzadas" intro="No son necesarias para empezar, pero te dan más control.">
              <Pair>
                <Shot src="/manual/avanzado.jpg" alt="Avanzado: modo PK" caption="Modo PK y poderes." />
                <Shot src="/manual/avanzado-2.jpg" alt="Avanzado: más opciones" caption="Reconexión, Devil Square y bosses." />
              </Pair>
              <div className="grid gap-4 sm:grid-cols-2">
                <Option name="Modo PK">Peace no ataca a otros jugadores. Team, Union o All se defienden si alguien se acerca a tu spot.</Option>
                <Option name="Poderes en pelea">Elige qué tecla (1 a 7) usar, cada cuánto y en qué momento: farmeando, contra un boss o defendiéndote.</Option>
                <Option name="Reconectar si el juego se desconecta">Vuelve a entrar al juego solo y sigue con el modo.</Option>
                <Option name="Devil Square">Entra al evento en su horario y vuelve a lo que estaba haciendo.</Option>
                <Option name="Al morir en un boss">Qué evitar por 10 minutos si te matan peleando: nada, ese boss o todo el wire.</Option>
              </div>
            </Chapter>

            <Chapter id="jugar" n={8} title="Darle Play" intro="Abre MU, entra con tu personaje y usa el panel flotante.">
              <Shot src="/manual/overlay.jpg" alt="Panel flotante del bot sobre el juego" caption="Toca el botón MU para abrir el panel. Abajo: Play, Pausa y Stop." />
              <Steps
                items={[
                  <>Toca el botón redondo <B>MU</B> que flota sobre el juego.</>,
                  <>Toca <B>▶ Play</B>. El bot empieza con tu perfil activo.</>,
                  <><B>Pausa</B> lo detiene un momento; <B>Stop</B> lo apaga del todo.</>,
                  <>Si ves algo raro, toca <B>Reportar</B>: nos llega una captura para revisarlo.</>,
                ]}
              />
              <Tip>Puedes cambiar de modo rápido desde el panel con <B>Farm</B>, <B>Elf</B> y <B>Boss</B>.</Tip>
            </Chapter>

            <Chapter id="sistema" n={9} title="Idioma, alertas y velocidad" intro="Menú ☰ › Sistema.">
              <Pair>
                <Shot src="/manual/sistema.jpg" alt="Sistema: idioma y alertas" caption="Idioma de la app y alertas de Telegram." />
                <Shot src="/manual/sistema-telegram.jpg" alt="Sistema: Chat ID y velocidad" caption="Chat ID de Telegram y velocidad del bot." />
              </Pair>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">Recibir alertas en Telegram</h3>
              <Steps
                items={[
                  <>En Telegram abre <B>@MuAmaizingAlertBot</B> y toca <B>Start</B>.</>,
                  <>El bot te responde con tu <B>Chat ID</B>. Cópialo.</>,
                  <>Pégalo en Sistema, toca <B>Guardar Chat ID</B> y luego <B>Probar Telegram</B>.</>,
                ]}
              />
              <p className="text-mist">
                <B>Velocidad</B>: Normal espera un poco más al cargar pantallas; Rápido es más ágil. Si tu teléfono es lento, usa Normal.
              </p>
            </Chapter>

            <section id="problemas" className="scroll-mt-24 border-t border-[var(--line)] py-14">
              <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.28em] text-brass uppercase">Ayuda</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl">Si algo falla</h2>
              <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {problems.map(([q, a]) => (
                  <details key={q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-white transition hover:text-brass">
                      {q}
                      <span aria-hidden className="text-xl leading-none text-brass transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-sm text-mist">{a}</p>
                  </details>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <p className="text-mist">¿Sigues con dudas?</p>
                <WhatsAppLink />
              </div>
            </section>
          </div>
        </div>
      </div>

      <WhatsAppFloat />
    </main>
  );
}
