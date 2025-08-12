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

export function drawGauge(state, key) {
  const svg = document.getElementById('ytdGauge')
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  
  const cx = 380, cy = 150, r = 100, th = 20
  const year = key.slice(0, 4)
  const months = state.order.filter(k => k.slice(0, 4) === year && k <= key)
  const ytdSav = months.map(mk => Math.max(0, (state.months[mk].income || 0) - monthTotals(state, mk).aTotal)).reduce((a, b) => a + b, 0)
  const target = state.target || 0
  const pct = target > 0 ? Math.min(1, ytdSav / target) : 0
  
  // Create gradients
  const bgGradient = createGradient(svg, 'gaugeBg', '#1e293b', '#0f172a')
  const progressGradient = createGradient(svg, 'gaugeProgress', '#10b981', '#059669')
  
  // Background circle with glow effect
  const bgGlow = ns('circle')
  bgGlow.setAttribute('cx', cx)
  bgGlow.setAttribute('cy', cy)
  bgGlow.setAttribute('r', r + 5)
  bgGlow.setAttribute('fill', 'none')
  bgGlow.setAttribute('stroke', 'rgba(16, 185, 129, 0.2)')
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
  base.setAttribute('stroke-linecap', 'round')
  base.setAttribute('opacity', '0.3')
  svg.appendChild(base)
  
  // Progress circle
  const circ = 2 * Math.PI * r
  const prog = ns('circle')
  prog.setAttribute('cx', cx)
  prog.setAttribute('cy', cy)
  prog.setAttribute('r', r)
  prog.setAttribute('fill', 'none')
  prog.setAttribute('stroke', progressGradient)
  prog.setAttribute('stroke-width', th)
  prog.setAttribute('stroke-linecap', 'round')
  prog.setAttribute('transform', `rotate(-90 ${cx} ${cy})`)
  prog.setAttribute('stroke-dasharray', `0 ${circ}`)
  prog.setAttribute('filter', 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))')
  
  // Add smooth animation
  prog.style.transition = 'stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
  svg.appendChild(prog)
  
  // Animate progress
  requestAnimationFrame(() => {
    setTimeout(() => {
      prog.setAttribute('stroke-dasharray', `${circ * pct} ${circ * (1 - pct)}`)
    }, 100)
  })
  
  // Center percentage text with animation
  const percentText = text(cx, cy - 8, '0%', 'middle', '#f8fafc', 28, '700')
  svg.appendChild(percentText)
  
  // Animate percentage counting
  let currentPct = 0
  const targetPct = Math.round(pct * 100)
  const increment = targetPct / 60 // 60 frames for smooth animation
  
  function animatePercentage() {
    if (currentPct < targetPct) {
      currentPct += increment
      percentText.textContent = Math.round(Math.min(currentPct, targetPct)) + '%'
      requestAnimationFrame(animatePercentage)
    }
  }
  
  setTimeout(animatePercentage, 200)
  
  // Subtitle with better styling
  const subtitleText = text(cx, cy + 25, `${fmt(real(state, ytdSav))} / ${fmt(real(state, target))} SEK`, 'middle', '#94a3b8', 13, '500')
  svg.appendChild(subtitleText)
  
  // Add status indicator
  const statusColor = pct >= 1 ? '#10b981' : pct >= 0.8 ? '#f59e0b' : '#ef4444'
  const statusText = pct >= 1 ? '✓ Target Achieved' : pct >= 0.8 ? '⚡ On Track' : '⚠ Behind Target'
  
  const status = text(cx, cy + 45, statusText, 'middle', statusColor, 11, '600')
  svg.appendChild(status)
}

function fmt(n) { return (Math.round(n)).toLocaleString('sv-SE') }
