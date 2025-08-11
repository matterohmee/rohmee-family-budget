import { monthTotals, real } from '../state/calc.js'
function ns(t){ return document.createElementNS('http://www.w3.org/2000/svg', t) }
function text(x,y,t,anchor='start',fill='#cbd5e1',fs=12){ const el=ns('text'); el.setAttribute('x',x); el.setAttribute('y',y); el.setAttribute('text-anchor',anchor); el.setAttribute('fill',fill); el.setAttribute('font-size',fs); el.textContent=t; return el }

export function drawFixedVar(state, key){
  const svg=document.getElementById('fixedVarMini'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const cx=220, cy=150, r=120, th=26
  const mt=monthTotals(state,key)
  let fixed=0, variable=0
  Object.keys(mt.aParents).forEach(p=>{ ((state.tags[p]==='F')? (fixed+=mt.aParents[p]||0) : (variable+=mt.aParents[p]||0)) })
  const total=fixed+variable||1, circ=2*Math.PI*r, cf=circ*(fixed/total), cv=circ*(variable/total)
  const base=ns('circle'); base.setAttribute('cx',cx); base.setAttribute('cy',cy); base.setAttribute('r',r); base.setAttribute('fill','none'); base.setAttribute('stroke','#1b2437'); base.setAttribute('stroke-width',th); svg.appendChild(base)
  const arcF=ns('circle'); arcF.setAttribute('cx',cx); arcF.setAttribute('cy',cy); arcF.setAttribute('r',r); arcF.setAttribute('fill','none'); arcF.setAttribute('stroke','#6366f1'); arcF.setAttribute('stroke-width',th); arcF.setAttribute('transform',`rotate(-90 ${cx} ${cy})`); arcF.setAttribute('stroke-dasharray',`${cf} ${circ-cf}`); svg.appendChild(arcF)
  const arcV=ns('circle'); arcV.setAttribute('cx',cx); arcV.setAttribute('cy',cy); arcV.setAttribute('r',r); arcV.setAttribute('fill','none'); arcV.setAttribute('stroke','#22d3ee'); arcV.setAttribute('stroke-width',th); arcV.setAttribute('transform',`rotate(${ -90 + (fixed/total)*360 } ${cx} ${cy})`); arcV.setAttribute('stroke-dasharray',`${cv} ${circ-cv}`); svg.appendChild(arcV)
  svg.appendChild(text(cx, cy-6, Math.round((fixed/total)*100)+'% Fixed', 'middle', '#e6edf6', 18))
  svg.appendChild(text(cx, cy+20, Math.round((variable/total)*100)+'% Variable', 'middle', '#9aa3b2', 14))
}
