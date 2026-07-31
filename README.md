# MUAmaizingBot Landing

Sitio público de **https://www.muamaizingbot.com**.

## Objetivo (fase 1)

Mostrar qué hace el bot con capturas reales y textos didácticos.
Descarga de APK / licencia: más adelante.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue (Vercel)

1. Crea un proyecto en Vercel apuntando a este repo.
2. Dominio: `www.muamaizingbot.com` (+ redirect apex → www si quieres).
3. Build: `next build` (default).

## Sustituir pantallas

Coloca nuevas capturas en `public/screens/` y actualiza las rutas en
`src/app/page.tsx` (`showcases` + hero).
