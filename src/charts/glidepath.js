import { monthTotals, real } from '../state/calc.js'

const ns = t => document.createElementNS('http://www.w3.org/2000/svg', t)
const text = (x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawGlidepath(state, key){
  const svg=document.getElementById('glidepath'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=760,H=320,padL=60,padR=20,padT=20,padB=50,innerW=W-padL-padR,innerH=H-padT-padB
  const year=key.slice(0,4), months=state.order.filter(k=>k.slice(0,4)===year)
  const idx=state.order.indexOf(key), past=state.order.filter(k=>k.slice(0,4)===year && state.order.indexOf(k)<=idx)
  const ytdSav=past.map(mk=>Math.max(0, (state.months[mk].income||0) - monthTotals(state,mk).aTotal)).reduce((a,b)=>a+b,0)
  const rem=12 - past.length, remaining=Math.max(0,(state.target||0)-ytdSav), req = rem>0? remaining/rem : 0
  const mTarget=(state.target||0)/12
  const series=[]
  months.forEach(mk=>{
    if(state.order.indexOf(mk)<=idx){
      series.push({m:mk, v:Math.max(0, (state.months[mk].income||0) - monthTotals(state,mk).aTotal), t:'a'})
    }else{
      series.push({m:mk, v:req, t:'r'})
    }
  })
  const ymax=Math.max(mTarget, ...series.map(s=>s.v), 1), bw=innerW/months.length*0.65
  series.forEach((s,i)=>{
    const h=(s.v/ymax)*innerH, x=padL + i*(innerW/months.length) + ((innerW/months.length)-bw)/2, y=padT + innerH - h
    const color = s.t==='a' ? (s.v>=mTarget ? '#10b981' : '#ef4444') : '#f59e0b'
    const r=ns('rect'); r.setAttribute('x',x); r.setAttribute('y',y); r.setAttribute('width',bw); r.setAttribute('height',h); r.setAttribute('fill',color); svg.appendChild(r)
    svg.appendChild(text(x+bw/2, H-16, s.m.slice(5), 'middle', '#9aa3b2', 16))
  })
  const ty=padT + innerH - (mTarget/ymax)*innerH
  const line=ns('line'); line.setAttribute('x1', padL); line.setAttribute('x2', padL+innerW); line.setAttribute('y1', ty); line.setAttribute('y2', ty); line.setAttribute('stroke','#93c5fd'); line.setAttribute('stroke-dasharray','5,5'); svg.appendChild(line)
  svg.appendChild(text(padL+innerW-6, ty-6, 'Monthly target '+fmt(real(state,mTarget)), 'end', '#cfe4ff', 16))
  const pill=document.getElementById('glidePill')
  if(pill){ if(remaining<=0){ pill.textContent='On track ✔'; pill.classList.add('ok') } else { pill.textContent='From now: need '+fmt(real(state,req))+' SEK / month'; pill.classList.remove('ok') } }
}

function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
