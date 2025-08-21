import { exportJSON, importJSON } from '../state/storage.js'

export function renderControls(state, onChange){
  const c = document.getElementById('controls')
  const current = state.order[state.order.length-1]
  c.innerHTML = `
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="text" inputmode="numeric" value="${fmt(state.months[current].income || 0)}">
        <span id="netIncomeFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="text" inputmode="numeric" value="${fmt(state.target)}">
        <span id="savTargetFeedback" class="feedback-icon"></span>
      </div>
      <div>
        <label>CPI factor (real SEK toggle)</label>
        <input id="cpiFactor" type="number" step="0.01" value="${state.cpi}">
        <span id="cpiFactorFeedback" class="feedback-icon"></span>
      </div>
      <div class="row">
        <button class="btn ghost" id="exportCSV">Export CSV</button>
        <button class="btn" id="saveJSON">Save JSON</button>
        <label for="loadJsonInput" class="chip">Load JSON</label>
        <input id="loadJsonInput" type="file" accept="application/json" style="display:none">
      </div>
      <div class="help" style="color:var(--muted)">Tip: double‑click names to rename; +/− to add/remove; click parent to highlight; ▸ to collapse/expand; F/V to toggle fixed vs variable.</div>
    </div>
  `
  const sel = c.querySelector('#monthSel')
  
  // Create fiscal year ordered months starting from September
  const currentMonth = current.slice(5, 7)
  const currentYear = current.slice(0, 4)
  
  // Create rolling 12-month sequence starting from September
  const fiscalYearOrder = []
  
  if (parseInt(currentMonth) >= 9) {
    // If current month is Sep or later, show Sep-Dec of current year, then Jan-Aug of next year
    for(let m = 9; m <= 12; m++) {
      const monthKey = `${currentYear}-${m.toString().padStart(2, '0')}`
      if(state.order.includes(monthKey)) fiscalYearOrder.push(monthKey)
    }
    const nextYear = (parseInt(currentYear) + 1).toString()
    for(let m = 1; m <= 8; m++) {
      const monthKey = `${nextYear}-${m.toString().padStart(2, '0')}`
      if(state.order.includes(monthKey)) fiscalYearOrder.push(monthKey)
    }
  } else {
    // If current month is before Sep, show Sep-Dec of previous year, then Jan-Aug of current year
    const prevYear = (parseInt(currentYear) - 1).toString()
    for(let m = 9; m <= 12; m++) {
      const monthKey = `${prevYear}-${m.toString().padStart(2, '0')}`
      if(state.order.includes(monthKey)) fiscalYearOrder.push(monthKey)
    }
    for(let m = 1; m <= 8; m++) {
      const monthKey = `${currentYear}-${m.toString().padStart(2, '0')}`
      if(state.order.includes(monthKey)) fiscalYearOrder.push(monthKey)
    }
  }
  
  // Add any remaining months that weren't included in fiscal year order
  state.order.forEach(k => {
    if (!fiscalYearOrder.includes(k)) {
      fiscalYearOrder.push(k)
    }
  })
  
  // Populate dropdown with fiscal year ordered months
  fiscalYearOrder.forEach(k => { 
    const o = document.createElement('option'); 
    o.value = k; 
    o.textContent = k; 
    sel.appendChild(o) 
  })
  sel.value = current
  const netInput = c.querySelector("#netIncome")
  const savInput = c.querySelector("#savTarget")
  const cpiInput = c.querySelector("#cpiFactor")

  function fmt(n) { return (Math.round(n)).toLocaleString("sv-SE") }
  function parseFormattedNumber(s) { return parseFloat(s.replace(/\s/g, "").replace(",", ".")) || 0 }

  sel.addEventListener("change", e => {
    netInput.value = fmt(state.months[sel.value].income || 0)
    savInput.value = fmt(state.target)
    cpiInput.value = state.cpi
    onChange()
  })

  netInput.addEventListener("input", e => {
    const rawValue = e.target.value.replace(/\s/g, "")
    const numValue = parseFormattedNumber(rawValue)
    if (!isNaN(numValue)) {
      state.months[sel.value].income = numValue
      e.target.value = fmt(numValue)
      document.getElementById("netIncomeFeedback").innerHTML = '&#10004;' // Checkmark
      document.getElementById("netIncomeFeedback").style.color = "green"
    } else {
      document.getElementById("netIncomeFeedback").innerHTML = '&#10060;' // Cross mark
      document.getElementById("netIncomeFeedback").style.color = "red"
    }
    onChange()
  })

  savInput.addEventListener("input", e => {
    const rawValue = e.target.value.replace(/\s/g, "")
    const numValue = parseFormattedNumber(rawValue)
    if (!isNaN(numValue)) {
      state.target = numValue
      e.target.value = fmt(numValue)
      document.getElementById("savTargetFeedback").innerHTML = '&#10004;'
      document.getElementById("savTargetFeedback").style.color = "green"
    } else {
      document.getElementById("savTargetFeedback").innerHTML = '&#10060;'
      document.getElementById("savTargetFeedback").style.color = "red"
    }
    onChange()
  })

  cpiInput.addEventListener("input", e => {
    const numValue = parseFloat(e.target.value)
    if (!isNaN(numValue)) {
      state.cpi = numValue
      document.getElementById("cpiFactorFeedback").innerHTML = '&#10004;'
      document.getElementById("cpiFactorFeedback").style.color = "green"
    } else {
      document.getElementById("cpiFactorFeedback").innerHTML = '&#10060;'
      document.getElementById("cpiFactorFeedback").style.color = "red"
    }
    onChange()
  })

  c.querySelector("#saveJSON").addEventListener("click", () => exportJSON(state))
  c.querySelector('#loadJsonInput').addEventListener('change', e=>{ const f=e.target.files[0]; if(f) importJSON(f, st=>{ Object.assign(state, st); onChange() }) })
  c.querySelector('#exportCSV').addEventListener('click', ()=>{
    const rows = [['Month','Parent','Sub','Budget','Actual']]
    state.order.forEach(k=>{
      const m = state.months[k]
      Object.keys(m.budget).forEach(p=>Object.keys(m.budget[p]).forEach(s=>{
        rows.push([k,p,s,m.budget[p][s], m.actual[p][s]])
      }))
    })
    const csv = rows.map(r=>r.map(x=>`"${String(x).replace('"','""')}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='budget.csv'; a.click()
    setTimeout(()=>URL.revokeObjectURL(a.href), 1000)
  })
}
