import { MODEL, DEFAULT_ICONS, DEFAULT_TAGS } from './model.js'
import { monthList, ensureMonth } from './utils.js'

const STORAGE_KEY = 'rohmee_budget_live'
const VERSION = 2
const DEFAULT_INCOME = 108000

export function loadState(){
  let raw = localStorage.getItem(STORAGE_KEY)
  if(raw){
    try{
      const st = JSON.parse(raw)
      st.version = st.version || 0
      migrate(st)
      if(!st.order || !st.order.length) st.order = monthList(2025)
      st.order.forEach(k => ensureMonth(st,k))
      st.icons = st.icons || DEFAULT_ICONS
      st.tags  = st.tags  || DEFAULT_TAGS
      return st
    }catch(e){ /* fallthrough to default */ }
  }
  const st = { defaultIncome:DEFAULT_INCOME, target:250000, cpi:1.00, order:monthList(2025), months:{}, icons:DEFAULT_ICONS, tags:DEFAULT_TAGS, selected:null, version:VERSION }
  st.order.forEach(k => ensureMonth(st,k))
  // seed first months with slight variance
  ;['2025-01','2025-02','2025-03','2025-04','2025-05','2025-06','2025-07'].forEach(k=>{
    const m = st.months[k]
    Object.keys(m.actual).forEach(p=>Object.keys(m.actual[p]).forEach(s=>{
      const base = m.budget[p][s]; const delta = (Math.random()*0.2-0.05)
      m.actual[p][s] = Math.max(0, Math.round(base*(1+delta)))
    }))
  })
  saveState(st)
  return st
}

export function saveState(st){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(st))
}

export function exportJSON(st){
  const blob = new Blob([JSON.stringify(st,null,2)],{type:'application/json'})
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'rohmee_budget.json'
  a.click()
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000)
}

export function importJSON(file, cb){
  const reader = new FileReader()
  reader.onload = () => {
    try{
      const st = JSON.parse(reader.result)
      migrate(st)
      saveState(st)
      cb(st)
    }catch(e){ alert('Invalid JSON file') }
  }
  reader.readAsText(file)
}

/* -------- migrations -------- */
function migrate(st){
  if(st.version < 2){
    st.defaultIncome = st.income || DEFAULT_INCOME
    delete st.income
    if(st.order){
      st.order.forEach(k=>{
        const m = st.months[k]
        if(m && m.income === undefined) m.income = st.defaultIncome
      })
    }
  }
  st.version = VERSION
}
