import { monthTotals, real } from '../state/calc.js'
import { MODEL } from '../state/model.js'
import { addTooltip } from '../ui/tooltip.js'
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
    
    // Determine color based on highlighting
    const isHighlighted = state.highlightedCategory === e.p
    const hasHighlighting = state.highlightedCategory && state.highlightedCategory !== null
    const barColor = isHighlighted ? '#f59e0b' : '#3b82f6' // Orange for highlighted, blue for normal
    const barOpacity = hasHighlighting && !isHighlighted ? 0.3 : 1 // Dim non-highlighted when something is highlighted
    
    const r=ns('rect'); 
    r.setAttribute('x',padL); 
    r.setAttribute('y',y); 
    r.setAttribute('width',w); 
    r.setAttribute('height',rw); 
    r.setAttribute('fill',barColor);
    r.setAttribute('opacity',barOpacity);
    r.style.cursor = 'pointer';
    
    // Add tooltip functionality
    const tooltipText = `${e.p}: ${((e.v/total)*100).toFixed(1)}% (${fmt(real(state,e.v))} SEK)`
    addTooltip(r, tooltipText)
    
    // Add glow effect for highlighted category
    if (isHighlighted) {
      r.setAttribute('filter', 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))');
    }
    
    svg.appendChild(r)
    
    // Adjust text opacity for highlighting
    const textOpacity = hasHighlighting && !isHighlighted ? 0.5 : 1
    
    const lab=(state.icons[e.p]||'')+' '+e.p
    const labelText = text(padL-16, y+rw/2+6, lab, 'end', '#cbd5e1', 15)
    labelText.setAttribute('opacity', textOpacity)
    svg.appendChild(labelText)
    
    // Ensure value text stays within chart boundaries
    const valueX = Math.min(padL + w + 12, W - padR - 250) // Keep 250px from right edge
    const valueText = text(valueX, y+rw/2+6, ((e.v/total)*100).toFixed(1)+'%  ·  '+fmt(real(state,e.v))+' SEK', 'start', '#cbd5e1', 14)
    valueText.setAttribute('opacity', textOpacity)
    svg.appendChild(valueText)
  })
  const ax=ns('line'); ax.setAttribute('x1',padL); ax.setAttribute('x2',padL); ax.setAttribute('y1',padT); ax.setAttribute('y2',padT+innerH); ax.setAttribute('stroke','#243049'); svg.appendChild(ax)
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
