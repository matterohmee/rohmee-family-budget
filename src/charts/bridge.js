import { monthTotals, prevMonthKey, real } from '../state/calc.js'
import { MODEL } from '../state/model.js'
const ns=t=>document.createElementNS('http://www.w3.org/2000/svg', t)
const text=(x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawBridge(state, key){
  const svg=document.getElementById('bridge'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const prev=prevMonthKey(state,key); if(!prev){ svg.appendChild(text(600,210,'No previous month to compare.','middle','#9aa3b2',14)); return }
  const W=1200,H=420,padL=80,padR=40,padT=30,padB=60,innerW=W-padL-padR,innerH=H-padT-padB
  const cur=monthTotals(state,key), last=monthTotals(state,prev)
  const start=last.aTotal, end=cur.aTotal
  const deltas=Object.keys(MODEL).map(p=>({p, icon:(state.icons[p]||''), delta:(cur.aParents[p]||0)-(last.aParents[p]||0)})).sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta))
  const topN=deltas.slice(0, Math.min(10,deltas.length))
  const others=deltas.slice(topN.length).reduce((a,b)=>a+b.delta,0); if(Math.abs(others)>0.5) topN.push({p:'Others',icon:'',delta:others})
  const xStep=(innerW)/(topN.length+3), baseY=padT+innerH
  let x=padL+xStep
  function yScale(v){ const maxV=Math.max(start,end, Math.max(...topN.map(d=>Math.abs(d.delta))) + Math.max(start,end)); return padT+innerH-(v/maxV)*innerH }
  const sRect=ns('rect'); sRect.setAttribute('x', x-24); sRect.setAttribute('y', yScale(start)); sRect.setAttribute('width', 48); sRect.setAttribute('height', baseY - yScale(start)); sRect.setAttribute('fill','#64748b'); svg.appendChild(sRect)
  svg.appendChild(text(x, H-18, 'Start', 'middle', '#9aa3b2', 12)); svg.appendChild(text(x, yScale(start)-6, fmt(real(state,start)), 'middle', '#cbd5e1', 12))
  let running=start; x+=xStep
  topN.forEach(d=>{
    const v=d.delta, up=v>=0
    const y0=yScale(running), y1=yScale(running+v), y=Math.min(y0,y1), h=Math.abs(y1-y0)
    const r=ns('rect'); r.setAttribute('x', x-24); r.setAttribute('y', y); r.setAttribute('width', 48); r.setAttribute('height', h); r.setAttribute('fill', up? '#ef4444' : '#10b981'); svg.appendChild(r)
    const name=((d.icon? d.icon+' ':'')+d.p); svg.appendChild(text(x, H-18, name.length>14? name.slice(0,14)+'…':name, 'middle', '#9aa3b2', 12))
    const mid=(up? '+':'') + fmt(real(state,v)); svg.appendChild(text(x, y-6, mid, 'middle', '#cbd5e1', 12))
    running += v; x+=xStep
  })
  const eRect=ns('rect'); eRect.setAttribute('x', x-24); eRect.setAttribute('y', yScale(end)); eRect.setAttribute('width', 48); eRect.setAttribute('height', baseY - yScale(end)); eRect.setAttribute('fill','#64748b'); svg.appendChild(eRect)
  svg.appendChild(text(x, H-18, 'End', 'middle', '#9aa3b2', 12)); svg.appendChild(text(x, yScale(end)-6, fmt(real(state,end)), 'middle', '#cbd5e1', 12))
  const axis=ns('line'); axis.setAttribute('x1', padL*0.6); axis.setAttribute('x2', W-padR); axis.setAttribute('y1', baseY); axis.setAttribute('y2', baseY); axis.setAttribute('stroke','#243049'); svg.appendChild(axis)
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
