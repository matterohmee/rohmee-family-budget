import { MODEL } from './model.js'

export function monthList(year, startMonth = 1){
  const a=[];
  let currentMonth = startMonth;
  let currentYear = year;
  for(let i=0;i<12;i++){
    a.push(`${currentYear}-${String(currentMonth).padStart(2,'0')}`);
    currentMonth++;
    if(currentMonth > 12){
      currentMonth = 1;
      currentYear++;
    }
  }
  return a
}

export function ensureMonth(state, key){
  if(!state.months[key]){
    let b={},a={}
    Object.keys(MODEL).forEach(p=>{ b[p]={}; a[p]={}; Object.keys(MODEL[p]).forEach(s=>{ b[p][s]=MODEL[p][s]; a[p][s]=MODEL[p][s]; }) })
    state.months[key]={income: state.defaultIncome || 0, budget:b,actual:a}
  }else{
    Object.keys(MODEL).forEach(p=>{
      if(!state.months[key].budget[p]){ state.months[key].budget[p]={}; state.months[key].actual[p]={}; }
      Object.keys(MODEL[p]).forEach(s=>{
        if(state.months[key].budget[p][s]===undefined) state.months[key].budget[p][s]=MODEL[p][s]
        if(state.months[key].actual[p][s]===undefined) state.months[key].actual[p][s]=MODEL[p][s]
      })
    })
    if(state.months[key].income===undefined) state.months[key].income = state.defaultIncome || 0
  }
}


