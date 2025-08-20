import { monthTotals, real } from '../state/calc.js'

const ns = t => document.createElementNS('http://www.w3.org/2000/svg', t)
const text = (x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawGlidepath(state, key){
  const svg=document.getElementById('glidepath'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=600,H=250,padL=50,padR=20,padT=20,padB=40,innerW=W-padL-padR,innerH=H-padT-padB
  
  // Create rolling 12-month sequence starting from September (09) - USE CURRENT YEAR DATA
  const year = key.slice(0,4)
  const currentMonth = parseInt(key.slice(5,7))
  
  const months = []
  // If we're in September or later, use current year for Sep-Dec and next year for Jan-Aug
  // If we're before September, use previous year for Sep-Dec and current year for Jan-Aug
  if (currentMonth >= 9) {
    // Add months 09-12 from current year
    for(let m = 9; m <= 12; m++) {
      const monthKey = `${year}-${m.toString().padStart(2, '0')}`
      months.push(monthKey)
    }
    // Add months 01-08 from next year
    const nextYear = (parseInt(year) + 1).toString()
    for(let m = 1; m <= 8; m++) {
      const monthKey = `${nextYear}-${m.toString().padStart(2, '0')}`
      months.push(monthKey)
    }
  } else {
    // Add months 09-12 from previous year
    const prevYear = (parseInt(year) - 1).toString()
    for(let m = 9; m <= 12; m++) {
      const monthKey = `${prevYear}-${m.toString().padStart(2, '0')}`
      months.push(monthKey)
    }
    // Add months 01-08 from current year
    for(let m = 1; m <= 8; m++) {
      const monthKey = `${year}-${m.toString().padStart(2, '0')}`
      months.push(monthKey)
    }
  }
  
  const idx=state.order.indexOf(key), past=months.filter(k=>state.order.indexOf(k)<=idx && state.order.indexOf(k)>=0)
  const ytdSav=past.map(mk=>Math.max(0, ((state.months[mk] && state.months[mk].income)||0) - (state.months[mk] ? monthTotals(state,mk).aTotal : 0))).reduce((a,b)=>a+b,0)
  const rem=12 - past.length, remaining=Math.max(0,(state.target||0)-ytdSav), req = rem>0? remaining/rem : 0
  const mTarget=(state.target||0)/12
  const series=[]
  months.forEach(mk=>{
    if(state.order.indexOf(mk)<=idx && state.order.indexOf(mk)>=0){
      series.push({m:mk, v:Math.max(0, ((state.months[mk] && state.months[mk].income)||0) - (state.months[mk] ? monthTotals(state,mk).aTotal : 0)), t:'a'})
    }else{
      series.push({m:mk, v:req, t:'r'})
    }
  })
  const ymax=Math.max(mTarget, ...series.map(s=>s.v), 1), bw=innerW/months.length*0.65
  series.forEach((s,i)=>{
    const h=(s.v/ymax)*innerH, x=padL + i*(innerW/months.length) + ((innerW/months.length)-bw)/2, y=padT + innerH - h
    const color = s.t==='a' ? (s.v>=mTarget ? '#10b981' : '#ef4444') : '#f59e0b'
    const r=ns('rect'); r.setAttribute('x',x); r.setAttribute('y',y); r.setAttribute('width',bw); r.setAttribute('height',h); r.setAttribute('fill',color); svg.appendChild(r)
    svg.appendChild(text(x+bw/2, H-12, s.m.slice(5), 'middle', '#9aa3b2', 12))
  })
  const ty=padT + innerH - (mTarget/ymax)*innerH
  const line=ns('line'); line.setAttribute('x1', padL); line.setAttribute('x2', padL+innerW); line.setAttribute('y1', ty); line.setAttribute('y2', ty); line.setAttribute('stroke','#93c5fd'); line.setAttribute('stroke-dasharray','5,5'); svg.appendChild(line)
  svg.appendChild(text(padL+innerW-6, ty-6, 'Monthly target '+fmt(real(state,mTarget)), 'end', '#cfe4ff', 16))
  const pill=document.getElementById('glidePill')
  if(pill){ if(remaining<=0){ pill.textContent='On track ✔'; pill.classList.add('ok') } else { pill.textContent='From now: need '+fmt(real(state,req))+' SEK / month'; pill.classList.remove('ok') } }
}

function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
