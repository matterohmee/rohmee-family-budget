import { ensureMonth } from './utils.js'

export function monthTotals(state, key){
  ensureMonth(state,key)
  const m = state.months[key]
  const bP = rollParents(m.budget), aP = rollParents(m.actual)
  let bT=0,aT=0; Object.keys(bP).forEach(p=>{ bT+=bP[p]; aT+=aP[p]||0 })
  return { bParents:bP, aParents:aP, bTotal:bT, aTotal:aT }
}
export function prevMonthKey(state,key){ const i=state.order.indexOf(key); return i>0 ? state.order[i-1] : null }
export function real(state,n){ return n/(state.cpi||1) }
export function sumObj(o){ let t=0; Object.keys(o).forEach(k=>t+=(+o[k]||0)); return t }
export function rollParents(obj){ let r={}; Object.keys(obj).forEach(p=>r[p]=sumObj(obj[p])); return r }
