import { monthTotals, real } from '../state/calc.js'

const ns = t => document.createElementNS('http://www.w3.org/2000/svg', t)
const text = (x,y,t,anchor='start',fill='#cbd5e1',fs=12)=>{const el=ns('text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('text-anchor',anchor);el.setAttribute('fill',fill);el.setAttribute('font-size',fs);el.textContent=t;return el}

export function drawGlidepath(state, key){
  const svg=document.getElementById('glidepath'); while(svg.firstChild) svg.removeChild(svg.firstChild)
  const W=600,H=250,padL=50,padR=20,padT=20,padB=40,innerW=W-padL-padR,innerH=H-padT-padB
  
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
  
  const idx=state.order.indexOf(key)
  
  // Calculate R12M (Rolling 12-Month) savings - only count past months that exist
  const pastMonths = months.filter(k => {
    const monthIdx = state.order.indexOf(k)
    return monthIdx >= 0 && monthIdx <= idx
  })
  
  const r12mSavings = pastMonths.map(mk => {
    const monthData = state.months[mk]
    if (!monthData) return 0
    const income = monthData.income || 0
    const expenses = monthTotals(state, mk).aTotal || 0
    return Math.max(0, income - expenses)
  }).reduce((a, b) => a + b, 0)
  
  // Calculate remaining months in the fiscal year
  const remainingMonths = months.filter(k => {
    const monthIdx = state.order.indexOf(k)
    return monthIdx < 0 || monthIdx > idx
  }).length
  
  // Calculate what's needed to hit annual target
  const annualTarget = state.target || 0
  const remainingToTarget = Math.max(0, annualTarget - r12mSavings)
  const requiredPerMonth = remainingMonths > 0 ? remainingToTarget / remainingMonths : 0
  
  // Monthly target for comparison (annual target / 12)
  const monthlyTarget = annualTarget / 12
  const series = []
  months.forEach(mk => {
    const monthIdx = state.order.indexOf(mk)
    if (monthIdx >= 0 && monthIdx <= idx) {
      // Past/current month - show actual savings
      const monthData = state.months[mk]
      const income = (monthData && monthData.income) || 0
      const expenses = monthData ? monthTotals(state, mk).aTotal : 0
      const actualSavings = Math.max(0, income - expenses)
      series.push({ m: mk, v: actualSavings, t: 'actual' })
    } else {
      // Future month - show required savings
      series.push({ m: mk, v: requiredPerMonth, t: 'required' })
    }
  })
  
  const ymax = Math.max(monthlyTarget, ...series.map(s => s.v), 1)
  const bw = innerW / months.length * 0.65
  
  series.forEach((s, i) => {
    const h = (s.v / ymax) * innerH
    const x = padL + i * (innerW / months.length) + ((innerW / months.length) - bw) / 2
    const y = padT + innerH - h
    
    let color
    if (s.t === 'actual') {
      color = s.v >= monthlyTarget ? '#10b981' : '#ef4444' // Green if above target, red if below
    } else {
      color = '#f59e0b' // Orange for required future savings
    }
    
    const r = ns('rect')
    r.setAttribute('x', x)
    r.setAttribute('y', y)
    r.setAttribute('width', bw)
    r.setAttribute('height', h)
    r.setAttribute('fill', color)
    svg.appendChild(r)
    
    svg.appendChild(text(x + bw / 2, H - 12, s.m.slice(5), 'middle', '#9aa3b2', 12))
  })
  
  // Monthly target line
  const ty = padT + innerH - (monthlyTarget / ymax) * innerH
  const line = ns('line')
  line.setAttribute('x1', padL)
  line.setAttribute('x2', padL + innerW)
  line.setAttribute('y1', ty)
  line.setAttribute('y2', ty)
  line.setAttribute('stroke', '#93c5fd')
  line.setAttribute('stroke-dasharray', '5,5')
  svg.appendChild(line)
  
  svg.appendChild(text(padL + innerW - 6, ty - 6, 'Monthly target ' + fmt(real(state, monthlyTarget)), 'end', '#cfe4ff', 16))
  
  // Update pill with correct status
  const pill = document.getElementById('glidePill')
  if (pill) {
    if (remainingToTarget <= 0) {
      pill.textContent = 'On track ✔'
      pill.classList.add('ok')
    } else {
      pill.textContent = 'From now: need ' + fmt(real(state, requiredPerMonth)) + ' SEK / month'
      pill.classList.remove('ok')
    }
  }
}

function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
