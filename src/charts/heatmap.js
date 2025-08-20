import { monthTotals, real } from '../state/calc.js'
import { MODEL } from '../state/model.js'
const ns=t=>document.createElementNS('http://www.w3.org/2000/svg', t)
const text=(x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawHeatmap(state, key){
  const svg=document.getElementById('heatmapVar'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=1200,H=440,padL=260,padR=40,padT=20,padB=40,innerW=W-padL-padR,innerH=H-padT-padB
  
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
  
  const rows=Object.keys(MODEL), cols=months.length
  const matrix=[], vals=[]
  rows.forEach(p=>{
    const r=[]
    months.forEach(mk=>{
      const t=monthTotals(state,mk); const b=t.bParents[p]||0, a=t.aParents[p]||0, v=b? (a-b)/b : 0
      r.push({p,b,a,v,m:mk}); vals.push(v)
    })
    matrix.push(r)
  })
  const minV=Math.min(...vals), maxV=Math.max(...vals)
  const cw=innerW/cols, ch=innerH/rows.length
  function color(v){ const hue=v<=0?150:0; const divisor = v<=0? (minV === 0 ? 1 : -minV) : (maxV === 0 ? 1 : maxV); const t=Math.min(1, Math.abs(v)/divisor || 0); const l=30+30*t; return `hsl(${hue},70%,${l}%)` }
  matrix.forEach((row,ri)=>{
    row.forEach((cell,ci)=>{
      const r=ns('rect'); r.setAttribute('x', padL + ci*cw); r.setAttribute('y', padT + ri*ch); r.setAttribute('width', cw-2); r.setAttribute('height', ch-2); r.setAttribute('fill', color(cell.v))
      
      // Add highlighting border for selected category
      if(state.highlightedCategory && cell.p === state.highlightedCategory) {
        r.setAttribute('stroke', '#3b82f6')
        r.setAttribute('stroke-width', '3')
      }
      
      r.addEventListener('mouseenter', ev=>{
        const tt=document.getElementById('tooltip'); const diff=cell.a-cell.b; const sign=diff>=0?'+':''
        tt.innerHTML = `<div><b>${cell.p}</b> · <span class='t'>${cell.m}</span></div>
                        <div>Budget: <b>${fmt(real(state,cell.b))}</b> SEK</div>
                        <div>Actual: <b>${fmt(real(state,cell.a))}</b> SEK</div>
                        <div>Variance: <b>${sign+fmt(real(state,diff))}</b> (${cell.b?((diff/cell.b)*100).toFixed(1):'0.0'}%)</div>`
        tt.style.left=(ev.clientX+12)+'px'; tt.style.top=(ev.clientY+12)+'px'; tt.style.display='block'
      })
      r.addEventListener('mousemove', ev=>{ const tt=document.getElementById('tooltip'); tt.style.left=(ev.clientX+12)+'px'; tt.style.top=(ev.clientY+12)+'px'; })
      r.addEventListener('mouseleave', ()=>{ document.getElementById('tooltip').style.display='none' })
      svg.appendChild(r)
    })
    const lab=(state.icons[rows[ri]]||'')+' '+rows[ri]; 
    svg.appendChild(text(padL-14, padT + ri*ch + ch/2 + 4, lab, 'end', state.highlightedCategory === rows[ri] ? '#ffffff' : '#cbd5e1', 18))
  })
  months.forEach((mk,ci)=> svg.appendChild(text(padL + ci*cw + cw/2, H-12, mk.slice(5), 'middle', '#9aa3b2', 16)))
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
