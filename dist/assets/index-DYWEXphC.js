(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const ot={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},ct={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},I={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function dt(e){const s=[];for(let t=1;t<=12;t++)s.push(`${e}-${String(t).padStart(2,"0")}`);return s}function et(e,s){if(e.months[s])Object.keys(I).forEach(t=>{e.months[s].budget[t]||(e.months[s].budget[t]={},e.months[s].actual[t]={}),Object.keys(I[t]).forEach(r=>{e.months[s].budget[t][r]===void 0&&(e.months[s].budget[t][r]=I[t][r]),e.months[s].actual[t][r]===void 0&&(e.months[s].actual[t][r]=I[t][r])})}),e.months[s].income===void 0&&(e.months[s].income=e.defaultIncome||0);else{let t={},r={};Object.keys(I).forEach(a=>{t[a]={},r[a]={},Object.keys(I[a]).forEach(n=>{t[a][n]=I[a][n],r[a][n]=I[a][n]})}),e.months[s]={income:e.defaultIncome||0,budget:t,actual:r}}}const St="rohmee_budget_live",Tt=2,$t=108e3;function Pt(){let e=localStorage.getItem(St);if(e)try{const t=JSON.parse(e);return t.version=t.version||0,kt(t),(!t.order||!t.order.length)&&(t.order=dt(2025)),t.order.forEach(r=>et(t,r)),t.icons=t.icons||ot,t.tags=t.tags||ct,t}catch{}const s={defaultIncome:$t,target:25e4,cpi:1,order:dt(2025),months:{},icons:ot,tags:ct,selected:null,version:Tt};return s.order.forEach(t=>et(s,t)),["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07"].forEach(t=>{const r=s.months[t];Object.keys(r.actual).forEach(a=>Object.keys(r.actual[a]).forEach(n=>{const i=r.budget[a][n],o=Math.random()*.2-.05;r.actual[a][n]=Math.max(0,Math.round(i*(1+o)))}))}),rt(s),s}function rt(e){localStorage.setItem(St,JSON.stringify(e))}function Nt(e){const s=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(s),t.download="rohmee_budget.json",t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}function Ft(e,s){const t=new FileReader;t.onload=()=>{try{const r=JSON.parse(t.result);kt(r),rt(r),s(r)}catch{alert("Invalid JSON file")}},t.readAsText(e)}function kt(e){e.version<2&&(e.defaultIncome=e.income||$t,delete e.income,e.order&&e.order.forEach(s=>{const t=e.months[s];t&&t.income===void 0&&(t.income=e.defaultIncome)})),e.version=Tt}function P(e,s){et(e,s);const t=e.months[s],r=lt(t.budget),a=lt(t.actual);let n=0,i=0;return Object.keys(r).forEach(o=>{n+=r[o],i+=a[o]||0}),{bParents:r,aParents:a,bTotal:n,aTotal:i}}function Rt(e,s){const t=e.order.indexOf(s);return t>0?e.order[t-1]:null}function O(e,s){return s/(e.cpi||1)}function zt(e){let s=0;return Object.keys(e).forEach(t=>s+=+e[t]||0),s}function lt(e){let s={};return Object.keys(e).forEach(t=>s[t]=zt(e[t])),s}function Ht(e,s){const t=document.getElementById("controls"),r=e.order[e.order.length-1];t.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="number" step="500" value="${e.months[r].income||0}">
      </div>
      <div>
        <label>Yearly Savings Target (SEK)</label>
        <input id="savTarget" type="number" step="10000" value="${e.target}">
      </div>
      <div>
        <label>CPI factor (real SEK toggle)</label>
        <input id="cpiFactor" type="number" step="0.01" value="${e.cpi}">
      </div>
      <div class="row">
        <button class="btn ghost" id="exportCSV">Export CSV</button>
        <button class="btn" id="saveJSON">Save JSON</button>
        <label for="loadJsonInput" class="chip">Load JSON</label>
        <input id="loadJsonInput" type="file" accept="application/json" style="display:none">
      </div>
      <div class="help" style="color:var(--muted)">Tip: double‑click names to rename; +/− to add/remove; click parent to highlight; ▸ to collapse/expand; F/V to toggle fixed vs variable.</div>
    </div>
  `;const a=t.querySelector("#monthSel");e.order.forEach(i=>{const o=document.createElement("option");o.value=i,o.textContent=i,a.appendChild(o)}),a.value=r;const n=t.querySelector("#netIncome");a.addEventListener("change",i=>{n.value=e.months[a.value].income||0,s()}),n.addEventListener("input",i=>{e.months[a.value].income=+i.target.value||0,s()}),t.querySelector("#savTarget").addEventListener("input",i=>{e.target=+i.target.value||0,s()}),t.querySelector("#cpiFactor").addEventListener("input",i=>{e.cpi=+i.target.value||1,s()}),t.querySelector("#saveJSON").addEventListener("click",()=>Nt(e)),t.querySelector("#loadJsonInput").addEventListener("change",i=>{const o=i.target.files[0];o&&Ft(o,m=>{Object.assign(e,m),s()})}),t.querySelector("#exportCSV").addEventListener("click",()=>{const i=[["Month","Parent","Sub","Budget","Actual"]];e.order.forEach(b=>{const g=e.months[b];Object.keys(g.budget).forEach(f=>Object.keys(g.budget[f]).forEach(S=>{i.push([b,f,S,g.budget[f][S],g.actual[f][S]])}))});const o=i.map(b=>b.map(g=>`"${String(g).replace('"','""')}"`).join(",")).join(`
`),m=document.createElement("a");m.href=URL.createObjectURL(new Blob([o],{type:"text/csv"})),m.download="budget.csv",m.click(),setTimeout(()=>URL.revokeObjectURL(m.href),1e3)})}let Y={};function N(e){const s=document.getElementById("monthSel").value,t=document.querySelector("#dataTable tbody");t.innerHTML="";const r=e.months[s];Object.keys(I).forEach(n=>{const i=mt(r.budget[n]||{}),o=mt(r.actual[n]||{}),m=document.createElement("tr");m.className="parent"+(o>i?" over":"");const b=document.createElement("td"),g=document.createElement("span");g.textContent=Y[n]?"▾":"▸",g.className="toggle",g.title="Collapse/expand",g.onclick=()=>{Y[n]=!Y[n],N(e)};const f=document.createElement("span");f.className="icon",f.textContent=e.icons[n]||"",f.title="Click to set emoji",f.style.cursor="pointer",f.onclick=()=>{const c=prompt("Set emoji for "+n+":",e.icons[n]||"");c&&(e.icons[n]=c,N(e))};const S=document.createElement("span");S.textContent=n,S.style.cursor="pointer",S.ondblclick=()=>{const c=prompt("Rename parent:",n);!c||I[c]||(I[c]=I[n],delete I[n],e.icons[c]=e.icons[n],delete e.icons[n],e.tags[c]=e.tags[n],delete e.tags[n],e.order.forEach(y=>{const x=e.months[y];x.budget[c]=x.budget[n],x.actual[c]=x.actual[n],delete x.budget[n],delete x.actual[n]}),N(e))};const k=document.createElement("span");k.className="rowtools";const $=document.createElement("span");$.className="chip",$.textContent=e.tags[n]==="F"?"Fixed":"Variable",$.title="Toggle Fixed/Variable",$.onclick=()=>{e.tags[n]=e.tags[n]==="F"?"V":"F",N(e)};const T=document.createElement("span");T.className="chip",T.textContent="+",T.title="Add subcategory",T.onclick=()=>{const c=prompt("New subcategory under "+n+":");c&&(I[n][c]=0,e.order.forEach(y=>{const x=e.months[y];x.budget[n][c]=0,x.actual[n][c]=0}),N(e))};const E=document.createElement("span");E.className="chip",E.textContent="−",E.title="Delete parent",E.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete I[n],delete e.icons[n],delete e.tags[n],e.order.forEach(c=>{const y=e.months[c];delete y.budget[n],delete y.actual[n]}),N(e))},k.appendChild($),k.appendChild(T),k.appendChild(E),b.appendChild(g),b.appendChild(f),b.appendChild(S),b.appendChild(k),m.appendChild(b);const d=document.createElement("td");d.className="num",d.textContent=D(O(e,i)),m.appendChild(d);const w=document.createElement("td");w.className="num",w.textContent=D(O(e,o)),m.appendChild(w);const h=document.createElement("td");h.className="num",h.textContent=D(O(e,i-o)),m.appendChild(h),t.appendChild(m),Y[n]&&Object.keys(I[n]).forEach(c=>{const y=document.createElement("tr");(r.actual[n]||{})[c]>(r.budget[n]||{})[c]&&(y.className="over");const x=document.createElement("td"),p=document.createElement("span");p.textContent="• "+c,p.title="Double-click to rename",p.style.cursor="text",p.ondblclick=()=>{const C=prompt("Rename subcategory:",c);C&&(I[n][C]=I[n][c],delete I[n][c],e.order.forEach(L=>{const M=e.months[L];M.budget[n][C]=M.budget[n][c],M.actual[n][C]=M.actual[n][c],delete M.budget[n][c],delete M.actual[n][c]}),N(e))},x.appendChild(p);const A=document.createElement("span");A.className="chip",A.textContent="−",A.title="Delete subcategory",A.style.marginLeft="8px",A.onclick=()=>{confirm("Delete "+c+"?")&&(delete I[n][c],e.order.forEach(C=>{const L=e.months[C];delete L.budget[n][c],delete L.actual[n][c]}),N(e))},x.appendChild(A),y.appendChild(x);const u=document.createElement("td");u.className="num",u.appendChild(ut(e,s,n,c,"budget",(r.budget[n]||{})[c]||0)),y.appendChild(u);const l=document.createElement("td");l.className="num",l.appendChild(ut(e,s,n,c,"actual",(r.actual[n]||{})[c]||0)),y.appendChild(l);const v=document.createElement("td");v.className="num",v.textContent=D(O(e,((r.budget[n]||{})[c]||0)-((r.actual[n]||{})[c]||0))),y.appendChild(v),t.appendChild(y)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(I[n]){alert("Parent already exists");return}I[n]={},e.icons[n]="📦",e.tags[n]="V",e.order.forEach(i=>{const o=e.months[i];o.budget[n]={},o.actual[n]={}}),document.getElementById("newParentName").value="",N(e)}}}function ut(e,s,t,r,a,n){const i=document.createElement("input");i.type="number",i.value=n,i.step="100",i.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const o=m=>{const b=+i.value||0;e.months[s][a][t][r]=b,N(e)};return i.addEventListener("keydown",m=>{m.key==="Enter"?(o(m.shiftKey?"up":"down"),m.preventDefault()):m.key==="Escape"&&(i.value=n,i.blur())}),i.addEventListener("blur",()=>o()),i}function mt(e){let s=0;return Object.keys(e).forEach(t=>s+=+e[t]||0),s}function D(e){return Math.round(e).toLocaleString("sv-SE")}class jt{constructor(s){this.state=s}generateInsights(s){const t=[],r=this.getRecentMonths(s,6);if(r.length<3)return t;const a=this.analyzeTrend(r);a&&t.push(a);const n=this.analyzeBudgetVariance(r);n&&t.push(n);const i=this.analyzeCategorySpending(r);t.push(...i);const o=this.analyzeSavingsRate(r);o&&t.push(o);const m=this.analyzeSeasonalPatterns(s);return m&&t.push(m),t.slice(0,8)}getRecentMonths(s,t){const r=parseInt(s.slice(0,4)),a=parseInt(s.slice(5,7)),n=[];for(let i=0;i<t;i++){let o=a-i,m=r;o<=0&&(o+=12,m-=1);const b=`${m}-${o.toString().padStart(2,"0")}`;this.state.months[b]&&n.unshift({key:b,data:P(this.state,b),income:this.state.months[b].income||0})}return n}analyzeTrend(s){if(s.length<3)return null;const t=this.calculateTrend(s.map(a=>a.data.aTotal)),r=s.reduce((a,n)=>a+n.data.aTotal,0)/s.length;if(Math.abs(t)<r*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(t>0){const a=t/r*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(t/r*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(s){const t=s[s.length-1],r=t.data.aTotal-t.data.bTotal,a=r/t.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:r>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(r)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(r))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(s){const t=[],r=s[s.length-1];if(s.length>=2){const a=s[s.length-2];Object.keys(r.data.aParents).forEach(n=>{const i=r.data.aParents[n]||0,o=a.data.aParents[n]||0;if(o>0){const m=(i-o)/o*100;if(Math.abs(m)>20&&Math.abs(i-o)>1e3){const b=this.getCategoryIcon(n);m>0?t.push({type:"warning",category:"spending",title:`${n} Spending Increased`,message:`${n} spending increased by ${m.toFixed(1)}% (${this.fmt(i-o)} SEK).`,impact:m>50?"high":"medium",icon:b,recommendation:`Review your ${n.toLowerCase()} expenses and look for ways to optimize.`}):t.push({type:"positive",category:"spending",title:`${n} Spending Decreased`,message:`Great! ${n} spending decreased by ${Math.abs(m).toFixed(1)}% (${this.fmt(Math.abs(i-o))} SEK).`,impact:"positive",icon:b})}}})}return t.slice(0,3)}analyzeSavingsRate(s){const t=s[s.length-1],r=t.income>0?(t.income-t.data.aTotal)/t.income*100:0;return r<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${r.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:r>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${r.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${r.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(s){const t=parseInt(s.slice(5,7));return t===11||t===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:t>=6&&t<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(s){const t=s.length,r=t*(t-1)/2,a=s.reduce((o,m)=>o+m,0),n=s.reduce((o,m,b)=>o+b*m,0),i=s.reduce((o,m,b)=>o+b*b,0);return(t*n-r*a)/(t*i-r*r)}getCategoryIcon(s){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[s]||"📊"}fmt(s){return Math.round(s).toLocaleString("sv-SE")}generateRecommendations(s){const t=[],r=this.getRecentMonths(s,3);if(r.length===0)return t;const a=r[r.length-1],o=r.reduce((b,g)=>b+g.data.aTotal,0)/r.length*6;if(t.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(o)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const b=(a.income-a.data.aTotal)*.7;t.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(b)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return t}}function Mt(e,s){const t=document.getElementById("insightsPanel");if(!t)return;const r=new jt(e),a=r.generateInsights(s),n=r.generateRecommendations(s);if(t.innerHTML="",a.length>0){const i=document.createElement("div");i.className="insights-section",i.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,t.appendChild(i);const o=document.getElementById("insightsGrid");a.forEach((m,b)=>{const g=Gt(m);o.appendChild(g)})}if(n.length>0){const i=document.createElement("div");i.className="insights-section",i.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,t.appendChild(i);const o=document.getElementById("recommendationsList");n.forEach((m,b)=>{const g=Vt(m);o.appendChild(g)})}requestAnimationFrame(()=>{t.querySelectorAll(".insight-card, .recommendation-card").forEach((o,m)=>{setTimeout(()=>{o.style.opacity="1",o.style.transform="translateY(0)"},m*100)})})}function Gt(e,s){const t=document.createElement("div");t.className=`insight-card insight-${e.type} insight-${e.impact}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[e.impact]||{text:"",color:"var(--text-muted)"};return t.innerHTML=`
    <div class="insight-header">
      <div class="insight-icon-wrapper">
        <span class="insight-emoji">${e.icon}</span>
      </div>
      <div class="insight-meta">
        <h4 class="insight-title">${e.title}</h4>
        ${a.text?`<span class="insight-badge" style="color: ${a.color}">${a.text}</span>`:""}
      </div>
    </div>
    <p class="insight-message">${e.message}</p>
    ${e.recommendation?`
      <div class="insight-recommendation">
        <span class="recommendation-label">💡 Recommendation:</span>
        <p>${e.recommendation}</p>
      </div>
    `:""}
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateY(-4px)",t.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),t.addEventListener("mouseleave",()=>{t.style.transform="translateY(0)",t.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),t}function Vt(e,s){const t=document.createElement("div");t.className=`recommendation-card recommendation-${e.priority}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const r={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return t.innerHTML=`
    <div class="recommendation-header">
      <span class="recommendation-icon">${e.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${e.title}</h4>
        <span class="recommendation-priority" style="color: ${r[e.priority]}">
          ${e.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${e.message}</p>
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateX(8px)",t.style.borderLeftColor=r[e.priority]}),t.addEventListener("mouseleave",()=>{t.style.transform="translateX(0)",t.style.borderLeftColor="var(--panel-border)"}),t}function Kt(){const e=document.createElement("style");e.textContent=`
    .insights-section {
      margin-bottom: var(--gap-lg);
    }

    .insights-title {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--gap);
      padding-bottom: var(--gap-sm);
      border-bottom: 2px solid var(--panel-border);
    }

    .insights-icon {
      font-size: 1.5rem;
    }

    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--gap);
    }

    .insight-card {
      background: rgba(10, 18, 36, 0.8);
      backdrop-filter: blur(15px);
      border: 1px solid var(--panel-border);
      border-radius: var(--radius-sm);
      padding: var(--pad);
      box-shadow: var(--shadow-md);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .insight-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--gradient-primary);
      opacity: 0.7;
    }

    .insight-card.insight-positive::before {
      background: var(--gradient-success);
    }

    .insight-card.insight-warning::before {
      background: var(--gradient-warning);
    }

    .insight-header {
      display: flex;
      align-items: flex-start;
      gap: var(--gap-sm);
      margin-bottom: var(--gap-sm);
    }

    .insight-icon-wrapper {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-sm);
      background: rgba(59, 130, 246, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .insight-emoji {
      font-size: 1.25rem;
    }

    .insight-meta {
      flex: 1;
    }

    .insight-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .insight-badge {
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.025em;
    }

    .insight-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0 0 var(--gap-sm) 0;
    }

    .insight-recommendation {
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: var(--radius-sm);
      padding: var(--pad-sm);
      margin-top: var(--gap-sm);
    }

    .recommendation-label {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent-primary);
      display: block;
      margin-bottom: 4px;
    }

    .insight-recommendation p {
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.4;
    }

    .recommendations-list {
      display: flex;
      flex-direction: column;
      gap: var(--gap-sm);
    }

    .recommendation-card {
      background: rgba(10, 18, 36, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid var(--panel-border);
      border-left: 4px solid var(--panel-border);
      border-radius: var(--radius-sm);
      padding: var(--pad);
      transition: all var(--transition-normal);
      cursor: pointer;
    }

    .recommendation-header {
      display: flex;
      align-items: center;
      gap: var(--gap-sm);
      margin-bottom: var(--gap-sm);
    }

    .recommendation-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .recommendation-content {
      flex: 1;
    }

    .recommendation-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    .recommendation-priority {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .recommendation-message {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.5;
      margin: 0;
    }

    @media (max-width: 768px) {
      .insights-grid {
        grid-template-columns: 1fr;
      }
      
      .insight-card {
        padding: var(--pad-sm);
      }
      
      .insights-title {
        font-size: 1.125rem;
      }
    }
  `,document.head.appendChild(e)}function j(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function X(e,s,t,r="start",a="#cbd5e1",n=12,i="normal"){const o=j("text");return o.setAttribute("x",e),o.setAttribute("y",s),o.setAttribute("text-anchor",r),o.setAttribute("fill",a),o.setAttribute("font-size",n),o.setAttribute("font-weight",i),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function pt(e,s,t,r){const a=e.querySelector("defs")||e.appendChild(j("defs")),n=j("linearGradient");n.setAttribute("id",s),n.setAttribute("x1","0%"),n.setAttribute("y1","0%"),n.setAttribute("x2","100%"),n.setAttribute("y2","100%");const i=j("stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color",t);const o=j("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",r),n.appendChild(i),n.appendChild(o),a.appendChild(n),`url(#${s})`}function Yt(e,s){const t=document.getElementById("ytdGauge");for(;t.firstChild;)t.removeChild(t.firstChild);const r=380,a=150,n=100,i=20,o=s.slice(0,4),b=e.order.filter(v=>v.slice(0,4)===o&&v<=s).map(v=>Math.max(0,(e.months[v].income||0)-P(e,v).aTotal)).reduce((v,C)=>v+C,0),g=e.target||0,f=g>0?Math.min(1,b/g):0,S=pt(t,"gaugeBg","#1e293b","#0f172a"),k=pt(t,"gaugeProgress","#10b981","#059669"),$=j("circle");$.setAttribute("cx",r),$.setAttribute("cy",a),$.setAttribute("r",n+5),$.setAttribute("fill","none"),$.setAttribute("stroke","rgba(16, 185, 129, 0.2)"),$.setAttribute("stroke-width",2),$.setAttribute("opacity","0.6"),t.appendChild($);const T=j("circle");T.setAttribute("cx",r),T.setAttribute("cy",a),T.setAttribute("r",n),T.setAttribute("fill","none"),T.setAttribute("stroke",S),T.setAttribute("stroke-width",i),T.setAttribute("stroke-linecap","round"),T.setAttribute("opacity","0.3"),t.appendChild(T);const E=2*Math.PI*n,d=j("circle");d.setAttribute("cx",r),d.setAttribute("cy",a),d.setAttribute("r",n),d.setAttribute("fill","none"),d.setAttribute("stroke",k),d.setAttribute("stroke-width",i),d.setAttribute("stroke-linecap","round"),d.setAttribute("transform",`rotate(-90 ${r} ${a})`),d.setAttribute("stroke-dasharray",`0 ${E}`),d.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))"),d.style.transition="stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(d),requestAnimationFrame(()=>{setTimeout(()=>{d.setAttribute("stroke-dasharray",`${E*f} ${E*(1-f)}`)},100)});const w=X(r,a-8,"0%","middle","#f8fafc",28,"700");t.appendChild(w);let h=0;const c=Math.round(f*100),y=c/60;function x(){h<c&&(h+=y,w.textContent=Math.round(Math.min(h,c))+"%",requestAnimationFrame(x))}setTimeout(x,200);const p=X(r,a+25,`${ht(O(e,b))} / ${ht(O(e,g))} SEK`,"middle","#94a3b8",13,"500");t.appendChild(p);const A=f>=1?"#10b981":f>=.8?"#f59e0b":"#ef4444",u=f>=1?"✓ Target Achieved":f>=.8?"⚡ On Track":"⚠ Behind Target",l=X(r,a+45,u,"middle",A,11,"600");t.appendChild(l)}function ht(e){return Math.round(e).toLocaleString("sv-SE")}function H(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function bt(e,s,t,r="start",a="#cbd5e1",n=12,i="normal"){const o=H("text");return o.setAttribute("x",e),o.setAttribute("y",s),o.setAttribute("text-anchor",r),o.setAttribute("fill",a),o.setAttribute("font-size",n),o.setAttribute("font-weight",i),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function Z(e,s,t,r){const a=e.querySelector("defs")||e.appendChild(H("defs")),n=H("linearGradient");n.setAttribute("id",s),n.setAttribute("x1","0%"),n.setAttribute("y1","0%"),n.setAttribute("x2","100%"),n.setAttribute("y2","100%");const i=H("stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color",t);const o=H("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",r),n.appendChild(i),n.appendChild(o),a.appendChild(n),`url(#${s})`}function Dt(e,s){const t=document.getElementById("fixedVarMini");for(;t.firstChild;)t.removeChild(t.firstChild);const r=380,a=150,n=100,i=20,o=P(e,s);let m=0,b=0;Object.keys(o.aParents).forEach(M=>{e.tags[M]==="F"?m+=o.aParents[M]||0:b+=o.aParents[M]||0});const g=m+b||1,f=2*Math.PI*n,S=f*(m/g),k=f*(b/g),$=Z(t,"fixedGrad","#8b5cf6","#7c3aed"),T=Z(t,"variableGrad","#06b6d4","#0891b2"),E=Z(t,"donutBg","#1e293b","#0f172a"),d=H("circle");d.setAttribute("cx",r),d.setAttribute("cy",a),d.setAttribute("r",n+5),d.setAttribute("fill","none"),d.setAttribute("stroke","rgba(139, 92, 246, 0.2)"),d.setAttribute("stroke-width",2),d.setAttribute("opacity","0.6"),t.appendChild(d);const w=H("circle");w.setAttribute("cx",r),w.setAttribute("cy",a),w.setAttribute("r",n),w.setAttribute("fill","none"),w.setAttribute("stroke",E),w.setAttribute("stroke-width",i),w.setAttribute("opacity","0.3"),t.appendChild(w);const h=H("circle");h.setAttribute("cx",r),h.setAttribute("cy",a),h.setAttribute("r",n),h.setAttribute("fill","none"),h.setAttribute("stroke",$),h.setAttribute("stroke-width",i),h.setAttribute("stroke-linecap","round"),h.setAttribute("transform",`rotate(-90 ${r} ${a})`),h.setAttribute("stroke-dasharray",`0 ${f}`),h.setAttribute("filter","drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"),h.style.transition="stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(h);const c=H("circle");c.setAttribute("cx",r),c.setAttribute("cy",a),c.setAttribute("r",n),c.setAttribute("fill","none"),c.setAttribute("stroke",T),c.setAttribute("stroke-width",i),c.setAttribute("stroke-linecap","round"),c.setAttribute("transform",`rotate(${-90+m/g*360} ${r} ${a})`),c.setAttribute("stroke-dasharray",`0 ${f}`),c.setAttribute("filter","drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"),c.style.transition="stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{h.setAttribute("stroke-dasharray",`${S} ${f-S}`)},200),setTimeout(()=>{c.setAttribute("stroke-dasharray",`${k} ${f-k}`)},400)});const y=Math.round(m/g*100),x=Math.round(b/g*100),p=bt(r,a-8,"0% Fixed","middle","#f8fafc",16,"600"),A=bt(r,a+12,"0% Variable","middle","#94a3b8",14,"500");t.appendChild(p),t.appendChild(A);let u=0,l=0;const v=y/50,C=x/50;function L(){(u<y||l<x)&&(u<y&&(u+=v,p.textContent=Math.round(Math.min(u,y))+"% Fixed"),l<x&&(l+=C,A.textContent=Math.round(Math.min(l,x))+"% Variable"),requestAnimationFrame(L))}setTimeout(L,300),h.style.cursor="pointer",c.style.cursor="pointer",h.addEventListener("mouseenter",()=>{h.setAttribute("stroke-width",i+2),h.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),h.addEventListener("mouseleave",()=>{h.setAttribute("stroke-width",i),h.style.filter="drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"}),c.addEventListener("mouseenter",()=>{c.setAttribute("stroke-width",i+2),c.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),c.addEventListener("mouseleave",()=>{c.setAttribute("stroke-width",i),c.style.filter="drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"})}const nt=e=>document.createElementNS("http://www.w3.org/2000/svg",e),gt=(e,s,t,r="start",a="#cbd5e1",n=12)=>{const i=nt("text");return i.setAttribute("x",e),i.setAttribute("y",s),i.setAttribute("text-anchor",r),i.setAttribute("fill",a),i.setAttribute("font-size",n),i.textContent=t,i};function qt(e,s){const t=document.getElementById("glidepath");for(;t.firstChild;)t.removeChild(t.firstChild);const r=760,a=320,n=60,i=20,o=20,m=50,b=r-n-i,g=a-o-m,f=s.slice(0,4),S=e.order.filter(l=>l.slice(0,4)===f),k=e.order.indexOf(s),$=e.order.filter(l=>l.slice(0,4)===f&&e.order.indexOf(l)<=k),T=$.map(l=>Math.max(0,(e.months[l].income||0)-P(e,l).aTotal)).reduce((l,v)=>l+v,0),E=12-$.length,d=Math.max(0,(e.target||0)-T),w=E>0?d/E:0,h=(e.target||0)/12,c=[];S.forEach(l=>{e.order.indexOf(l)<=k?c.push({m:l,v:Math.max(0,(e.months[l].income||0)-P(e,l).aTotal),t:"a"}):c.push({m:l,v:w,t:"r"})});const y=Math.max(h,...c.map(l=>l.v),1),x=b/S.length*.65;c.forEach((l,v)=>{const C=l.v/y*g,L=n+v*(b/S.length)+(b/S.length-x)/2,M=o+g-C,R=l.t==="a"?l.v>=h?"#10b981":"#ef4444":"#f59e0b",z=nt("rect");z.setAttribute("x",L),z.setAttribute("y",M),z.setAttribute("width",x),z.setAttribute("height",C),z.setAttribute("fill",R),t.appendChild(z),t.appendChild(gt(L+x/2,a-16,l.m.slice(5),"middle","#9aa3b2",12))});const p=o+g-h/y*g,A=nt("line");A.setAttribute("x1",n),A.setAttribute("x2",n+b),A.setAttribute("y1",p),A.setAttribute("y2",p),A.setAttribute("stroke","#93c5fd"),A.setAttribute("stroke-dasharray","5,5"),t.appendChild(A),t.appendChild(gt(n+b-6,p-6,"Monthly target "+ft(O(e,h)),"end","#cfe4ff",12));const u=document.getElementById("glidePill");u&&(d<=0?(u.textContent="On track ✔",u.classList.add("ok")):(u.textContent="From now: need "+ft(O(e,w))+" SEK / month",u.classList.remove("ok")))}function ft(e){return Math.round(e).toLocaleString("sv-SE")}const it=e=>document.createElementNS("http://www.w3.org/2000/svg",e),vt=(e,s,t,r="start",a="#cbd5e1",n=12)=>{const i=it("text");return i.setAttribute("x",e),i.setAttribute("y",s),i.setAttribute("text-anchor",r),i.setAttribute("fill",a),i.setAttribute("font-size",n),i.textContent=t,i};function Ut(e,s){const t=document.getElementById("barSummary");for(;t.firstChild;)t.removeChild(t.firstChild);const r=760,a=320,n=110,i=20,o=20,m=40,b=r-n-i,g=a-o-m,f=P(e,s),S=e.months[s].income||0,k=[{lab:"Income",val:S,c:"#60a5fa"},{lab:"Budget",val:f.bTotal,c:"#3b82f6"},{lab:"Actual",val:f.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,S-f.aTotal),c:"#34d399"}],$=Math.max(...k.map(d=>d.val),1),T=g/k.length*.55;k.forEach((d,w)=>{const h=o+w*(g/k.length)+(g/k.length-T)/2,c=d.val/$*b,y=it("rect");y.setAttribute("x",n),y.setAttribute("y",h),y.setAttribute("width",c),y.setAttribute("height",T),y.setAttribute("fill",d.c),t.appendChild(y),t.appendChild(vt(n-10,h+T/2+4,d.lab,"end","#cbd5e1",12)),t.appendChild(vt(n+c+6,h+T/2+4,Jt(O(e,d.val)),"start","#cbd5e1",12))});const E=it("line");E.setAttribute("x1",n),E.setAttribute("x2",n),E.setAttribute("y1",o),E.setAttribute("y2",o+g),E.setAttribute("stroke","#243049"),t.appendChild(E)}function Jt(e){return Math.round(e).toLocaleString("sv-SE")}const st=e=>document.createElementNS("http://www.w3.org/2000/svg",e),yt=(e,s,t,r="start",a="#cbd5e1",n=12)=>{const i=st("text");return i.setAttribute("x",e),i.setAttribute("y",s),i.setAttribute("text-anchor",r),i.setAttribute("fill",a),i.setAttribute("font-size",n),i.textContent=t,i};function Wt(e,s){const t=document.getElementById("shareBars");for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=700,n=280,i=40,o=30,m=60,b=r-n-i,g=a-o-m,f=P(e,s),S=Object.keys(I).map(d=>({p:d,v:f.aParents[d]||0})).sort((d,w)=>w.v-d.v),k=S.reduce((d,w)=>d+w.v,0)||1,$=S.length,T=g/$*.75;S.forEach((d,w)=>{const h=o+w*(g/$)+(g/$-T)/2,c=d.v/k*b,y=st("rect");y.setAttribute("x",n),y.setAttribute("y",h),y.setAttribute("width",c),y.setAttribute("height",T),y.setAttribute("fill","#3b82f6"),t.appendChild(y);const x=(e.icons[d.p]||"")+" "+d.p;t.appendChild(yt(n-16,h+T/2+6,x,"end","#cbd5e1",15)),t.appendChild(yt(n+c+12,h+T/2+6,(d.v/k*100).toFixed(1)+"%  ·  "+_t(O(e,d.v))+" SEK","start","#cbd5e1",14))});const E=st("line");E.setAttribute("x1",n),E.setAttribute("x2",n),E.setAttribute("y1",o),E.setAttribute("y2",o+g),E.setAttribute("stroke","#243049"),t.appendChild(E)}function _t(e){return Math.round(e).toLocaleString("sv-SE")}const J=e=>document.createElementNS("http://www.w3.org/2000/svg",e),xt=(e,s,t,r="start",a="#cbd5e1",n=12)=>{const i=J("text");return i.setAttribute("x",e),i.setAttribute("y",s),i.setAttribute("text-anchor",r),i.setAttribute("fill",a),i.setAttribute("font-size",n),i.textContent=t,i};function Xt(e,s){const t=document.getElementById("baParents");for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=460,n=260,i=40,o=20,m=60,b=r-n-i,g=a-o-m,f=P(e,s),S=Object.keys(I).map(w=>({p:w,b:f.bParents[w]||0,a:f.aParents[w]||0})).sort((w,h)=>h.a-w.a),k=S.length,$=g/k,T=$*.35,E=Math.max(...S.map(w=>Math.max(w.a,w.b)),1);S.forEach((w,h)=>{const c=o+h*$+$/2,y=w.b/E*b,x=w.a/E*b,p=J("rect");p.setAttribute("x",n),p.setAttribute("y",c-T-3),p.setAttribute("width",y),p.setAttribute("height",T),p.setAttribute("fill","#3b82f6"),t.appendChild(p);const A=J("rect");A.setAttribute("x",n),A.setAttribute("y",c+3),A.setAttribute("width",x),A.setAttribute("height",T),A.setAttribute("fill","#10b981"),t.appendChild(A);const u=(e.icons[w.p]||"")+" "+w.p;t.appendChild(xt(n-14,c+4,u,"end","#cbd5e1",14)),t.appendChild(xt(n+Math.max(y,x)+10,c+4,"B "+At(O(e,w.b))+"  A "+At(O(e,w.a)),"start","#cbd5e1",12))});const d=J("line");d.setAttribute("x1",n),d.setAttribute("x2",n),d.setAttribute("y1",o),d.setAttribute("y2",o+g),d.setAttribute("stroke","#243049"),t.appendChild(d)}function At(e){return Math.round(e).toLocaleString("sv-SE")}const It=e=>document.createElementNS("http://www.w3.org/2000/svg",e),wt=(e,s,t,r="start",a="#cbd5e1",n=12)=>{const i=It("text");return i.setAttribute("x",e),i.setAttribute("y",s),i.setAttribute("text-anchor",r),i.setAttribute("fill",a),i.setAttribute("font-size",n),i.textContent=t,i};function Zt(e,s){const t=document.getElementById("heatmapVar");for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=440,n=260,i=40,o=20,m=40,b=r-n-i,g=a-o-m,f=s.slice(0,4),S=e.order.filter(x=>x.slice(0,4)===f),k=Object.keys(I),$=S.length,T=[],E=[];k.forEach(x=>{const p=[];S.forEach(A=>{const u=P(e,A),l=u.bParents[x]||0,v=u.aParents[x]||0,C=l?(v-l)/l:0;p.push({p:x,b:l,a:v,v:C,m:A}),E.push(C)}),T.push(p)});const d=Math.min(...E,0),w=Math.max(...E,0),h=b/$,c=g/k.length;function y(x){const p=x<=0?150:0,u=30+30*Math.min(1,Math.abs(x)/(x<=0?-d:w)||0);return`hsl(${p},70%,${u}%)`}T.forEach((x,p)=>{x.forEach((u,l)=>{const v=It("rect");v.setAttribute("x",n+l*h),v.setAttribute("y",o+p*c),v.setAttribute("width",h-2),v.setAttribute("height",c-2),v.setAttribute("fill",y(u.v)),v.addEventListener("mouseenter",C=>{const L=document.getElementById("tooltip"),M=u.a-u.b,R=M>=0?"+":"";L.innerHTML=`<div><b>${u.p}</b> · <span class='t'>${u.m}</span></div>
                        <div>Budget: <b>${Q(O(e,u.b))}</b> SEK</div>
                        <div>Actual: <b>${Q(O(e,u.a))}</b> SEK</div>
                        <div>Variance: <b>${R+Q(O(e,M))}</b> (${u.b?(M/u.b*100).toFixed(1):"0.0"}%)</div>`,L.style.left=C.clientX+12+"px",L.style.top=C.clientY+12+"px",L.style.display="block"}),v.addEventListener("mousemove",C=>{const L=document.getElementById("tooltip");L.style.left=C.clientX+12+"px",L.style.top=C.clientY+12+"px"}),v.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),t.appendChild(v)});const A=(e.icons[k[p]]||"")+" "+k[p];t.appendChild(wt(n-14,o+p*c+c/2+4,A,"end","#cbd5e1",14))}),S.forEach((x,p)=>t.appendChild(wt(n+p*h+h/2,a-12,x.slice(5),"middle","#9aa3b2",12)))}function Q(e){return Math.round(e).toLocaleString("sv-SE")}const K=e=>document.createElementNS("http://www.w3.org/2000/svg",e),G=(e,s,t,r="start",a="#cbd5e1",n=12)=>{const i=K("text");return i.setAttribute("x",e),i.setAttribute("y",s),i.setAttribute("text-anchor",r),i.setAttribute("fill",a),i.setAttribute("font-size",n),i.textContent=t,i};function Qt(e,s){const t=document.getElementById("bridge");for(;t.firstChild;)t.removeChild(t.firstChild);const r=Rt(e,s);if(!r){t.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",14));return}const a=1200,n=420,i=80,o=40,m=30,b=60,g=a-i-o,f=n-m-b,S=P(e,s),k=P(e,r),$=k.aTotal,T=S.aTotal,E=Object.keys(I).map(v=>({p:v,icon:e.icons[v]||"",delta:(S.aParents[v]||0)-(k.aParents[v]||0)})).sort((v,C)=>Math.abs(C.delta)-Math.abs(v.delta)),d=E.slice(0,Math.min(10,E.length)),w=E.slice(d.length).reduce((v,C)=>v+C.delta,0);Math.abs(w)>.5&&d.push({p:"Others",icon:"",delta:w});const h=g/(d.length+3),c=m+f;let y=i+h;function x(v){const C=Math.max($,T,Math.max(...d.map(L=>Math.abs(L.delta)))+Math.max($,T));return m+f-v/C*f}const p=K("rect");p.setAttribute("x",y-24),p.setAttribute("y",x($)),p.setAttribute("width",48),p.setAttribute("height",c-x($)),p.setAttribute("fill","#64748b"),t.appendChild(p),t.appendChild(G(y,n-18,"Start","middle","#9aa3b2",12)),t.appendChild(G(y,x($)-6,tt(O(e,$)),"middle","#cbd5e1",12));let A=$;y+=h,d.forEach(v=>{const C=v.delta,L=C>=0,M=x(A),R=x(A+C),z=Math.min(M,R),Bt=Math.abs(R-M),V=K("rect");V.setAttribute("x",y-24),V.setAttribute("y",z),V.setAttribute("width",48),V.setAttribute("height",Bt),V.setAttribute("fill",L?"#ef4444":"#10b981"),t.appendChild(V);const _=(v.icon?v.icon+" ":"")+v.p;t.appendChild(G(y,n-18,_.length>14?_.slice(0,14)+"…":_,"middle","#9aa3b2",12));const Ot=(L?"+":"")+tt(O(e,C));t.appendChild(G(y,z-6,Ot,"middle","#cbd5e1",12)),A+=C,y+=h});const u=K("rect");u.setAttribute("x",y-24),u.setAttribute("y",x(T)),u.setAttribute("width",48),u.setAttribute("height",c-x(T)),u.setAttribute("fill","#64748b"),t.appendChild(u),t.appendChild(G(y,n-18,"End","middle","#9aa3b2",12)),t.appendChild(G(y,x(T)-6,tt(O(e,T)),"middle","#cbd5e1",12));const l=K("line");l.setAttribute("x1",i*.6),l.setAttribute("x2",a-o),l.setAttribute("y1",c),l.setAttribute("y2",c),l.setAttribute("stroke","#243049"),t.appendChild(l)}function tt(e){return Math.round(e).toLocaleString("sv-SE")}function F(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function q(e,s,t,r="start",a="#cbd5e1",n=12,i="normal"){const o=F("text");return o.setAttribute("x",e),o.setAttribute("y",s),o.setAttribute("text-anchor",r),o.setAttribute("fill",a),o.setAttribute("font-size",n),o.setAttribute("font-weight",i),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function Et(e,s,t,r){const a=e.querySelector("defs")||e.appendChild(F("defs")),n=F("linearGradient");n.setAttribute("id",s),n.setAttribute("x1","0%"),n.setAttribute("y1","0%"),n.setAttribute("x2","0%"),n.setAttribute("y2","100%");const i=F("stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color",t);const o=F("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",r),n.appendChild(i),n.appendChild(o),a.appendChild(n),`url(#${s})`}function te(e,s){const t=document.getElementById("spendingTrends");if(!t)return;for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=400,n={top:40,right:60,bottom:60,left:80},i=r-n.left-n.right,o=a-n.top-n.bottom,m=s.slice(0,4),b=parseInt(s.slice(5,7)),g=[];for(let p=11;p>=0;p--){let A=b-p,u=parseInt(m);A<=0&&(A+=12,u-=1);const l=`${u}-${A.toString().padStart(2,"0")}`;e.months[l]&&g.push({key:l,label:l.slice(5,7),data:P(e,l)})}if(g.length===0)return;const f=Math.max(...g.map(p=>p.data.aTotal)),S=i/(g.length-1),k=o/f,$=Et(t,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),T=Et(t,"trendLine","#3b82f6","#1d4ed8"),E=F("rect");E.setAttribute("x",n.left),E.setAttribute("y",n.top),E.setAttribute("width",i),E.setAttribute("height",o),E.setAttribute("fill","rgba(15, 23, 42, 0.5)"),E.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),E.setAttribute("rx",8),t.appendChild(E);for(let p=0;p<=5;p++){const A=n.top+o/5*p,u=F("line");u.setAttribute("x1",n.left),u.setAttribute("y1",A),u.setAttribute("x2",n.left+i),u.setAttribute("y2",A),u.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),u.setAttribute("stroke-width",1),u.setAttribute("stroke-dasharray","2,2"),t.appendChild(u);const l=f-f/5*p,v=q(n.left-10,A+4,U(l),"end","#94a3b8",10);t.appendChild(v)}let d=`M ${n.left} ${n.top+o}`,w="M";g.forEach((p,A)=>{const u=n.left+A*S,l=n.top+o-p.data.aTotal*k;A===0?(w+=` ${u} ${l}`,d+=` L ${u} ${l}`):(w+=` L ${u} ${l}`,d+=` L ${u} ${l}`)}),d+=` L ${n.left+(g.length-1)*S} ${n.top+o} Z`;const h=F("path");h.setAttribute("d",d),h.setAttribute("fill",$),h.setAttribute("opacity","0"),t.appendChild(h);const c=F("path");c.setAttribute("d",w),c.setAttribute("fill","none"),c.setAttribute("stroke",T),c.setAttribute("stroke-width",3),c.setAttribute("stroke-linecap","round"),c.setAttribute("stroke-linejoin","round"),c.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),c.style.strokeDasharray=c.getTotalLength(),c.style.strokeDashoffset=c.getTotalLength(),t.appendChild(c),g.forEach((p,A)=>{const u=n.left+A*S,l=n.top+o-p.data.aTotal*k,v=F("circle");v.setAttribute("cx",u),v.setAttribute("cy",l),v.setAttribute("r",6),v.setAttribute("fill","rgba(15, 23, 42, 0.9)"),v.setAttribute("stroke","#3b82f6"),v.setAttribute("stroke-width",2),v.setAttribute("opacity","0"),t.appendChild(v);const C=F("circle");C.setAttribute("cx",u),C.setAttribute("cy",l),C.setAttribute("r",4),C.setAttribute("fill","#3b82f6"),C.setAttribute("opacity","0"),C.style.cursor="pointer",t.appendChild(C);const L=q(u,n.top+o+20,p.label,"middle","#94a3b8",10);t.appendChild(L),C.addEventListener("mouseenter",()=>{C.setAttribute("r",6),C.setAttribute("fill","#1d4ed8"),v.setAttribute("opacity","1");const M=document.getElementById("tooltip");M&&(M.style.display="block",M.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${p.label}</div>
          <div>Total Spending: ${U(p.data.aTotal)} SEK</div>
          <div>Budget: ${U(p.data.bTotal)} SEK</div>
          <div>Variance: ${U(p.data.aTotal-p.data.bTotal)} SEK</div>
        `)}),C.addEventListener("mouseleave",()=>{C.setAttribute("r",4),C.setAttribute("fill","#3b82f6"),v.setAttribute("opacity","0");const M=document.getElementById("tooltip");M&&(M.style.display="none")}),C.addEventListener("mousemove",M=>{const R=document.getElementById("tooltip");R&&(R.style.left=M.pageX+10+"px",R.style.top=M.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{h.style.transition="opacity 1s ease-out",h.setAttribute("opacity","1")},200),setTimeout(()=>{c.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",c.style.strokeDashoffset="0"},400),setTimeout(()=>{g.forEach((p,A)=>{setTimeout(()=>{const u=t.querySelectorAll("circle"),l=A*2+2;u[l]&&(u[l].style.transition="opacity 0.3s ease-out",u[l].setAttribute("opacity","1")),u[l+1]&&(u[l+1].style.transition="opacity 0.3s ease-out",u[l+1].setAttribute("opacity","1"))},A*100)})},1e3)});const y=q(r/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");t.appendChild(y);const x=q(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");x.setAttribute("transform",`rotate(-90, 20, ${a/2})`),t.appendChild(x)}function U(e){return Math.round(e).toLocaleString("sv-SE")}let B=Pt();const ee=document.getElementById("app");ee.innerHTML=`
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
    <div id="insightsPanel" class="insights-panel"></div>
  </div>

  <div class="panel">
    <div class="legend">
      <span><i class="sw" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);"></i>Monthly Spending Trends</span>
    </div>
    <svg id="spendingTrends" class="chart" viewBox="0 0 1200 400" aria-label="Spending trends"></svg>
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
`;Ht(B,ne);Lt(B,W());Kt();at();Mt(B,W());N(B);window.state=B;window.drawAll=at;window.monthTotals=e=>P(B,e);function W(){return B.order[B.order.length-1]}function ne(){rt(B),Lt(B,W()),at(),Mt(B,W()),N(B)}function Lt(e,s){const t=document.getElementById("kpiStrip");t.innerHTML="";const r=P(e,s),a=e.months[s].income||0,n=O(e,a-r.aTotal),i=a>0?(a-r.aTotal)/a:0,o=r.bTotal>0?r.aTotal/r.bTotal:0,b=e.order.filter(f=>f.slice(0,4)===s.slice(0,4)&&f<=s).map(f=>(e.months[f].income||0)-P(e,f).aTotal).reduce((f,S)=>f+S,0);[{lab:"Monthly Savings (real SEK)",val:Ct(n)},{lab:"Savings Rate",val:(i*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(o*100).toFixed(0)+" %"},{lab:"YTD Savings",val:Ct(O(e,b))+" SEK"}].forEach(f=>{const S=document.createElement("div");S.className="kpi",S.innerHTML=`<div class="lab">${f.lab}</div><div class="val">${f.val}</div>`,t.appendChild(S)})}function at(){const e=document.getElementById("monthSel").value;Yt(B,e),Dt(B,e),qt(B,e),Ut(B,e),te(B,e),Wt(B,e),Xt(B,e),Zt(B,e),Qt(B,e),N(B)}function Ct(e){return Math.round(e).toLocaleString("sv-SE")}
