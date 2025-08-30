import { MODEL } from '../state/model.js'
import { monthTotals, real } from '../state/calc.js'

let expandState = {}

export function renderTable(state, onStateChange){
  const key = document.getElementById('monthSel').value
  const tb = document.querySelector('#dataTable tbody')
  tb.innerHTML=''
  const m = state.months[key]
  const parents = Object.keys(MODEL)

  parents.forEach(p=>{
    const bPar = sumObj(m.budget[p]||{}), aPar=sumObj(m.actual[p]||{})
    const trP = document.createElement('tr'); 
    trP.className='parent' + (aPar>bPar? ' over':'')
    
    // Add highlighting for selected category
    if(state.highlightedCategory && p === state.highlightedCategory) {
      trP.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'
      trP.style.borderLeft = '4px solid #3b82f6'
    }
    
    const td0 = document.createElement('td')
    const toggle=document.createElement('span'); toggle.textContent=(expandState[p]?'▾':'▸'); toggle.className='toggle'; toggle.title='Collapse/expand'
    toggle.onclick=()=>{ expandState[p]=!expandState[p]; renderTable(state, onStateChange) }
    const ic=document.createElement('span'); ic.className='icon'; ic.textContent=state.icons[p]||''; ic.title='Click to set emoji'; ic.style.cursor='pointer'
    ic.onclick=()=>{ const nv=prompt('Set emoji for '+p+':', state.icons[p]||''); if(nv){ state.icons[p]=nv; if(onStateChange) onStateChange(); } }
    const name=document.createElement('span'); name.textContent=p; name.style.cursor='pointer'
    name.onclick = () => {
      state.highlightedCategory = state.highlightedCategory === p ? null : p // Toggle highlighting
      if(onStateChange) onStateChange()
    }
    name.ondblclick=()=>{
      const nn=prompt('Rename parent:', p); if(!nn || MODEL[nn]) return;
      MODEL[nn]=MODEL[p]; delete MODEL[p]
      state.icons[nn]=state.icons[p]; delete state.icons[p]
      state.tags[nn]=state.tags[p]; delete state.tags[p]
      state.order.forEach(k=>{ const mm=state.months[k]; mm.budget[nn]=mm.budget[p]; mm.actual[nn]=mm.actual[p]; delete mm.budget[p]; delete mm.actual[p]; })
      // Ensure categories are saved to state
      state.categories = JSON.parse(JSON.stringify(MODEL))
      if(onStateChange) onStateChange();
    }
    
    // Add click handler for category highlighting
    trP.onclick = (e) => {
      // Don't trigger if clicking on tools or toggle
      if (e.target.closest('.rowtools') || e.target.closest('.toggle') || e.target.closest('.icon')) return;
      
      // Toggle highlighting for this category
      if (state.highlightedCategory === p) {
        state.highlightedCategory = null; // Remove highlight
      } else {
        state.highlightedCategory = p; // Set highlight
      }
      
      if (onStateChange) onStateChange(); // Trigger full dashboard update
    }
    
    // Add visual feedback for highlighted category
    if (state.highlightedCategory === p) {
      trP.style.background = 'rgba(59, 130, 246, 0.2)';
      trP.style.borderLeft = '4px solid #3b82f6';
    }
    const tools=document.createElement('span'); tools.className='rowtools'
    const tag=document.createElement('span'); tag.className='chip';
    const tagValue = state.tags[p] || 'V'
    if(tagValue === 'S') {
      tag.textContent = 'Savings'
      tag.style.backgroundColor = '#10b981'
      tag.style.color = 'white'
    } else if(tagValue === 'FS') {
      tag.textContent = 'Fixed+Savings'
      tag.style.backgroundColor = '#10b981'
      tag.style.color = 'white'
    } else if(tagValue === 'VS') {
      tag.textContent = 'Variable+Savings'
      tag.style.backgroundColor = '#10b981'
      tag.style.color = 'white'
    } else {
      tag.textContent = (tagValue === 'F' ? 'Fixed' : 'Variable')
    }
    tag.title='Toggle Fixed/Variable/Savings'
    tag.onclick=()=>{
      const current = state.tags[p] || 'V'
      if(current === 'F') state.tags[p] = 'V'
      else if(current === 'V') state.tags[p] = 'S'
      else state.tags[p] = 'F'
      if(onStateChange) onStateChange();
    }
    const add=document.createElement('span'); add.className='chip'; add.textContent='+'; add.title='Add subcategory'
    add.onclick=()=>{ const s=prompt('New subcategory under '+p+':'); if(!s) return; MODEL[p][s]=0; state.order.forEach(k=>{ const mm=state.months[k]; mm.budget[p][s]=0; mm.actual[p][s]=0; }); state.categories = JSON.parse(JSON.stringify(MODEL)); if(onStateChange) onStateChange(); }
    const del=document.createElement('span'); del.className='chip'; del.textContent='−'; del.title='Delete parent'
    del.onclick=()=>{ if(!confirm('Delete parent '+p+'?')) return; delete MODEL[p]; delete state.icons[p]; delete state.tags[p]; state.order.forEach(k=>{ const mm=state.months[k]; delete mm.budget[p]; delete mm.actual[p]; }); state.categories = JSON.parse(JSON.stringify(MODEL)); if(onStateChange) onStateChange(); }
    tools.appendChild(tag); tools.appendChild(add); tools.appendChild(del)

    td0.appendChild(toggle); td0.appendChild(ic); td0.appendChild(name); td0.appendChild(tools)
    trP.appendChild(td0)

    const td1=document.createElement('td'); td1.className='num'; td1.textContent=fmt(real(state,bPar)); trP.appendChild(td1)
    const td2=document.createElement('td'); td2.className='num'; td2.textContent=fmt(real(state,aPar)); trP.appendChild(td2)
    const td3=document.createElement('td'); td3.className='num'; td3.textContent=fmt(real(state,bPar-aPar)); trP.appendChild(td3)

    tb.appendChild(trP)

    if(expandState[p]){
      Object.keys(MODEL[p]).forEach(s=>{
        const tr=document.createElement('tr'); if((m.actual[p]||{})[s] > (m.budget[p]||{})[s]) tr.className='over'
        const t0=document.createElement('td'); 
        const sn=document.createElement('span'); sn.textContent='• '+s; sn.title='Double-click to rename'; sn.style.cursor='pointer'
        sn.ondblclick=()=>{
          const nn=prompt('Rename subcategory:', s); if(!nn || MODEL[p][nn]) return;
          MODEL[p][nn]=MODEL[p][s]; delete MODEL[p][s];
          state.order.forEach(k=>{ const mm=state.months[k]; mm.budget[p][nn]=mm.budget[p][s]; mm.actual[p][nn]=mm.actual[p][s]; delete mm.budget[p][s]; delete mm.actual[p][s]; })
          state.categories = JSON.parse(JSON.stringify(MODEL));
          if(onStateChange) onStateChange();
        }
        t0.appendChild(sn)
        const sd=document.createElement('span'); sd.className='chip'; sd.textContent='−'; sd.title='Delete subcategory'; sd.style.marginLeft='8px'
        sd.onclick=()=>{ if(!confirm('Delete '+s+'?')) return; delete MODEL[p][s]; state.order.forEach(k=>{ const mm=state.months[k]; delete mm.budget[p][s]; delete mm.actual[p][s]; }); state.categories = JSON.parse(JSON.stringify(MODEL)); if(onStateChange) onStateChange(); }
        t0.appendChild(sd)
        tr.appendChild(t0)

        const t1=document.createElement('td'); t1.className='num'; t1.appendChild(numInput(state, key, p, s, 'budget', (m.budget[p]||{})[s]||0, onStateChange)); tr.appendChild(t1)
        const t2=document.createElement('td'); t2.className='num'; t2.appendChild(numInput(state, key, p, s, 'actual', (m.actual[p]||{})[s]||0, onStateChange)); tr.appendChild(t2)
        const t3=document.createElement('td'); t3.className='num'; t3.textContent=fmt(real(state, ((m.budget[p]||{})[s]||0) - ((m.actual[p]||{})[s]||0))); tr.appendChild(t3)

        tb.appendChild(tr)
      })
    }
  })

  document.getElementById('btnAddParentInline').onclick=()=>{
    const name = document.getElementById('newParentName').value.trim(); if(!name) return;
    if(MODEL[name]){ alert('Parent already exists'); return }
    MODEL[name]={}; state.icons[name]='📦'; state.tags[name]='V'
    state.order.forEach(k=>{ const mm=state.months[k]; mm.budget[name]={}; mm.actual[name]={}; })
    document.getElementById('newParentName').value=''
    // Ensure categories are saved to state
    state.categories = JSON.parse(JSON.stringify(MODEL))
    if(onStateChange) onStateChange();
  }
}

function numInput(state, key, p, s, kind, val, onStateChange){
  const inp = document.createElement('input')
  inp.type='number'; inp.value=val; inp.step='100'
  inp.style='width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6'
  const commit = (move)=>{
    const v=+inp.value||0; state.months[key][kind][p][s]=v
    if(onStateChange) onStateChange(); // trigger full dashboard update
  }
  inp.addEventListener('keydown', e=>{ if(e.key==='Enter'){ commit(e.shiftKey?'up':'down'); e.preventDefault() } else if(e.key==='Escape'){ inp.value=val; inp.blur() } })
  inp.addEventListener('blur', ()=>commit())
  return inp
}

function sumObj(o){ let t=0; Object.keys(o).forEach(k=>t+=(+o[k]||0)); return t }
function fmt(n){ return (Math.round(n)).toLocaleString('sv-SE') }
