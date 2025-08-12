import { monthTotals, real } from '../state/calc.js'

function ns(t) { return document.createElementNS('http://www.w3.org/2000/svg', t) }

function text(x, y, t, anchor = 'start', fill = '#cbd5e1', fs = 12, fw = 'normal') {
  const el = ns('text')
  el.setAttribute('x', x)
  el.setAttribute('y', y)
  el.setAttribute('text-anchor', anchor)
  el.setAttribute('fill', fill)
  el.setAttribute('font-size', fs)
  el.setAttribute('font-weight', fw)
  el.setAttribute('font-family', 'Inter, system-ui, sans-serif')
  el.textContent = t
  return el
}

function createGradient(svg, id, color1, color2) {
  const defs = svg.querySelector('defs') || svg.appendChild(ns('defs'))
  const gradient = ns('linearGradient')
  gradient.setAttribute('id', id)
  gradient.setAttribute('x1', '0%')
  gradient.setAttribute('y1', '0%')
  gradient.setAttribute('x2', '100%')
  gradient.setAttribute('y2', '100%')
  
  const stop1 = ns('stop')
  stop1.setAttribute('offset', '0%')
  stop1.setAttribute('stop-color', color1)
  
  const stop2 = ns('stop')
  stop2.setAttribute('offset', '100%')
  stop2.setAttribute('stop-color', color2)
  
  gradient.appendChild(stop1)
  gradient.appendChild(stop2)
  defs.appendChild(gradient)
  
  return `url(#${id})`
}

export function drawFixedVar(state, key) {
  const svg = document.getElementById('fixedVarMini')
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  
  const cx = 380, cy = 150, r = 100, th = 20
  const mt = monthTotals(state, key)
  
  let fixed = 0, variable = 0
  Object.keys(mt.aParents).forEach(p => {
    ((state.tags[p] === 'F') ? (fixed += mt.aParents[p] || 0) : (variable += mt.aParents[p] || 0))
  })
  
  const total = fixed + variable || 1
  const circ = 2 * Math.PI * r
  const cf = circ * (fixed / total)
  const cv = circ * (variable / total)
  
  // Create gradients
  const fixedGradient = createGradient(svg, 'fixedGrad', '#8b5cf6', '#7c3aed')
  const variableGradient = createGradient(svg, 'variableGrad', '#06b6d4', '#0891b2')
  const bgGradient = createGradient(svg, 'donutBg', '#1e293b', '#0f172a')
  
  // Background glow
  const bgGlow = ns('circle')
  bgGlow.setAttribute('cx', cx)
  bgGlow.setAttribute('cy', cy)
  bgGlow.setAttribute('r', r + 5)
  bgGlow.setAttribute('fill', 'none')
  bgGlow.setAttribute('stroke', 'rgba(139, 92, 246, 0.2)')
  bgGlow.setAttribute('stroke-width', 2)
  bgGlow.setAttribute('opacity', '0.6')
  svg.appendChild(bgGlow)
  
  // Background circle
  const base = ns('circle')
  base.setAttribute('cx', cx)
  base.setAttribute('cy', cy)
  base.setAttribute('r', r)
  base.setAttribute('fill', 'none')
  base.setAttribute('stroke', bgGradient)
  base.setAttribute('stroke-width', th)
  base.setAttribute('opacity', '0.3')
  svg.appendChild(base)
  
  // Fixed expenses arc
  const arcF = ns('circle')
  arcF.setAttribute('cx', cx)
  arcF.setAttribute('cy', cy)
  arcF.setAttribute('r', r)
  arcF.setAttribute('fill', 'none')
  arcF.setAttribute('stroke', fixedGradient)
  arcF.setAttribute('stroke-width', th)
  arcF.setAttribute('stroke-linecap', 'round')
  arcF.setAttribute('transform', `rotate(-90 ${cx} ${cy})`)
  arcF.setAttribute('stroke-dasharray', `0 ${circ}`)
  arcF.setAttribute('filter', 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))')
  arcF.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
  svg.appendChild(arcF)
  
  // Variable expenses arc
  const arcV = ns('circle')
  arcV.setAttribute('cx', cx)
  arcV.setAttribute('cy', cy)
  arcV.setAttribute('r', r)
  arcV.setAttribute('fill', 'none')
  arcV.setAttribute('stroke', variableGradient)
  arcV.setAttribute('stroke-width', th)
  arcV.setAttribute('stroke-linecap', 'round')
  arcV.setAttribute('transform', `rotate(${-90 + (fixed / total) * 360} ${cx} ${cy})`)
  arcV.setAttribute('stroke-dasharray', `0 ${circ}`)
  arcV.setAttribute('filter', 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))')
  arcV.style.transition = 'stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
  svg.appendChild(arcV)
  
  // Animate arcs
  requestAnimationFrame(() => {
    setTimeout(() => {
      arcF.setAttribute('stroke-dasharray', `${cf} ${circ - cf}`)
    }, 200)
    setTimeout(() => {
      arcV.setAttribute('stroke-dasharray', `${cv} ${circ - cv}`)
    }, 400)
  })
  
  // Center text with animation
  const fixedPct = Math.round((fixed / total) * 100)
  const variablePct = Math.round((variable / total) * 100)
  
  const fixedText = text(cx, cy - 8, '0% Fixed', 'middle', '#f8fafc', 16, '600')
  const variableText = text(cx, cy + 12, '0% Variable', 'middle', '#94a3b8', 14, '500')
  
  svg.appendChild(fixedText)
  svg.appendChild(variableText)
  
  // Animate text counting
  let currentFixed = 0, currentVariable = 0
  const incrementFixed = fixedPct / 50
  const incrementVariable = variablePct / 50
  
  function animateText() {
    if (currentFixed < fixedPct || currentVariable < variablePct) {
      if (currentFixed < fixedPct) {
        currentFixed += incrementFixed
        fixedText.textContent = Math.round(Math.min(currentFixed, fixedPct)) + '% Fixed'
      }
      if (currentVariable < variablePct) {
        currentVariable += incrementVariable
        variableText.textContent = Math.round(Math.min(currentVariable, variablePct)) + '% Variable'
      }
      requestAnimationFrame(animateText)
    }
  }
  
  setTimeout(animateText, 300)
  
  // Add interactive hover effects
  arcF.style.cursor = 'pointer'
  arcV.style.cursor = 'pointer'
  
  arcF.addEventListener('mouseenter', () => {
    arcF.setAttribute('stroke-width', th + 2)
    arcF.style.filter = 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))'
  })
  
  arcF.addEventListener('mouseleave', () => {
    arcF.setAttribute('stroke-width', th)
    arcF.style.filter = 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))'
  })
  
  arcV.addEventListener('mouseenter', () => {
    arcV.setAttribute('stroke-width', th + 2)
    arcV.style.filter = 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))'
  })
  
  arcV.addEventListener('mouseleave', () => {
    arcV.setAttribute('stroke-width', th)
    arcV.style.filter = 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))'
  })
}
