# Simulador del Descenso — Argentina 2026

Web estática de HTML/CSS/JavaScript.

## Cómo usarla
Abrí `index.html` en un navegador.

## Cómo publicarla gratis
Podés subir estos archivos a un repositorio de GitHub y activar GitHub Pages.

## IMPORTANTE SOBRE ESTA PRIMERA ENTREGA
Al 7/9/2026, cuando se preparó esta versión, todavía estaban pendientes los dos partidos que cerraban la Fecha 8:
- Barracas Central vs Argentinos Juniors
- Unión vs Instituto

Por eso `data.js` deja el snapshot final y el fixture marcados como pendientes de verificación. La lógica de la aplicación ya está separada de los datos para poder actualizar únicamente `data.js`.

Antes de publicar como versión definitiva, hay que reemplazar:
- `DATA.teams`
- `DATA.fixtures`
- `DATA.focusIds` (opcional; se calcula automáticamente si queda vacío)

No usar esta primera entrega como fuente oficial de posiciones hasta completar esa actualización.
