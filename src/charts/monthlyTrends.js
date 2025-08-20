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

  const data = months.map(monthKey => {
    const income = (state.months[monthKey] && state.months[monthKey].income) || 0
    const expenses = state.months[monthKey] ? monthTotals(state, monthKey).aTotal : 0
    return { month: monthKey, income: income, expenses: expenses }
  })

  // Ensure we have valid data to prevent NaN issues
  const validData = data.filter(d => !isNaN(d.income) && !isNaN(d.expenses))
  if (validData.length === 0) return

  const maxVal = Math.max(1, ...validData.map(d => Math.max(d.income, d.expenses)))
  const minVal = Math.min(0, ...validData.map(d => Math.min(d.income, d.expenses)))

  const yScale = (val) => padT + innerH - ((val - minVal) / (maxVal - minVal)) * innerH
  const xScale = (idx) => padL + (idx / (months.length - 1)) * innerW

  // Draw X-axis
  const xAxisY = yScale(0)
  svg.appendChild(ns('line')).setAttributes({
    x1: padL, y1: xAxisY, x2: padL + innerW, y2: xAxisY, stroke: '#374151', 'stroke-width': 1
  })

  // Draw Y-axis
  svg.appendChild(ns('line')).setAttributes({
    x1: padL, y1: padT, x2: padL, y2: padT + innerH, stroke: '#374151', 'stroke-width': 1
  })

  // X-axis labels
  months.forEach((monthKey, i) => {
    const x = xScale(i)
    svg.appendChild(text(x, xAxisY + 20, monthKey.slice(0, 7), 'middle', '#94a3b8', 14))
  })

  // Y-axis labels
  const numYLabels = 5
  for (let i = 0; i <= numYLabels; i++) {
    const val = minVal + (i / numYLabels) * (maxVal - minVal)
    const y = yScale(val)
    svg.appendChild(text(padL - 10, y + 5, fmt(val), 'end', '#94a3b8', 14))
    svg.appendChild(ns('line')).setAttributes({
      x1: padL, y1: y, x2: padL + innerW, y2: y, stroke: '#374151', 'stroke-dasharray': '2,2', 'stroke-width': 0.5
    })
  }

  // Draw Income Line
  const incomePath = ns('path')
  let dIncome = `M${xScale(0)},${yScale(data[0].income)}`
  for (let i = 1; i < data.length; i++) {
    dIncome += `L${xScale(i)},${yScale(data[i].income)}`
  }
  incomePath.setAttribute('d', dIncome)
  incomePath.setAttribute('fill', 'none')
  incomePath.setAttribute('stroke', '#3b82f6') // Blue for Income
  incomePath.setAttribute('stroke-width', 3)
  svg.appendChild(incomePath)

  // Draw Expenses Line
  const expensesPath = ns('path')
  let dExpenses = `M${xScale(0)},${yScale(data[0].expenses)}`
  for (let i = 1; i < data.length; i++) {
    dExpenses += `L${xScale(i)},${yScale(data[i].expenses)}`
  }
  expensesPath.setAttribute('d', dExpenses)
  expensesPath.setAttribute('fill', 'none')
  expensesPath.setAttribute('stroke', '#ef4444') // Red for Expenses
  expensesPath.setAttribute('stroke-width', 3)
  svg.appendChild(expensesPath)

  // Add circles for data points
  data.forEach((d, i) => {
    svg.appendChild(ns('circle')).setAttributes({
      cx: xScale(i), cy: yScale(d.income), r: 4, fill: '#3b82f6', stroke: '#0a0e1a', 'stroke-width': 2
    })
    svg.appendChild(ns('circle')).setAttributes({
      cx: xScale(i), cy: yScale(d.expenses), r: 4, fill: '#ef4444', stroke: '#0a0e1a', 'stroke-width': 2
    })
  })

  // Add legend
  svg.appendChild(text(padL, padT - 15, 'Monthly Income vs. Expenses', 'start', '#f8fafc', 18, '600'))
  svg.appendChild(ns('rect')).setAttributes({ x: padL + 300, y: padT - 25, width: 15, height: 15, fill: '#3b82f6' })
  svg.appendChild(text(padL + 320, padT - 15, 'Income', 'start', '#f8fafc', 14))
  svg.appendChild(ns('rect')).setAttributes({ x: padL + 400, y: padT - 25, width: 15, height: 15, fill: '#ef4444' })
  svg.appendChild(text(padL + 420, padT - 15, 'Expenses', 'start', '#f8fafc', 14))
}

function fmt(n) { return (Math.round(n)).toLocaleString('sv-SE') }

// Helper to set multiple attributes
SVGElement.prototype.setAttributes = function(attrs) {
  for (var key in attrs) {
    this.setAttribute(key, attrs[key])
  }
  return this
}


