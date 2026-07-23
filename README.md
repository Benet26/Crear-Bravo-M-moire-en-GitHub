# Bravo Mémoire — francés A1, A2 y B1

Aplicación personal para estudiar francés con tarjetas, conjugación, historias transformables, ejercicios, pronunciación y repetición espaciada.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Publicar en Vercel

1. Importa este repositorio en Vercel.
2. En **Settings → Environment Variables**, añade:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. Despliega. No subas archivos `.env` ni claves privadas al repositorio.

## Progreso en la nube

Ejecuta primero `supabase/schema.sql` en el SQL Editor de tu proyecto de Supabase. La app funciona también sin Supabase, guardando el progreso localmente en el navegador.

La voz usa las capacidades del navegador y cuenta con un modo de respaldo cuando no hay archivos de audio pregrabados.
