import { monthList } from '../state/utils.js'
import { exportJSON, importJSON } from '../state/storage.js'

export function renderControls(state, onChange){
  const c = document.getElementById('controls')
  c.innerHTML = `
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="number" step="500" value="${state.income}">
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="number" step="10000" value="${state.target}">
      </div>
      <div>
        <label>CPI factor (real SEK toggle)</label>
        <input id="cpiFactor" type="number" step="0.01" value="${state.cpi}">
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
  state.order.forEach(k=>{ const o=document.createElement('option'); o.value=k; o.textContent=k; sel.appendChild(o) })
  sel.value = state.order[state.order.length-1]

  sel.addEventListener('change', onChange)
  c.querySelector('#netIncome').addEventListener('input', e=>{ state.income=+e.target.value||0; onChange() })
  c.querySelector('#savTarget').addEventListener('input', e=>{ state.target=+e.target.value||0; onChange() })
  c.querySelector('#cpiFactor').addEventListener('input', e=>{ state.cpi=+e.target.value||1; onChange() })

  c.querySelector('#saveJSON').addEventListener('click', ()=>exportJSON(state))
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
