import { ensureMonth } from './utils.js'
import { MODEL } from './model.js'

export function monthTotals(state, key){
  ensureMonth(state,key)
  const m = state.months[key]
  const bP = rollParents(m.budget), aP = rollParents(m.actual)
  let bT=0,aT=0,aSavings=0; 
  Object.keys(bP).forEach(p=>{ 
    bT+=bP[p]; 
    const actualAmount = aP[p]||0
    const tag = state.tags[p] || 'V'
    if(tag.includes('S')) {
      // Categories with Savings tag (FS or VS) count as savings, not expenses
      aSavings += actualAmount
    } else {
      // Regular categories count as expenses
      aT += actualAmount
    }
  })
  return { bParents:bP, aParents:aP, bTotal:bT, aTotal:aT, aSavings:aSavings }
}
export function prevMonthKey(state,key){ const i=state.order.indexOf(key); return i>0 ? state.order[i-1] : null }
export function real(state,n){ return n/(state.cpi||1) }
export function sumObj(o, model){
  let t=0
  Object.keys(model||{}).forEach(k=>t+=(+o[k]||0))
  return t
}
export function rollParents(obj){
  let r={}
  Object.keys(MODEL).forEach(p=>r[p]=sumObj(obj[p]||{}, MODEL[p]||{}))
  return r
}
