import { monthTotals, real } from '../state/calc.js'

function ns(t) { return document.createElementNS("http://www.w3.org/2000/svg", t) }

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

export function drawMonthlyTrends(state, key) {
  const svg = document.getElementById('monthlyTrends')
  while (svg.firstChild) svg.removeChild(svg.firstChild)

  const W = 1200, H = 400, padL = 60, padR = 20, padT = 40, padB = 60
  const innerW = W - padL - padR
  const innerH = H - padT - padB

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

  if (months.length === 0) return

  // Calculate percentage of income spent for each month
  const data = months.map(mk => {
    const monthData = state.months[mk]
    if (!monthData) return { month: mk, percentage: 0 }
    
    const income = monthData.income || 0
    const expenses = Object.keys(monthData.actual || {}).reduce((total, parent) => {
      return total + Object.values(monthData.actual[parent] || {}).reduce((sum, val) => sum + (val || 0), 0)
    }, 0)
    
    const percentage = income > 0 ? (expenses / income) * 100 : 0
    return { month: mk, percentage: Math.min(percentage, 100) } // Cap at 100%
  })

  const maxPercentage = Math.max(100, Math.max(...data.map(d => d.percentage)))
  
  // Scales
  const xScale = (i) => padL + (i / (months.length - 1)) * innerW
  const yScale = (val) => padT + innerH - (val / maxPercentage) * innerH

  // Background
  const bg = ns('rect')
  bg.setAttribute('width', W)
  bg.setAttribute('height', H)
  bg.setAttribute('fill', 'transparent')
  svg.appendChild(bg)

  // Grid lines (horizontal)
  for (let i = 0; i <= 5; i++) {
    const y = padT + (i / 5) * innerH
    const line = ns('line')
    line.setAttribute('x1', padL)
    line.setAttribute('y1', y)
    line.setAttribute('x2', padL + innerW)
    line.setAttribute('y2', y)
    line.setAttribute('stroke', '#374151')
    line.setAttribute('stroke-width', 0.5)
    svg.appendChild(line)
    
    const label = (100 - (i / 5) * 100).toFixed(0) + '%'
    svg.appendChild(text(padL - 10, y + 4, label, 'end', '#9ca3af', 11))
  }

  // X-axis labels
  months.forEach((mk, i) => {
    const x = xScale(i)
    const monthLabel = mk.slice(5, 7) // Just the month number
    svg.appendChild(text(x, H - padB + 20, monthLabel, 'middle', '#9ca3af', 11))
  })

  // Draw line
  if (data.length > 1) {
    const path = ns('path')
    let pathData = `M ${xScale(0)} ${yScale(data[0].percentage)}`
    
    for (let i = 1; i < data.length; i++) {
      pathData += ` L ${xScale(i)} ${yScale(data[i].percentage)}`
    }
    
    path.setAttribute('d', pathData)
    path.setAttribute('stroke', '#f59e0b')
    path.setAttribute('stroke-width', 3)
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke-linecap', 'round')
    path.setAttribute('stroke-linejoin', 'round')
    svg.appendChild(path)
  }

  // Draw points
  data.forEach((d, i) => {
    const circle = ns('circle')
    circle.setAttribute('cx', xScale(i))
    circle.setAttribute('cy', yScale(d.percentage))
    circle.setAttribute('r', 4)
    circle.setAttribute('fill', '#f59e0b')
    circle.setAttribute('stroke', '#1f2937')
    circle.setAttribute('stroke-width', 2)
    svg.appendChild(circle)
  })

  // Title
  svg.appendChild(text(padL, 25, 'Percentage of Income Spent', 'start', '#e5e7eb', 14, 'bold'))
  
  // Legend
  const legendY = padT + 10
  svg.appendChild(text(padL + innerW - 200, legendY, '% of Income Spent', 'start', '#f59e0b', 12))
  
  const legendLine = ns('line')
  legendLine.setAttribute('x1', padL + innerW - 220)
  legendLine.setAttribute('y1', legendY - 4)
  legendLine.setAttribute('x2', padL + innerW - 210)
  legendLine.setAttribute('y2', legendY - 4)
  legendLine.setAttribute('stroke', '#f59e0b')
  legendLine.setAttribute('stroke-width', 3)
  svg.appendChild(legendLine)
}
