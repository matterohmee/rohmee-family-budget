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
  
  const year = key.slice(0, 4)
  const months = state.order.filter(k => k.slice(0, 4) === year && k <= key)
  const ytdSav = months.map(mk => Math.max(0, (state.months[mk].income || 0) - monthTotals(state, mk).aTotal)).reduce((a, b) => a + b, 0)
  const target = state.target || 0
  const pct = target > 0 ? Math.min(1, ytdSav / target) : 0
  
  // Create gradients
  const progressGradient = createGradient(svg, 'gaugeProgress', '#10b981', '#059669')
  const bgGradient = createGradient(svg, 'gaugeBg', '#1e293b', '#0f172a')
  
  // MASSIVE CARD-STYLE LAYOUT - HUGE fonts and larger dimensions
  
  // ENORMOUS percentage display - center top - REDUCED SIZE
  const percentText = text(380, 150, `${Math.round(pct * 100)}%`, 'middle', '#10b981', 80, '900')
  svg.appendChild(percentText)
  
  // LARGE amount display - center - REDUCED SIZE
  const amountText = text(380, 240, `${fmt(real(state, ytdSav))} SEK`, 'middle', '#f8fafc', 32, '700')
  svg.appendChild(amountText)
  
  // Target context - below amount - REDUCED SIZE
  const targetText = text(380, 290, `of ${fmt(real(state, target))} SEK target`, 'middle', '#94a3b8', 20, '500')
  svg.appendChild(targetText)
  
  // Status indicator with large icon - REDUCED SIZE
  const statusColor = pct >= 1 ? '#10b981' : pct >= 0.8 ? '#f59e0b' : '#ef4444'
  const statusText = pct >= 1 ? '✓ Target Achieved' : pct >= 0.8 ? '⚡ On Track' : '⚠ Behind Target'
  
  const status = text(380, 350, statusText, 'middle', statusColor, 24, '600')
  svg.appendChild(status)
  
  // LARGER progress bar - much more prominent
  const barWidth = 500
  const barHeight = 30
  const barX = 380 - barWidth/2
  const barY = 380
  
  // Background bar
  const bgBar = ns('rect')
  bgBar.setAttribute('x', barX)
  bgBar.setAttribute('y', barY)
  bgBar.setAttribute('width', barWidth)
  bgBar.setAttribute('height', barHeight)
  bgBar.setAttribute('fill', bgGradient)
  bgBar.setAttribute('rx', 10)
  bgBar.setAttribute('opacity', '0.3')
  svg.appendChild(bgBar)
  
  // Progress bar with glow
  const progBar = ns('rect')
  progBar.setAttribute('x', barX)
  progBar.setAttribute('y', barY)
  progBar.setAttribute('width', 0)
  progBar.setAttribute('height', barHeight)
  progBar.setAttribute('fill', progressGradient)
  progBar.setAttribute('rx', 10)
  progBar.setAttribute('filter', 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))')
  progBar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)'
  svg.appendChild(progBar)
  
  // Animate progress bar
  requestAnimationFrame(() => {
    setTimeout(() => {
      progBar.setAttribute('width', barWidth * pct)
    }, 100)
  })
  
  // Progress percentage labels - LARGER
  const progressLabels = ["0%", "25%", "50%", "75%", "100%"]
  progressLabels.forEach((label, i) => {
    const x = barX + (barWidth * i / 4)
    const labelEl = text(x, barY + 60, label, "middle", "#64748b", 30, "500")
    svg.appendChild(labelEl)
  })
  
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
}

function fmt(n) { return (Math.round(n)).toLocaleString('sv-SE') }
