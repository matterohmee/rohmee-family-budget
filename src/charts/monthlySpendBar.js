import { monthTotals } from '../state/calc.js'
const ns = t => document.createElementNS('http://www.w3.org/2000/svg', t)
const text = (x,y,t,anchor='start',fill='#cbd5e1',fs=12,fw='normal')=>{
  const el=ns('text')
  el.setAttribute('x',x)
  el.setAttribute('y',y)
  el.setAttribute('text-anchor',anchor)
  el.setAttribute('fill',fill)
  el.setAttribute('font-size',fs)
  el.setAttribute('font-weight',fw)
  el.setAttribute('font-family','Inter, system-ui, sans-serif')
  el.textContent=t
  return el
}

export function drawMonthlySpendBar(state, key){
  const svg = document.getElementById('monthlySpendBar')
  if(!svg) return
  while(svg.firstChild) svg.removeChild(svg.firstChild)

  const W=1200,H=400,padL=60,padR=20,padT=40,padB=60
  const innerW=W-padL-padR, innerH=H-padT-padB

  const year = key.slice(0,4)
  const currentMonth = parseInt(key.slice(5,7))
  const months=[]
  if(currentMonth>=9){
    for(let m=9;m<=12;m++) months.push(`${year}-${m.toString().padStart(2,'0')}`)
    const nextYear=(parseInt(year)+1).toString()
    for(let m=1;m<=8;m++) months.push(`${nextYear}-${m.toString().padStart(2,'0')}`)
  } else {
    const prevYear=(parseInt(year)-1).toString()
    for(let m=9;m<=12;m++) months.push(`${prevYear}-${m.toString().padStart(2,'0')}`)
    for(let m=1;m<=8;m++) months.push(`${year}-${m.toString().padStart(2,'0')}`)
  }
  if(months.length===0) return

  const data=months.map(mk=>({key:mk,total:monthTotals(state,mk).aTotal}))
  const max=Math.max(...data.map(d=>d.total),1)
  const slot=innerW/data.length, bw=slot*0.6

  // grid lines
  for(let i=0;i<=5;i++){
    const y=padT+(i/5)*innerH
    const line=ns('line')
    line.setAttribute('x1',padL)
    line.setAttribute('y1',y)
    line.setAttribute('x2',padL+innerW)
    line.setAttribute('y2',y)
    line.setAttribute('stroke','#374151')
    line.setAttribute('stroke-width',0.5)
    svg.appendChild(line)
    const label=((max - (i/5)*max)).toFixed(0)
    svg.appendChild(text(padL-10,y+4,fmt(label),'end','#9ca3af',11))
  }

  data.forEach((d,i)=>{
    const h=(d.total/max)*innerH
    const x=padL + i*slot + (slot-bw)/2
    const y=padT + innerH - h
    const rect=ns('rect')
    rect.setAttribute('x',x)
    rect.setAttribute('y',y)
    rect.setAttribute('width',bw)
    rect.setAttribute('height',h)
    rect.setAttribute('fill','#3b82f6')
    svg.appendChild(rect)
    svg.appendChild(text(x+bw/2,H-padB+20,d.key.slice(5,7),'middle','#9ca3af',11))
  })

  // axes
  const ax=ns('line')
  ax.setAttribute('x1',padL)
  ax.setAttribute('y1',padT)
  ax.setAttribute('x2',padL)
  ax.setAttribute('y2',padT+innerH)
  ax.setAttribute('stroke','#374151')
  svg.appendChild(ax)

  svg.appendChild(text(padL,25,'Monthly Spending (Last 12 Months)','start','#e5e7eb',14,'bold'))
}

function fmt(n){return (Math.round(n)).toLocaleString('sv-SE')}
