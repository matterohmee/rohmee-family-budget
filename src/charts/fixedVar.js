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
  
  const mt = monthTotals(state, key)
  
  let fixed = 0, variable = 0
  Object.keys(mt.aParents).forEach(p => {
    ((state.tags[p] === 'F') ? (fixed += mt.aParents[p] || 0) : (variable += mt.aParents[p] || 0))
  })
  
  const total = fixed + variable || 1
  const fixedPct = Math.round((fixed / total) * 100)
  const variablePct = Math.round((variable / total) * 100)
  
  // Create gradients
  const fixedGradient = createGradient(svg, 'fixedGrad', '#8b5cf6', '#7c3aed')
  const variableGradient = createGradient(svg, 'variableGrad', '#06b6d4', '#0891b2')
  
  // LARGE CARD-STYLE LAYOUT - Side by side comparison
  
  // Fixed Expenses Section (Left Side)
  const fixedX = 200
  
  // Large Fixed percentage
  const fixedPercentText = text(fixedX, 80, '0%', 'middle', '#8b5cf6', 64, '800')
  svg.appendChild(fixedPercentText)
  
  // Fixed label
  const fixedLabelText = text(fixedX, 120, 'Fixed Expenses', 'middle', '#8b5cf6', 20, '600')
  svg.appendChild(fixedLabelText)
  
  // Fixed amount
  const fixedAmountText = text(fixedX, 150, `${fmt(real(state, fixed))} SEK`, 'middle', '#a78bfa', 18, '500')
  svg.appendChild(fixedAmountText)
  
  // Variable Expenses Section (Right Side)
  const variableX = 560
  
  // Large Variable percentage
  const variablePercentText = text(variableX, 80, '0%', 'middle', '#06b6d4', 64, '800')
  svg.appendChild(variablePercentText)
  
  // Variable label
  const variableLabelText = text(variableX, 120, 'Variable Expenses', 'middle', '#06b6d4', 20, '600')
  svg.appendChild(variableLabelText)
  
  // Variable amount
  const variableAmountText = text(variableX, 150, `${fmt(real(state, variable))} SEK`, 'middle', '#67e8f9', 18, '500')
  svg.appendChild(variableAmountText)
  
  // Comparison bars at the bottom
  const barY = 180
  const barHeight = 20
  const totalBarWidth = 400
  const barStartX = 380 - totalBarWidth/2
  
  // Fixed bar
  const fixedBarWidth = totalBarWidth * (fixed / total)
  const fixedBar = ns('rect')
  fixedBar.setAttribute('x', barStartX)
  fixedBar.setAttribute('y', barY)
  fixedBar.setAttribute('width', 0)
  fixedBar.setAttribute('height', barHeight)
  fixedBar.setAttribute('fill', fixedGradient)
  fixedBar.setAttribute('rx', 10)
  fixedBar.setAttribute('filter', 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))')
  fixedBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
  svg.appendChild(fixedBar)
  
  // Variable bar
  const variableBarWidth = totalBarWidth * (variable / total)
  const variableBar = ns('rect')
  variableBar.setAttribute('x', barStartX + fixedBarWidth)
  variableBar.setAttribute('y', barY)
  variableBar.setAttribute('width', 0)
  variableBar.setAttribute('height', barHeight)
  variableBar.setAttribute('fill', variableGradient)
  variableBar.setAttribute('rx', 10)
  variableBar.setAttribute('filter', 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))')
  variableBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
  svg.appendChild(variableBar)
  
  // Background bar for context
  const bgBar = ns('rect')
  bgBar.setAttribute('x', barStartX)
  bgBar.setAttribute('y', barY)
  bgBar.setAttribute('width', totalBarWidth)
  bgBar.setAttribute('height', barHeight)
  bgBar.setAttribute('fill', '#1e293b')
  bgBar.setAttribute('rx', 10)
  bgBar.setAttribute('opacity', '0.3')
  svg.insertBefore(bgBar, fixedBar)
  
  // Animate bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      fixedBar.setAttribute('width', fixedBarWidth)
    }, 200)
    setTimeout(() => {
      variableBar.setAttribute('x', barStartX + fixedBarWidth)
      variableBar.setAttribute('width', variableBarWidth)
    }, 400)
  })
  
  // VS indicator in the middle
  const vsText = text(380, 95, 'VS', 'middle', '#64748b', 16, '600')
  svg.appendChild(vsText)
  
  // Divider line
  const divider = ns('line')
  divider.setAttribute('x1', 380)
  divider.setAttribute('y1', 40)
  divider.setAttribute('x2', 380)
  divider.setAttribute('y2', 170)
  divider.setAttribute('stroke', '#374151')
  divider.setAttribute('stroke-width', 1)
  divider.setAttribute('opacity', '0.5')
  svg.appendChild(divider)
  
  // Animate text counting
  let currentFixed = 0, currentVariable = 0
  const incrementFixed = fixedPct / 50
  const incrementVariable = variablePct / 50
  
  function animateText() {
    if (currentFixed < fixedPct || currentVariable < variablePct) {
      if (currentFixed < fixedPct) {
        currentFixed += incrementFixed
        fixedPercentText.textContent = Math.round(Math.min(currentFixed, fixedPct)) + '%'
      }
      if (currentVariable < variablePct) {
        currentVariable += incrementVariable
        variablePercentText.textContent = Math.round(Math.min(currentVariable, variablePct)) + '%'
      }
      requestAnimationFrame(animateText)
    }
  }
  
  setTimeout(animateText, 300)
  
  // Add hover effects to bars
  fixedBar.style.cursor = 'pointer'
  variableBar.style.cursor = 'pointer'
  
  fixedBar.addEventListener('mouseenter', () => {
    fixedBar.style.filter = 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))'
  })
  
  fixedBar.addEventListener('mouseleave', () => {
    fixedBar.style.filter = 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.4))'
  })
  
  variableBar.addEventListener('mouseenter', () => {
    variableBar.style.filter = 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))'
  })
  
  variableBar.addEventListener('mouseleave', () => {
    variableBar.style.filter = 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))'
  })
}

function fmt(n) { return (Math.round(n)).toLocaleString('sv-SE') }
