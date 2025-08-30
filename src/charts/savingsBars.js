import { MODEL } from '../state/model.js'
import { monthTotals } from '../state/calc.js'
import { addTooltip } from '../ui/tooltip.js'
const ns=t=>document.createElementNS('http://www.w3.org/2000/svg', t)
const text=(x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}
const fmt = n => n.toLocaleString()

export function drawSavingsBars(state, key){
  const svg=document.getElementById('savingsBars'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=1200,H=300,padL=280,padR=40,padT=30,padB=60,innerW=W-padL-padR,innerH=H-padT-padB
  const mt=monthTotals(state,key)
  
  // Only show savings categories
  const arr=Object.keys(MODEL)
    .filter(p => (state.tags[p] || 'V').includes('S')) // Only savings categories
    .map(p=>({p, v:mt.aParents[p]||0}))
    .sort((a,b)=>b.v-a.v)
  
  if(arr.length === 0) {
    // Show message if no savings categories
    const msg = text(W/2, H/2, 'No savings categories yet. Tag categories as "Savings" to see them here.', 'middle', '#64748b', 16)
    svg.appendChild(msg)
    return
  }
  
  const total=arr.reduce((a,b)=>a+b.v,0)||1
  const n=arr.length, rw=innerH/n*0.75
  
  arr.forEach((e,i)=>{
    const y=padT + i*(innerH/n) + (innerH/n-rw)/2, w=(e.v/total)*innerW
    
    // Determine color based on highlighting
    const isHighlighted = state.highlightedCategory === e.p
    const hasHighlighting = state.highlightedCategory && state.highlightedCategory !== null
    const barColor = isHighlighted ? '#f59e0b' : '#10b981' // Orange for highlighted, green for savings
    const barOpacity = hasHighlighting && !isHighlighted ? 0.3 : 1 // Dim non-highlighted when something is highlighted
    
    const r=ns('rect'); 
    r.setAttribute('x',padL); 
    r.setAttribute('y',y); 
    r.setAttribute('width',w); 
    r.setAttribute('height',rw); 
    r.setAttribute('fill',barColor);
    r.setAttribute('opacity',barOpacity);
    r.style.cursor = 'pointer';
    
    // Add click handler for highlighting
    r.onclick = () => {
      state.highlightedCategory = state.highlightedCategory === e.p ? null : e.p
      if(window.drawAll) window.drawAll()
    }
    
    // Add tooltip
    const pct = total > 0 ? (e.v/total*100).toFixed(1) : '0.0'
    addTooltip(r, `${e.p}: ${pct}% (${fmt(e.v)} SEK saved)`)
    
    svg.appendChild(r)
    
    const icon = state.icons[e.p] || '💰'
    const iconEl = text(padL-30, y+rw/2+5, icon, 'middle', '#cbd5e1', 20)
    svg.appendChild(iconEl)
    
    const nameEl = text(padL-50, y+rw/2+5, e.p, 'end', '#cbd5e1', 14)
    svg.appendChild(nameEl)
    
    const pctEl = text(padL+w+10, y+rw/2-5, `${pct}% · ${fmt(e.v)} SEK`, 'start', '#cbd5e1', 12)
    svg.appendChild(pctEl)
  })
}

