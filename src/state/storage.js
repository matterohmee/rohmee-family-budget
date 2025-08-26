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
      if(!st.order || !st.order.length) st.order = monthList(2025, 9)
      st.order.forEach(k => ensureMonth(st,k))
      st.icons = st.icons || DEFAULT_ICONS
      st.tags  = st.tags  || DEFAULT_TAGS
      // Load custom categories from state, merge with default MODEL
      st.categories = st.categories || JSON.parse(JSON.stringify(MODEL))
      // Update the global MODEL with saved categories
      Object.assign(MODEL, st.categories)
      return st
    }catch(e){ /* fallthrough to default */ }
  }
  const st = { defaultIncome:DEFAULT_INCOME, target:250000, cpi:1.00, order:monthList(2025, 9), months:{}, icons:DEFAULT_ICONS, tags:DEFAULT_TAGS, selected:null, version:VERSION, categories:JSON.parse(JSON.stringify(MODEL)) }
  st.order.forEach(k => ensureMonth(st,k))

  saveState(st)
  return st
}

export function saveState(st){
  // Save current MODEL state to categories before saving
  st.categories = JSON.parse(JSON.stringify(MODEL))
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
      
      // Load categories from imported data and update MODEL
      if(st.categories) {
        // Clear existing MODEL and replace with imported categories
        Object.keys(MODEL).forEach(key => delete MODEL[key])
        Object.assign(MODEL, st.categories)
      }
      
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
