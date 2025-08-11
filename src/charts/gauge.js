import { monthTotals, real } from '../state/calc.js'

function ns(t){ return document.createElementNS('http://www.w3.org/2000/svg', t) }
function text(x,y,t,anchor='start',fill='#cbd5e1',fs=12){ const el=ns('text'); el.setAttribute('x',x); el.setAttribute('y',y); el.setAttribute('text-anchor',anchor); el.setAttribute('fill',fill); el.setAttribute('font-size',fs); el.textContent=t; return el }

export function drawGauge(state, key){
  const svg=document.getElementById('ytdGauge'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const cx=200, cy=150, r=120, th=26
  const year=key.slice(0,4), months=state.order.filter(k=>k.slice(0,4)===year && k<=key)
  const ytdSav=months.map(mk=>Math.max(0, state.income - monthTotals(state,mk).aTotal)).reduce((a,b)=>a+b,0)
  const target=state.target||0, pct=target>0? Math.min(1,ytdSav/target):0

  const base=ns('circle'); base.setAttribute('cx',cx); base.setAttribute('cy',cy); base.setAttribute('r',r); base.setAttribute('fill','none'); base.setAttribute('stroke','#243049'); base.setAttribute('stroke-width',th); base.setAttribute('stroke-linecap','round'); svg.appendChild(base)
  const circ=2*Math.PI*r; const prog=ns('circle'); prog.setAttribute('cx',cx); prog.setAttribute('cy',cy); prog.setAttribute('r',r); prog.setAttribute('fill','none'); prog.setAttribute('stroke','#34d399'); prog.setAttribute('stroke-width',th); prog.setAttribute('stroke-linecap','round'); prog.setAttribute('transform',`rotate(-90 ${cx} ${cy})`); prog.setAttribute('stroke-dasharray',`0 ${circ}`); svg.appendChild(prog)
  requestAnimationFrame(()=>{ prog.setAttribute('stroke-dasharray', `${circ*pct} ${circ*(1-pct)}`) })
  svg.appendChild(text(cx, cy-12, Math.round(pct*100)+'%', 'middle', '#e6edf6', 32))
  svg.appendChild(text(cx, cy+22, `${fmt(real(state,ytdSav))} / ${fmt(real(state,target))} SEK`, 'middle', '#9aa3b2', 15))
}

function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
