import './styles.css'
import { DEFAULT_ICONS, DEFAULT_TAGS, MODEL } from './state/model.js'
import { loadState, saveState, exportJSON, importJSON } from './state/storage.js'
import { monthTotals, prevMonthKey, real } from './state/calc.js'
import { renderControls } from './ui/controls.js'
import { renderTable } from './ui/table.js'
import { drawGauge } from './charts/gauge.js'
import { drawFixedVar } from './charts/fixedVar.js'
import { drawGlidepath } from './charts/glidepath.js'
import { drawTotalsBar } from './charts/totalsBar.js'
import { drawShareBars } from './charts/shareBars.js'
import { drawBAvsParents } from './charts/baParents.js'
import { drawHeatmap } from './charts/heatmap.js'
import { drawBridge } from './charts/bridge.js'

// App state (mutable)
export let state = loadState()

// ---------- Layout ----------
const app = document.getElementById('app')
app.innerHTML = `
  <div class="panel kpis" id="kpiStrip"></div>

  <div class="panel controlsArea">
    <div class="controls" id="controls"></div>
    <div class="stack" id="rightStack">
      <div class="subpanel grid2">
        <div>
          <div class="legend"><span><i class="sw" style="background:#34d399"></i>YTD Savings vs Year Target</span></div>
          <svg id="ytdGauge" class="chart tiny" viewBox="0 0 760 300" aria-label="YTD gauge"></svg>
        </div>
        <div>
          <div class="legend"><span><i class="sw" style="background:#06b6d4"></i>Fixed vs Variable (donut)</span></div>
          <svg id="fixedVarMini" class="chart tiny" viewBox="0 0 760 300" aria-label="Fixed vs Variable donut"></svg>
        </div>
      </div>

      <div class="subpanel" style="position:relative">
        <div class="legend"><span><i class="sw" style="background:#f59e0b"></i>Glidepath — required per month to hit target</span></div>
        <div id="glidePill" class="pill"></div>
        <svg id="glidepath" class="chart small" viewBox="0 0 760 320" aria-label="Glidepath"></svg>
      </div>

      <div class="subpanel">
        <div class="legend"><span><i class="sw" style="background:#93c5fd"></i>Totals: Income / Budget / Actual / Savings</span></div>
        <svg id="barSummary" class="chart small" viewBox="0 0 760 320" aria-label="Summary bars"></svg>
      </div>
    </div>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#fbbf24"></i>Share of total spend (parents, sorted)</span></div>
    <svg id="shareBars" class="chart tall" viewBox="0 0 1200 700" aria-label="Share bars"></svg>
  </div>

  <div class="panel">
    <table id="dataTable">
      <thead><tr><th>▸ Category</th><th class="num">Budget</th><th class="num">Actual</th><th class="num">Var</th></tr></thead>
      <tbody></tbody>
    </table>
    <div class="addrow">
      <span style="color:var(--muted)">Add new parent category</span>
      <input id="newParentName" class="mini" placeholder="e.g., Pets" />
      <button class="btn" id="btnAddParentInline">+ Add</button>
    </div>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#3b82f6"></i>Budget</span><span><i class="sw" style="background:#10b981"></i>Actual</span></div>
    <svg id="baParents" class="chart" viewBox="0 0 1200 460" aria-label="Budget vs Actual per parent"></svg>
  </div>

  <div class="panel">
    <div class="legend"><span><i class="sw" style="background:#ef4444"></i>Over</span><span><i class="sw" style="background:#22c55e"></i>Under</span></div>
    <svg id="heatmapVar" class="chart" viewBox="0 0 1200 440" aria-label="Variance heatmap"></svg>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background:#64748b"></i>Start/End</span>
      <span><i class="sw" style="background:#ef4444"></i>Increase</span>
      <span><i class="sw" style="background:#10b981"></i>Decrease</span>
    </div>
    <div class="help" style="color:var(--muted);font-size:12px;">Explains why this month's total changed vs last month. Bars are labeled; red = categories that got more expensive, green = cheaper.</div>
    <svg id="bridge" class="chart" viewBox="0 0 1200 420" aria-label="Bridge"></svg>
  </div>
`

// ---------- Controls + KPIs ----------
renderControls(state, onStateChange)
renderKPIs(state, currentMonth())

// ---------- First render ----------
drawAll()

// ---------- Expose helpers for overrides ----------
window.state = state
window.drawAll = drawAll
window.monthTotals = (key)=>monthTotals(state,key)

function currentMonth(){
  return state.order[state.order.length-1]
}

function onStateChange(){
  saveState(state)
  renderKPIs(state, currentMonth())
  drawAll()
}

function renderKPIs(st, key){
  const kpi = document.getElementById('kpiStrip')
  kpi.innerHTML = ''
  const mt = monthTotals(st, key)
  const income = st.months[key].income || 0
  const savings = real(st, income - mt.aTotal)
  const rate = income>0 ? (income - mt.aTotal)/income : 0
  const budgetUsed = mt.bTotal>0 ? (mt.aTotal/mt.bTotal) : 0
  const ytd = st.order.filter(k => k.slice(0,4)===key.slice(0,4) && k<=key)
  const ytdSav = ytd.map(mk => (st.months[mk].income||0) - monthTotals(st,mk).aTotal).reduce((a,b)=>a+b,0)
  const items=[
    {lab:'Monthly Savings (real SEK)', val: fmt(savings)},
    {lab:'Savings Rate', val: (rate*100).toFixed(1)+' %'},
    {lab:'% of Budget Used', val: (budgetUsed*100).toFixed(0)+' %'},
    {lab:'YTD Savings', val: fmt(real(st,ytdSav))+' SEK'},
  ]
  items.forEach(it=>{
    const card = document.createElement('div')
    card.className='kpi'
    card.innerHTML = `<div class="lab">${it.lab}</div><div class="val">${it.val}</div>`
    kpi.appendChild(card)
  })
}

function drawAll(){
  const key = document.getElementById('monthSel').value
  drawGauge(state, key)
  drawFixedVar(state, key)
  drawGlidepath(state, key)
  drawTotalsBar(state, key)
  drawShareBars(state, key)
  drawBAvsParents(state, key)
  drawHeatmap(state, key)
  drawBridge(state, key)
}

function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
