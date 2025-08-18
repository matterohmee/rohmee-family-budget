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
  gradient.setAttribute('x2', '0%')
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

export function drawSpendingTrends(state, key) {
  const svg = document.getElementById('spendingTrends')
  if (!svg) return
  
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  
  const width = 1200, height = 400
  const margin = { top: 40, right: 60, bottom: 60, left: 80 }
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom
  
  // Get last 12 months of data
  const currentYear = key.slice(0, 4)
  const currentMonth = parseInt(key.slice(5, 7))
  const months = []
  
  for (let i = 11; i >= 0; i--) {
    let month = currentMonth - i
    let year = parseInt(currentYear)
    
    if (month <= 0) {
      month += 12
      year -= 1
    }
    
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`
    if (state.months[monthKey]) {
      months.push({
        key: monthKey,
        label: monthKey.slice(5, 7),
        data: monthTotals(state, monthKey)
      })
    }
  }
  
  if (months.length === 0) return
  
  // Calculate scales
  const maxSpending = Math.max(...months.map(m => m.data.aTotal))
  const xScale = chartWidth / (months.length - 1)
  const yScale = chartHeight / maxSpending
  
  // Create gradients
  const areaGradient = createGradient(svg, 'trendArea', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.05)')
  const lineGradient = createGradient(svg, 'trendLine', '#3b82f6', '#1d4ed8')
  
  // Chart background
  const chartBg = ns('rect')
  chartBg.setAttribute('x', margin.left)
  chartBg.setAttribute('y', margin.top)
  chartBg.setAttribute('width', chartWidth)
  chartBg.setAttribute('height', chartHeight)
  chartBg.setAttribute('fill', 'rgba(15, 23, 42, 0.5)')
  chartBg.setAttribute('stroke', 'rgba(45, 55, 72, 0.3)')
  chartBg.setAttribute('rx', 8)
  svg.appendChild(chartBg)
  
  // Grid lines
  for (let i = 0; i <= 5; i++) {
    const y = margin.top + (chartHeight / 5) * i
    const gridLine = ns('line')
    gridLine.setAttribute('x1', margin.left)
    gridLine.setAttribute('y1', y)
    gridLine.setAttribute('x2', margin.left + chartWidth)
    gridLine.setAttribute('y2', y)
    gridLine.setAttribute('stroke', 'rgba(45, 55, 72, 0.3)')
    gridLine.setAttribute('stroke-width', 1)
    gridLine.setAttribute('stroke-dasharray', '2,2')
    svg.appendChild(gridLine)
    
    // Y-axis labels
    const value = maxSpending - (maxSpending / 5) * i
    const label = text(margin.left - 10, y + 4, fmt(value), 'end', '#94a3b8', 14)
    svg.appendChild(label)
  }
  
  // Create path for area and line
  let areaPath = `M ${margin.left} ${margin.top + chartHeight}`
  let linePath = `M`
  
  months.forEach((month, i) => {
    const x = margin.left + i * xScale
    const y = margin.top + chartHeight - (month.data.aTotal * yScale)
    
    if (i === 0) {
      linePath += ` ${x} ${y}`
      areaPath += ` L ${x} ${y}`
    } else {
      linePath += ` L ${x} ${y}`
      areaPath += ` L ${x} ${y}`
    }
  })
  
  areaPath += ` L ${margin.left + (months.length - 1) * xScale} ${margin.top + chartHeight} Z`
  
  // Draw area
  const area = ns('path')
  area.setAttribute('d', areaPath)
  area.setAttribute('fill', areaGradient)
  area.setAttribute('opacity', '0')
  svg.appendChild(area)
  
  // Draw line
  const line = ns('path')
  line.setAttribute('d', linePath)
  line.setAttribute('fill', 'none')
  line.setAttribute('stroke', lineGradient)
  line.setAttribute('stroke-width', 3)
  line.setAttribute('stroke-linecap', 'round')
  line.setAttribute('stroke-linejoin', 'round')
  line.setAttribute('filter', 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))')
  line.style.strokeDasharray = line.getTotalLength()
  line.style.strokeDashoffset = line.getTotalLength()
  svg.appendChild(line)
  
  // Data points
  months.forEach((month, i) => {
    const x = margin.left + i * xScale
    const y = margin.top + chartHeight - (month.data.aTotal * yScale)
    
    // Point background
    const pointBg = ns('circle')
    pointBg.setAttribute('cx', x)
    pointBg.setAttribute('cy', y)
    pointBg.setAttribute('r', 6)
    pointBg.setAttribute('fill', 'rgba(15, 23, 42, 0.9)')
    pointBg.setAttribute('stroke', '#3b82f6')
    pointBg.setAttribute('stroke-width', 2)
    pointBg.setAttribute('opacity', '0')
    svg.appendChild(pointBg)
    
    // Point
    const point = ns('circle')
    point.setAttribute('cx', x)
    point.setAttribute('cy', y)
    point.setAttribute('r', 4)
    point.setAttribute('fill', '#3b82f6')
    point.setAttribute('opacity', '0')
    point.style.cursor = 'pointer'
    svg.appendChild(point)
    
    // X-axis labels
    const xLabel = text(x, margin.top + chartHeight + 20, month.label, 'middle', '#94a3b8', 14)
    svg.appendChild(xLabel)
    
    // Add hover effects
    point.addEventListener('mouseenter', () => {
      point.setAttribute('r', 6)
      point.setAttribute('fill', '#1d4ed8')
      pointBg.setAttribute('opacity', '1')
      
      // Show tooltip
      const tooltip = document.getElementById('tooltip')
      if (tooltip) {
        tooltip.style.display = 'block'
        tooltip.innerHTML = `
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${month.label}</div>
          <div>Total Spending: ${fmt(month.data.aTotal)} SEK</div>
          <div>Budget: ${fmt(month.data.bTotal)} SEK</div>
          <div>Variance: ${fmt(month.data.aTotal - month.data.bTotal)} SEK</div>
        `
      }
    })
    
    point.addEventListener('mouseleave', () => {
      point.setAttribute('r', 4)
      point.setAttribute('fill', '#3b82f6')
      pointBg.setAttribute('opacity', '0')
      
      const tooltip = document.getElementById('tooltip')
      if (tooltip) {
        tooltip.style.display = 'none'
      }
    })
    
    point.addEventListener('mousemove', (e) => {
      const tooltip = document.getElementById('tooltip')
      if (tooltip) {
        tooltip.style.left = (e.pageX + 10) + 'px'
        tooltip.style.top = (e.pageY - 10) + 'px'
      }
    })
  })
  
  // Animate elements
  requestAnimationFrame(() => {
    setTimeout(() => {
      area.style.transition = 'opacity 1s ease-out'
      area.setAttribute('opacity', '1')
    }, 200)
    
    setTimeout(() => {
      line.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)'
      line.style.strokeDashoffset = '0'
    }, 400)
    
    setTimeout(() => {
      months.forEach((_, i) => {
        setTimeout(() => {
          const points = svg.querySelectorAll('circle')
          const pointIndex = i * 2 + 2 // Skip area and line elements
          if (points[pointIndex]) {
            points[pointIndex].style.transition = 'opacity 0.3s ease-out'
            points[pointIndex].setAttribute('opacity', '1')
          }
          if (points[pointIndex + 1]) {
            points[pointIndex + 1].style.transition = 'opacity 0.3s ease-out'
            points[pointIndex + 1].setAttribute('opacity', '1')
          }
        }, i * 100)
      })
    }, 1000)
  })
  
  // Chart title
  const title = text(width / 2, 25, 'Monthly Spending Trends (Last 12 Months)', 'middle', '#f8fafc', 16, '600')
  svg.appendChild(title)
  
  // Y-axis title
  const yTitle = text(20, height / 2, 'Spending (SEK)', 'middle', '#94a3b8', 12, '500')
  yTitle.setAttribute('transform', `rotate(-90, 20, ${height / 2})`)
  svg.appendChild(yTitle)
}

function fmt(n) { return (Math.round(n)).toLocaleString('sv-SE') }

