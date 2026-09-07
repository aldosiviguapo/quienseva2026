let state={};
const T=Object.fromEntries(DATA.teams.map(t=>[t.id,t]));
const F=new Set(DATA.focusIds);
const pts=r=>r==="G"?3:r==="E"?1:0;
const opponentName=id=>T[id]?.name||id;
function calc(){
 const a=DATA.teams.map(t=>({...t}));
 const m=Object.fromEntries(a.map(t=>[t.id,t]));
 for(const [id,r] of Object.entries(state)){
   if(!r) continue;
   const x=DATA.fixtures.find(q=>q.id===id); if(!x) continue;
   const fp=pts(r), op=r==="E"?1:(r==="G"?0:3);
   m[x.focus].annual+=fp; m[x.focus].pj++; m[x.focus].ap+=fp; m[x.focus].avgpj++;
   if(F.has(x.other)){m[x.other].annual+=op;m[x.other].pj++;m[x.other].ap+=op;m[x.other].avgpj++}
 }
 return a;
}
function average(t){return t.ap/t.avgpj}
function renderCards(){
 const groups={}; DATA.fixtures.forEach(x=>(groups[x.focus]??=[]).push(x));
 document.querySelector("#cards").innerHTML=DATA.focusIds.map(id=>{
   const t=T[id], games=groups[id]||[];
   return `<article class="club-card"><div class="club-head"><img class="club-logo" src="${t.logo}" onerror="this.style.opacity=.15"><div class="club-name">${t.name}</div><div class="club-points">${calc().find(x=>x.id===id).annual}</div></div>
   ${games.map(x=>{let r=state[x.id]||"";return `<div class="match"><div class="matchline"><span class="round">F${x.round}</span><span class="venue">${x.home===id?"L":"V"}</span><span class="opp">${opponentName(x.other)}</span></div><div class="buttons">
   <button class="v ${r==="G"?"active":""}" onclick="pick('${x.id}','G')">G</button><button class="e ${r==="E"?"active":""}" onclick="pick('${x.id}','E')">E</button><button class="p ${r==="P"?"active":""}" onclick="pick('${x.id}','P')">P</button></div></div>`}).join("")}</article>`;
 }).join("");
}
function renderTables(){
 const a=calc().sort((x,y)=>y.annual-x.annual);
 const av=calc().sort((x,y)=>average(y)-average(x));
 document.querySelector("#annual").innerHTML=a.map((t,i)=>`<tr class="${i===a.length-1?'danger-row':''} ${F.has(t.id)?'focus-row':''}">
 <td>${i+1}</td><td><div class="clubcell">${t.logo?`<img class="mini-logo" src="${t.logo}">`:''}${t.name}</div></td><td>${t.pj}</td><td><b>${t.annual}</b></td><td>${i===a.length-1?'<span class="status-danger">DESC</span>':''}</td></tr>`).join("");
 document.querySelector("#avg").innerHTML=av.map((t,i)=>`<tr class="${i===av.length-1?'danger-row':''} ${F.has(t.id)?'focus-row':''}">
 <td>${i+1}</td><td><div class="clubcell">${t.logo?`<img class="mini-logo" src="${t.logo}">`:''}${t.name}</div></td><td>${t.avgpj}</td><td>${t.ap}</td><td><b>${average(t).toFixed(3)}</b></td></tr>`).join("");
 document.querySelector("#annualDown").textContent=a[a.length-1].name;
 document.querySelector("#avgDown").textContent=av[av.length-1].name;
}
function renderProgress(){const n=DATA.fixtures.length,d=Object.values(state).filter(Boolean).length;document.querySelector("#progressText").textContent=`${d} / ${n} partidos pronosticados`;document.querySelector("#progressBar").style.width=(n?d/n*100:0)+"%";}
function render(){renderCards();renderTables();renderProgress();}
window.pick=(id,r)=>{state[id]=state[id]===r?"":r;render()};
document.querySelector("#reset").onclick=()=>{state={};render()};
document.querySelector("#random").onclick=()=>{for(const x of DATA.fixtures)state[x.id]=["G","E","P"][Math.floor(Math.random()*3)];render()};
render();
