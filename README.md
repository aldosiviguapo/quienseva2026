# Quién se va · Simulador Argentina 2026 — V5

Esta versión agrega:

- Newell's y Racing como equipos comprometidos, además de los 7 anteriores.
- Un único registro por partido: los cruces entre equipos seguidos aparecen en ambas tarjetas.
- Si elegís G/E/P en una tarjeta, el resultado se refleja automáticamente en la tarjeta del rival.
- Resultados reales se consultan automáticamente desde el marcador público de ESPN para Argentina.
- La página consulta toda la ventana restante de la temporada, de modo que al volver a abrirla puede recuperar resultados jugados aunque no la hayas tenido abierta.
- Mientras la página esté abierta vuelve a consultar cada 60 segundos.
- Los resultados reales pasan a estado FINAL y dejan bloqueados los botones.
- Los escudos se cargan desde el CDN que usa TyC Sports para sus escudos.

## Publicación

Reemplazá el `index.html` de tu repositorio de GitHub por este archivo. No necesitás instalar nada.

## Fuente automática

La aplicación usa el endpoint público de marcador de ESPN (`site.api.espn.com`) para recuperar resultados del torneo argentino. Es una interfaz pública no oficial/documentada de ESPN; si en el futuro cambia o deja de responder, la página conserva el último snapshot guardado en el navegador.

## Datos de corte

El snapshot base corresponde al estado previo a los dos partidos que cerraban la Fecha 8 del 7/09/2026. Las tablas iniciales fueron contrastadas con la tabla anual y la tabla de promedios publicadas el 7/09/2026.

## Regla de descenso

1) Último de Promedios.
2) Último de Tabla Anual.
3) Si el mismo equipo ocupa ambas últimas posiciones, el segundo descenso pasa al anteúltimo de la Tabla Anual.


## Qué se actualiza automáticamente
La aplicación ahora conserva todo el fixture restante (no solo los partidos de los nueve equipos) para que los resultados reales de cualquier encuentro de la Liga Profesional modifiquen las dos tablas. Los nueve equipos seguidos siguen siendo los únicos cuyos partidos aparecen en tarjetas de simulación.
