import { monthTotals, real } from '../state/calc.js'
import { MODEL } from '../state/model.js'
const ns=t=>document.createElementNS('http://www.w3.org/2000/svg', t)
const text=(x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawBAvsParents(state, key){
  const svg=document.getElementById('baParents'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=1200,H=460,padL=260,padR=40,padT=20,padB=60,innerW=W-padL-padR,innerH=H-padT-padB
  const m=monthTotals(state,key)
  const arr=Object.keys(MODEL).map(p=>({p,b:m.bParents[p]||0,a:m.aParents[p]||0})).sort((x,y)=>y.a-x.a)
  const n=arr.length, groupH=innerH/n, bw=groupH*0.35, max=Math.max(...arr.map(o=>Math.max(o.a,o.b)),1)
  arr.forEach((e,i)=>{
    const y=padT + i*groupH + groupH/2
    const wB=(e.b/max)*innerW, wA=(e.a/max)*innerW
    const b=ns('rect'); b.setAttribute('x',padL); b.setAttribute('y',y-bw-3); b.setAttribute('width',wB); b.setAttribute('height',bw); b.setAttribute('fill','#3b82f6'); svg.appendChild(b)
    const a=ns('rect'); a.setAttribute('x',padL); a.setAttribute('y',y+3); a.setAttribute('width',wA); a.setAttribute('height',bw); a.setAttribute('fill','#10b981'); svg.appendChild(a)
    const lab=(state.icons[e.p]||'')+' '+e.p
    svg.appendChild(text(padL-14, y+4, lab, 'end', '#cbd5e1', 14))
    svg.appendChild(text(padL + Math.max(wB,wA) + 10, y+4, 'B '+fmt(real(state,e.b))+'  A '+fmt(real(state,e.a)), 'start', '#cbd5e1', 12))
  })
  const ax=ns('line'); ax.setAttribute('x1',padL); ax.setAttribute('x2',padL); ax.setAttribute('y1',padT); ax.setAttribute('y2',padT+innerH); ax.setAttribute('stroke','#243049'); svg.appendChild(ax)
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
