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
    
    // Determine colors and opacity based on highlighting
    const isHighlighted = state.highlightedCategory === e.p
    const hasHighlighting = state.highlightedCategory && state.highlightedCategory !== null
    const budgetColor = isHighlighted ? '#f59e0b' : '#3b82f6' // Orange for highlighted, blue for normal
    const actualColor = isHighlighted ? '#f97316' : '#10b981' // Orange variant for highlighted, green for normal
    const barOpacity = hasHighlighting && !isHighlighted ? 0.3 : 1
    const textOpacity = hasHighlighting && !isHighlighted ? 0.5 : 1
    
    const b=ns('rect'); 
    b.setAttribute('x',padL); 
    b.setAttribute('y',y-bw-3); 
    b.setAttribute('width',wB); 
    b.setAttribute('height',bw); 
    b.setAttribute('fill',budgetColor);
    b.setAttribute('opacity',barOpacity);
    b.style.cursor = 'pointer';
    
    // Add tooltip for budget bar
    const budgetTooltip = ns('title')
    budgetTooltip.textContent = `${e.p} Budget: ${fmt(real(state,e.b))} SEK`
    b.appendChild(budgetTooltip)
    
    // Add glow effect for highlighted category
    if (isHighlighted) {
      b.setAttribute('filter', 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.5))');
    }
    
    svg.appendChild(b)
    
    const a=ns('rect'); 
    a.setAttribute('x',padL); 
    a.setAttribute('y',y+3); 
    a.setAttribute('width',wA); 
    a.setAttribute('height',bw); 
    a.setAttribute('fill',actualColor);
    a.setAttribute('opacity',barOpacity);
    a.style.cursor = 'pointer';
    
    // Add tooltip for actual bar
    const actualTooltip = ns('title')
    actualTooltip.textContent = `${e.p} Actual: ${fmt(real(state,e.a))} SEK`
    a.appendChild(actualTooltip)
    
    // Add glow effect for highlighted category
    if (isHighlighted) {
      a.setAttribute('filter', 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.5))');
    }
    
    svg.appendChild(a)
    
    const lab=(state.icons[e.p]||'')+' '+e.p
    const labelText = text(padL-14, y+4, lab, 'end', '#cbd5e1', 14)
    labelText.setAttribute('opacity', textOpacity)
    svg.appendChild(labelText)
    
    // Ensure value text stays within chart boundaries
    const maxBarWidth = Math.max(wB, wA)
    const valueX = Math.min(padL + maxBarWidth + 10, W - padR - 200) // Keep 200px from right edge
    const valueText = text(valueX, y+4, 'B '+fmt(real(state,e.b))+'  A '+fmt(real(state,e.a)), 'start', '#cbd5e1', 12)
    valueText.setAttribute('opacity', textOpacity)
    svg.appendChild(valueText)
  })
  const ax=ns('line'); ax.setAttribute('x1',padL); ax.setAttribute('x2',padL); ax.setAttribute('y1',padT); ax.setAttribute('y2',padT+innerH); ax.setAttribute('stroke','#243049'); svg.appendChild(ax)
}
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
