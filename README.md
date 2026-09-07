# Quién se va · Simulador de descenso 2026 — V4

Esta versión reemplaza la interfaz anterior por una estructura inspirada en la referencia mostrada por el usuario:

- tarjetas por equipo;
- fixture en cada tarjeta;
- botones G / E / P;
- tablas debajo;
- actualización inmediata;
- regla de coincidencia anual/promedios;
- fixture de las fechas 9 a 16 para los 7 equipos más comprometidos.

## Publicación

En GitHub, reemplazá **solo `index.html`** por el `index.html` de este ZIP. Esta V4 está autocontenida: no necesitás subir varios archivos.

## Regla de descenso implementada

Primero desciende el último de Promedios. El segundo descenso es para el último de la Tabla Anual, excluyendo al equipo ya descendido por Promedios. Por lo tanto, si ambos últimos son el mismo equipo, el segundo descenso pasa al anteúltimo de la Tabla Anual.

Esta lógica corresponde al artículo 93 del Estatuto de AFA y al artículo 26.2 del Reglamento de Primera División 2026.

## Corte de datos

Snapshot utilizado: 7/09/2026 antes de los partidos Barracas Central–Argentinos Juniors y Unión–Instituto, con resultados publicados hasta el 6/09/2026.

Fuentes de referencia:
- AFA / Reglamento Primera División 2026.
- Liga Profesional / fixture oficial 2026.
- FutbolArgentino.com / tabla anual.
- Radio TV Valle Viejo / tabla anual y promedios al 6/09/2026.

Los datos quedan embebidos en el `index.html` para que GitHub Pages lo sirva como sitio estático.
