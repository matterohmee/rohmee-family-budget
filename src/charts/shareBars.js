import { monthTotals, real } from '../state/calc.js'
import { MODEL } from '../state/model.js'
const ns=t=>document.createElementNS('http://www.w3.org/2000/svg', t)
const text=(x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawShareBars(state, key){
  const svg=document.getElementById('shareBars'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=1200,H=700,padL=280,padR=40,padT=30,padB=60,innerW=W-padL-padR,innerH=H-padT-padB
  const mt=monthTotals(state,key)
  const arr=Object.keys(MODEL).map(p=>({p, v:mt.aParents[p]||0})).sort((a,b)=>b.v-a.v)
  const total=arr.reduce((a,b)=>a+b.v,0)||1
  const n=arr.length, rw=innerH/n*0.75
  arr.forEach((e,i)=>{
    const y=padT + i*(innerH/n) + (innerH/n-rw)/2, w=(e.v/total)*innerW
    const r=ns('rect'); r.setAttribute('x',padL); r.setAttribute('y',y); r.setAttribute('width',w); r.setAttribute('height',rw); r.setAttribute('fill','#3b82f6'); svg.appendChild(r)
    const lab=(state.icons[e.p]||'')+' '+e.p
    svg.appendChild(text(padL-16, y+rw/2+6, lab, 'end', '#cbd5e1', 15))
    svg.appendChild(text(padL + w + 12, y+rw/2+6, ((e.v/total)*100).toFixed(1)+'%  ·  '+fmt(real(state,e.v))+' SEK', 'start', '#cbd5e1', 14))
  })
  const ax=ns('line'); ax.setAttribute('x1',padL); ax.setAttribute('x2',padL); ax.setAttribute('y1',padT); ax.setAttribute('y2',padT+innerH); ax.setAttribute('stroke','#243049'); svg.appendChild(ax)
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
