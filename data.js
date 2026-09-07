/*
  DATOS DEL SIMULADOR
  --------------------
  Este archivo es la única fuente de datos que debe modificarse cuando se cierre
  oficialmente la Fecha 8. La web y sus cálculos no dependen de datos escritos en HTML.

  IMPORTANTE: al 07/09/2026 todavía estaban pendientes Barracas Central-Argentinos
  y Unión-Instituto. Por eso esta primera entrega deja explícito el estado provisional.
*/
const DATA = {
  snapshotLabel: "7 de septiembre de 2026 · cierre de Fecha 8 pendiente",
  verified: false,

  // Equipos y puntos de referencia. Reemplazar por el snapshot final de Fecha 8.
  // annualPoints = puntos de la Tabla Anual al corte.
  // annualPlayed = partidos de Apertura + Clausura computables para la anual.
  // averagePoints = puntos computables para promedios.
  // averagePlayed = partidos computables para promedios.
  teams: [
    ["Boca Juniors",30,24,159,89],["River Plate",29,24,152,89],["Vélez",34,24,144,89],
    ["Racing Club",25,24,144,89],["Argentinos Juniors",35,23,142,89],["Rosario Central",29,24,141,89],
    ["Estudiantes (LP)",31,24,136,89],["Independiente",30,24,134,89],["Lanús",27,24,133,89],
    ["Talleres",26,24,132,89],["Huracán",25,24,131,89],["Independiente Rivadavia",38,24,123,89],
    ["Unión",22,23,120,89],["Barracas Central",27,23,119,89],["San Lorenzo",25,24,118,89],
    ["Defensa y Justicia",23,24,115,89],["Gimnasia (LP)",29,24,112,89],["Belgrano",29,24,112,89],
    ["Deportivo Riestra",14,24,111,89],["Instituto",24,23,108,89],["Tigre",20,24,108,89],
    ["Platense",17,24,108,89],["Gimnasia (M)",22,24,19,16],["Central Córdoba",16,24,100,89],
    ["Atlético Tucumán",18,24,98,89],["Newell's",18,24,97,89],["Banfield",21,24,94,89],
    ["Sarmiento",19,24,89,89],["Aldosivi",9,24,41,48],["Estudiantes (RC)",8,24,5,16]
  ].map((x,i)=>({id:"t"+i,name:x[0],annualPoints:x[1],annualPlayed:x[2],averagePoints:x[3],averagePlayed:x[4]})),

  // Fixture: reemplazar/expandir por el fixture definitivo de los 7 últimos del corte final.
  // home/away son IDs de los equipos; solo se simulan partidos donde participa un equipo foco.
  fixtures: [
    // Ejemplo estructural. Se mantienen sin resultado para que la lógica quede lista.
  ],

  focusIds: []
};
