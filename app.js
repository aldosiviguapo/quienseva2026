let predictions = {};
const byId = Object.fromEntries(DATA.teams.map(t=>[t.id,t]));
const ptsFor = r => r==="V"?3:r==="E"?1:0;

function getFocusIds(){
  return [...DATA.teams].sort((a,b)=>a.annualPoints-b.annualPoints).slice(0,7).map(t=>t.id);
}
DATA.focusIds = DATA.focusIds.length ? DATA.focusIds : getFocusIds();

function projectedTeams(){
  return DATA.teams.map(t=>({...t}));
}

function calculate(){
  const teams = projectedTeams();
  const map = Object.fromEntries(teams.map(t=>[t.id,t]));
  Object.entries(predictions).forEach(([matchId,r])=>{
    const m=DATA.fixtures.find(x=>x.id===matchId); if(!m||!r)return;
    const p=ptsFor(r);
    map[m.focus].annualPoints += p;
    map[m.focus].annualPlayed += 1;
    map[m.focus].averagePoints += p;
    map[m.focus].averagePlayed += 1;
    if(m.away && m.home && m.focus!==m.other){
      // Same match may be displayed for either focus team, but predictions are keyed once.
      const other=map[m.other];
      if(other){
        const otherP = r==="E"?1:(r==="V"?0:3);
        other.annualPoints += otherP;
        other.annualPlayed += 1;
        other.averagePoints += otherP;
        other.averagePlayed += 1;
      }
    }
  });
  return teams;
}

function avg(t){return t.averagePlayed ? t.averagePoints/t.averagePlayed : 0}
function render(){
  const teams=calculate();
  const annual=[...teams].sort((a,b)=>b.annualPoints-a.annualPoints || a.name.localeCompare(b.name));
  const averages=[...teams].sort((a,b)=>avg(b)-avg(a) || a.name.localeCompare(b.name));
  const bottomAnnual=annual[annual.length-1], bottomAvg=averages[averages.length-1];

  document.querySelector("#annualRelegated").textContent=bottomAnnual.name;
  document.querySelector("#averageRelegated").textContent=bottomAvg.name;

  const total=DATA.fixtures.length;
  const done=Object.keys(predictions).filter(k=>predictions[k]).length;
  document.querySelector("#progressText").textContent=`${done} de ${total} pronósticos realizados`;
  document.querySelector("#progressBar").style.width=(total?done/total*100:0)+"%";

  document.querySelector("#annualTable").innerHTML=annual.map((t,i)=>{
    const original=byId[t.id].annualPoints, d=t.annualPoints-original;
    return `<tr class="${i===annual.length-1?'danger-row':''} ${DATA.focusIds.includes(t.id)?'focus-row':''}">
      <td>${i+1}</td><td class="team-cell">${t.name}</td><td>${t.annualPlayed}</td><td>${t.annualPoints}</td><td class="${d>0?'up':''}">${d?`+${d}`:'—'}</td></tr>`;
  }).join("");

  document.querySelector("#averageTable").innerHTML=averages.map((t,i)=>`
    <tr class="${i===averages.length-1?'danger-row':''} ${DATA.focusIds.includes(t.id)?'focus-row':''}">
      <td>${i+1}</td><td class="team-cell">${t.name}</td><td>${t.averagePoints}</td><td>${t.averagePlayed}</td><td>${avg(t).toFixed(3)}</td>
    </tr>`).join("");

  document.querySelector("#teamsGrid").innerHTML=DATA.focusIds.map(id=>{
    const t=teams.find(x=>x.id===id), o=byId[id];
    const d=t.annualPoints-o.annualPoints;
    const pa=annual.findIndex(x=>x.id===id)+1, pp=averages.findIndex(x=>x.id===id)+1;
    return `<article class="team-card">
      <div class="team-name">${t.name}</div>
      <div class="team-meta">Actual: ${o.annualPoints} pts · Promedio: ${avg(o).toFixed(3)}</div>
      <div class="team-proj"><span>Proyección: <b>${t.annualPoints}</b> ${d?`<span class="${d>0?'up':'down'}">${d>0?'+':''}${d}</span>`:''}</span><span>Anual #${pa}</span></div>
      <div class="team-meta">Promedios proyectado: <b>${avg(t).toFixed(3)}</b> · #${pp}</div>
    </article>`;
  }).join("");

  renderFixtures();
}

function renderFixtures(){
  const groups={};
  DATA.fixtures.forEach(m=>(groups[m.round]??=[]).push(m));
  document.querySelector("#fixtures").innerHTML=Object.keys(groups).sort((a,b)=>a-b).map(round=>`
    <div class="fixture-day"><h3>FECHA ${round}</h3>
    ${groups[round].map(m=>{
      const focus=byId[m.focus], other=byId[m.other];
      const selected=predictions[m.id]||"";
      return `<div class="match">
        <div class="match-info"><div class="match-teams">${byId[m.home].name} <span style="color:#607781">vs</span> ${byId[m.away].name}</div>
        <div class="match-note">Pronóstico para ${focus.name}${other?' · partido compartido':''}</div></div>
        <div class="result-buttons">
          ${["V","E","D"].map(r=>`<button class="${selected===r?'active '+(r==="V"?'v':r==="E"?'e':'d'):''}" onclick="setPrediction('${m.id}','${r}')">${r}</button>`).join("")}
        </div>
      </div>`;
    }).join("")}</div>`).join("") || `<div class="match"><div class="match-info"><div class="match-teams">Fixture pendiente de carga</div><div class="match-note">La estructura de simulación ya está funcionando. Falta incorporar el fixture final verificado.</div></div></div>`;
}

window.setPrediction=(id,r)=>{
  predictions[id]=predictions[id]===r?"":r;
  render();
};
document.querySelector("#resetBtn").onclick=()=>{predictions={};render()};
document.querySelector("#randomBtn").onclick=()=>{
  DATA.fixtures.forEach(m=>predictions[m.id]=["V","E","D"][Math.floor(Math.random()*3)]);
  render();
};
document.querySelector("#dataStatus").textContent=DATA.verified
  ?"✓ Datos verificados al cierre de Fecha 8"
  :"⚠️ Versión inicial: datos del corte final de Fecha 8 pendientes de verificación";
render();
