import { monthTotals, real } from '../state/calc.js'
const ns=t=>document.createElementNS('http://www.w3.org/2000/svg', t)
const text=(x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawTotalsBar(state, key){
  const svg=document.getElementById('barSummary'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=760,H=320,padL=110,padR=20,padT=20,padB=40,innerW=W-padL-padR,innerH=H-padT-padB
  const mt=monthTotals(state,key), rows=[
    {lab:'Income',val:state.income,c:'#60a5fa'},
    {lab:'Budget',val:mt.bTotal,c:'#3b82f6'},
    {lab:'Actual',val:mt.aTotal,c:'#10b981'},
    {lab:'Savings',val:Math.max(0,state.income-mt.aTotal),c:'#34d399'}
  ]
  const max=Math.max(...rows.map(r=>r.val),1), rw=innerH/rows.length*0.55
  rows.forEach((r,i)=>{
    const y=padT + i*(innerH/rows.length) + (innerH/rows.length - rw)/2
    const w=(r.val/max)*innerW
    const bar=ns('rect'); bar.setAttribute('x',padL); bar.setAttribute('y',y); bar.setAttribute('width',w); bar.setAttribute('height',rw); bar.setAttribute('fill',r.c); svg.appendChild(bar)
    svg.appendChild(text(padL-10, y+rw/2+4, r.lab, 'end', '#cbd5e1', 12))
    svg.appendChild(text(padL+w+6, y+rw/2+4, fmt(real(state,r.val)), 'start', '#cbd5e1', 12))
  })
  const ax=ns('line'); ax.setAttribute('x1',padL); ax.setAttribute('x2',padL); ax.setAttribute('y1',padT); ax.setAttribute('y2',padT+innerH); ax.setAttribute('stroke','#243049'); svg.appendChild(ax)
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
