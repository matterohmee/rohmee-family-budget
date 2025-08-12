(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const ct={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},dt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},L={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function lt(e){const i=[];for(let t=1;t<=12;t++)i.push(`${e}-${String(t).padStart(2,"0")}`);return i}function nt(e,i){if(e.months[i])Object.keys(L).forEach(t=>{e.months[i].budget[t]||(e.months[i].budget[t]={},e.months[i].actual[t]={}),Object.keys(L[t]).forEach(a=>{e.months[i].budget[t][a]===void 0&&(e.months[i].budget[t][a]=L[t][a]),e.months[i].actual[t][a]===void 0&&(e.months[i].actual[t][a]=L[t][a])})}),e.months[i].income===void 0&&(e.months[i].income=e.defaultIncome||0);else{let t={},a={};Object.keys(L).forEach(r=>{t[r]={},a[r]={},Object.keys(L[r]).forEach(s=>{t[r][s]=L[r][s],a[r][s]=L[r][s]})}),e.months[i]={income:e.defaultIncome||0,budget:t,actual:a}}}const Tt="rohmee_budget_live",$t=2,kt=108e3;function Nt(){let e=localStorage.getItem(Tt);if(e)try{const t=JSON.parse(e);return t.version=t.version||0,Mt(t),(!t.order||!t.order.length)&&(t.order=lt(2025)),t.order.forEach(a=>nt(t,a)),t.icons=t.icons||ct,t.tags=t.tags||dt,t}catch{}const i={defaultIncome:kt,target:25e4,cpi:1,order:lt(2025),months:{},icons:ct,tags:dt,selected:null,version:$t};return i.order.forEach(t=>nt(i,t)),["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07"].forEach(t=>{const a=i.months[t];Object.keys(a.actual).forEach(r=>Object.keys(a.actual[r]).forEach(s=>{const n=a.budget[r][s],o=Math.random()*.2-.05;a.actual[r][s]=Math.max(0,Math.round(n*(1+o)))}))}),at(i),i}function at(e){localStorage.setItem(Tt,JSON.stringify(e))}function Ft(e){const i=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(i),t.download="rohmee_budget.json",t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}function Rt(e,i){const t=new FileReader;t.onload=()=>{try{const a=JSON.parse(t.result);Mt(a),at(a),i(a)}catch{alert("Invalid JSON file")}},t.readAsText(e)}function Mt(e){e.version<2&&(e.defaultIncome=e.income||kt,delete e.income,e.order&&e.order.forEach(i=>{const t=e.months[i];t&&t.income===void 0&&(t.income=e.defaultIncome)})),e.version=$t}function N(e,i){nt(e,i);const t=e.months[i],a=ut(t.budget),r=ut(t.actual);let s=0,n=0;return Object.keys(a).forEach(o=>{s+=a[o],n+=r[o]||0}),{bParents:a,aParents:r,bTotal:s,aTotal:n}}function zt(e,i){const t=e.order.indexOf(i);return t>0?e.order[t-1]:null}function O(e,i){return i/(e.cpi||1)}function Ht(e){let i=0;return Object.keys(e).forEach(t=>i+=+e[t]||0),i}function ut(e){let i={};return Object.keys(e).forEach(t=>i[t]=Ht(e[t])),i}function jt(e,i){const t=document.getElementById("controls"),a=e.order[e.order.length-1];t.innerHTML=`
    <div style="display:grid;gap:10px">
      <div>
        <label>Month</label>
        <select id="monthSel"></select>
      </div>
      <div>
        <label>Net Income (SEK)</label>
        <input id="netIncome" type="number" step="500" value="${e.months[a].income||0}">
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
  `;const r=t.querySelector("#monthSel");e.order.forEach(n=>{const o=document.createElement("option");o.value=n,o.textContent=n,r.appendChild(o)}),r.value=a;const s=t.querySelector("#netIncome");r.addEventListener("change",n=>{s.value=e.months[r.value].income||0,i()}),s.addEventListener("input",n=>{e.months[r.value].income=+n.target.value||0,i()}),t.querySelector("#savTarget").addEventListener("input",n=>{e.target=+n.target.value||0,i()}),t.querySelector("#cpiFactor").addEventListener("input",n=>{e.cpi=+n.target.value||1,i()}),t.querySelector("#saveJSON").addEventListener("click",()=>Ft(e)),t.querySelector("#loadJsonInput").addEventListener("change",n=>{const o=n.target.files[0];o&&Rt(o,b=>{Object.assign(e,b),i()})}),t.querySelector("#exportCSV").addEventListener("click",()=>{const n=[["Month","Parent","Sub","Budget","Actual"]];e.order.forEach(h=>{const g=e.months[h];Object.keys(g.budget).forEach(y=>Object.keys(g.budget[y]).forEach(E=>{n.push([h,y,E,g.budget[y][E],g.actual[y][E]])}))});const o=n.map(h=>h.map(g=>`"${String(g).replace('"','""')}"`).join(",")).join(`
`),b=document.createElement("a");b.href=URL.createObjectURL(new Blob([o],{type:"text/csv"})),b.download="budget.csv",b.click(),setTimeout(()=>URL.revokeObjectURL(b.href),1e3)})}let K={};function W(e,i){const t=document.getElementById("monthSel").value,a=document.querySelector("#dataTable tbody");a.innerHTML="";const r=e.months[t];Object.keys(L).forEach(n=>{const o=pt(r.budget[n]||{}),b=pt(r.actual[n]||{}),h=document.createElement("tr");h.className="parent"+(b>o?" over":"");const g=document.createElement("td"),y=document.createElement("span");y.textContent=K[n]?"▾":"▸",y.className="toggle",y.title="Collapse/expand",y.onclick=()=>{K[n]=!K[n],W(e,i)};const E=document.createElement("span");E.className="icon",E.textContent=e.icons[n]||"",E.title="Click to set emoji",E.style.cursor="pointer",E.onclick=()=>{const c=prompt("Set emoji for "+n+":",e.icons[n]||"");c&&(e.icons[n]=c,i&&i())};const k=document.createElement("span");k.textContent=n,k.style.cursor="pointer",k.ondblclick=()=>{const c=prompt("Rename parent:",n);!c||L[c]||(L[c]=L[n],delete L[n],e.icons[c]=e.icons[n],delete e.icons[n],e.tags[c]=e.tags[n],delete e.tags[n],e.order.forEach(x=>{const u=e.months[x];u.budget[c]=u.budget[n],u.actual[c]=u.actual[n],delete u.budget[n],delete u.actual[n]}),i&&i())};const $=document.createElement("span");$.className="rowtools";const S=document.createElement("span");S.className="chip",S.textContent=e.tags[n]==="F"?"Fixed":"Variable",S.title="Toggle Fixed/Variable",S.onclick=()=>{e.tags[n]=e.tags[n]==="F"?"V":"F",i&&i()};const C=document.createElement("span");C.className="chip",C.textContent="+",C.title="Add subcategory",C.onclick=()=>{const c=prompt("New subcategory under "+n+":");c&&(L[n][c]=0,e.order.forEach(x=>{const u=e.months[x];u.budget[n][c]=0,u.actual[n][c]=0}),i&&i())};const d=document.createElement("span");d.className="chip",d.textContent="−",d.title="Delete parent",d.onclick=()=>{confirm("Delete parent "+n+"?")&&(delete L[n],delete e.icons[n],delete e.tags[n],e.order.forEach(c=>{const x=e.months[c];delete x.budget[n],delete x.actual[n]}),i&&i())},$.appendChild(S),$.appendChild(C),$.appendChild(d),g.appendChild(y),g.appendChild(E),g.appendChild(k),g.appendChild($),h.appendChild(g);const A=document.createElement("td");A.className="num",A.textContent=Y(O(e,o)),h.appendChild(A);const f=document.createElement("td");f.className="num",f.textContent=Y(O(e,b)),h.appendChild(f);const m=document.createElement("td");m.className="num",m.textContent=Y(O(e,o-b)),h.appendChild(m),a.appendChild(h),K[n]&&Object.keys(L[n]).forEach(c=>{const x=document.createElement("tr");(r.actual[n]||{})[c]>(r.budget[n]||{})[c]&&(x.className="over");const u=document.createElement("td"),w=document.createElement("span");w.textContent="• "+c,w.title="Double-click to rename",w.style.cursor="text",w.ondblclick=()=>{const M=prompt("Rename subcategory:",c);M&&(L[n][M]=L[n][c],delete L[n][c],e.order.forEach(I=>{const P=e.months[I];P.budget[n][M]=P.budget[n][c],P.actual[n][M]=P.actual[n][c],delete P.budget[n][c],delete P.actual[n][c]}),i&&i())},u.appendChild(w);const l=document.createElement("span");l.className="chip",l.textContent="−",l.title="Delete subcategory",l.style.marginLeft="8px",l.onclick=()=>{confirm("Delete "+c+"?")&&(delete L[n][c],e.order.forEach(M=>{const I=e.months[M];delete I.budget[n][c],delete I.actual[n][c]}),i&&i())},u.appendChild(l),x.appendChild(u);const p=document.createElement("td");p.className="num",p.appendChild(mt(e,t,n,c,"budget",(r.budget[n]||{})[c]||0,i)),x.appendChild(p);const v=document.createElement("td");v.className="num",v.appendChild(mt(e,t,n,c,"actual",(r.actual[n]||{})[c]||0,i)),x.appendChild(v);const T=document.createElement("td");T.className="num",T.textContent=Y(O(e,((r.budget[n]||{})[c]||0)-((r.actual[n]||{})[c]||0))),x.appendChild(T),a.appendChild(x)})}),document.getElementById("btnAddParentInline").onclick=()=>{const n=document.getElementById("newParentName").value.trim();if(n){if(L[n]){alert("Parent already exists");return}L[n]={},e.icons[n]="📦",e.tags[n]="V",e.order.forEach(o=>{const b=e.months[o];b.budget[n]={},b.actual[n]={}}),document.getElementById("newParentName").value="",i&&i()}}}function mt(e,i,t,a,r,s,n){const o=document.createElement("input");o.type="number",o.value=s,o.step="100",o.style="width:120px;padding:6px;border-radius:8px;border:1px solid var(--muter);background:#0a1224;color:#e6edf6";const b=h=>{const g=+o.value||0;e.months[i][r][t][a]=g,n&&n()};return o.addEventListener("keydown",h=>{h.key==="Enter"?(b(h.shiftKey?"up":"down"),h.preventDefault()):h.key==="Escape"&&(o.value=s,o.blur())}),o.addEventListener("blur",()=>b()),o}function pt(e){let i=0;return Object.keys(e).forEach(t=>i+=+e[t]||0),i}function Y(e){return Math.round(e).toLocaleString("sv-SE")}class Gt{constructor(i){this.state=i}generateInsights(i){const t=[],a=this.getRecentMonths(i,6);if(a.length<3)return t;const r=this.analyzeTrend(a);r&&t.push(r);const s=this.analyzeBudgetVariance(a);s&&t.push(s);const n=this.analyzeCategorySpending(a);t.push(...n);const o=this.analyzeSavingsRate(a);o&&t.push(o);const b=this.analyzeSeasonalPatterns(i);return b&&t.push(b),t.slice(0,8)}getRecentMonths(i,t){const a=parseInt(i.slice(0,4)),r=parseInt(i.slice(5,7)),s=[];for(let n=0;n<t;n++){let o=r-n,b=a;o<=0&&(o+=12,b-=1);const h=`${b}-${o.toString().padStart(2,"0")}`;this.state.months[h]&&s.unshift({key:h,data:N(this.state,h),income:this.state.months[h].income||0})}return s}analyzeTrend(i){if(i.length<3)return null;const t=this.calculateTrend(i.map(r=>r.data.aTotal)),a=i.reduce((r,s)=>r+s.data.aTotal,0)/i.length;if(Math.abs(t)<a*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(t>0){const r=t/a*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${r.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:r>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(t/a*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const t=i[i.length-1],a=t.data.aTotal-t.data.bTotal,r=a/t.data.bTotal*100;return Math.abs(r)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(r).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:a>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(a)} SEK (${r.toFixed(1)}%).`,impact:r>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(a))} SEK (${Math.abs(r).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const t=[],a=i[i.length-1];if(i.length>=2){const r=i[i.length-2];Object.keys(a.data.aParents).forEach(s=>{const n=a.data.aParents[s]||0,o=r.data.aParents[s]||0;if(o>0){const b=(n-o)/o*100;if(Math.abs(b)>20&&Math.abs(n-o)>1e3){const h=this.getCategoryIcon(s);b>0?t.push({type:"warning",category:"spending",title:`${s} Spending Increased`,message:`${s} spending increased by ${b.toFixed(1)}% (${this.fmt(n-o)} SEK).`,impact:b>50?"high":"medium",icon:h,recommendation:`Review your ${s.toLowerCase()} expenses and look for ways to optimize.`}):t.push({type:"positive",category:"spending",title:`${s} Spending Decreased`,message:`Great! ${s} spending decreased by ${Math.abs(b).toFixed(1)}% (${this.fmt(Math.abs(n-o))} SEK).`,impact:"positive",icon:h})}}})}return t.slice(0,3)}analyzeSavingsRate(i){const t=i[i.length-1],a=t.income>0?(t.income-t.data.aTotal)/t.income*100:0;return a<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${a.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:a>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${a.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${a.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const t=parseInt(i.slice(5,7));return t===11||t===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:t>=6&&t<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const t=i.length,a=t*(t-1)/2,r=i.reduce((o,b)=>o+b,0),s=i.reduce((o,b,h)=>o+h*b,0),n=i.reduce((o,b,h)=>o+h*h,0);return(t*s-a*r)/(t*n-a*a)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const t=[],a=this.getRecentMonths(i,3);if(a.length===0)return t;const r=a[a.length-1],o=a.reduce((h,g)=>h+g.data.aTotal,0)/a.length*6;if(t.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(o)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(r.income>0?(r.income-r.data.aTotal)/r.income*100:0)>15){const h=(r.income-r.data.aTotal)*.7;t.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(h)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return t}}function It(e,i){const t=document.getElementById("insightsPanel");if(!t)return;const a=new Gt(e),r=a.generateInsights(i),s=a.generateRecommendations(i);if(t.innerHTML="",r.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,t.appendChild(n);const o=document.getElementById("insightsGrid");r.forEach((b,h)=>{const g=Vt(b);o.appendChild(g)})}if(s.length>0){const n=document.createElement("div");n.className="insights-section",n.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,t.appendChild(n);const o=document.getElementById("recommendationsList");s.forEach((b,h)=>{const g=Kt(b);o.appendChild(g)})}requestAnimationFrame(()=>{t.querySelectorAll(".insight-card, .recommendation-card").forEach((o,b)=>{setTimeout(()=>{o.style.opacity="1",o.style.transform="translateY(0)"},b*100)})})}function Vt(e,i){const t=document.createElement("div");t.className=`insight-card insight-${e.type} insight-${e.impact}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const r={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[e.impact]||{text:"",color:"var(--text-muted)"};return t.innerHTML=`
    <div class="insight-header">
      <div class="insight-icon-wrapper">
        <span class="insight-emoji">${e.icon}</span>
      </div>
      <div class="insight-meta">
        <h4 class="insight-title">${e.title}</h4>
        ${r.text?`<span class="insight-badge" style="color: ${r.color}">${r.text}</span>`:""}
      </div>
    </div>
    <p class="insight-message">${e.message}</p>
    ${e.recommendation?`
      <div class="insight-recommendation">
        <span class="recommendation-label">💡 Recommendation:</span>
        <p>${e.recommendation}</p>
      </div>
    `:""}
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateY(-4px)",t.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),t.addEventListener("mouseleave",()=>{t.style.transform="translateY(0)",t.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),t}function Kt(e,i){const t=document.createElement("div");t.className=`recommendation-card recommendation-${e.priority}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return t.innerHTML=`
    <div class="recommendation-header">
      <span class="recommendation-icon">${e.icon}</span>
      <div class="recommendation-content">
        <h4 class="recommendation-title">${e.title}</h4>
        <span class="recommendation-priority" style="color: ${a[e.priority]}">
          ${e.priority.toUpperCase()} PRIORITY
        </span>
      </div>
    </div>
    <p class="recommendation-message">${e.message}</p>
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateX(8px)",t.style.borderLeftColor=a[e.priority]}),t.addEventListener("mouseleave",()=>{t.style.transform="translateX(0)",t.style.borderLeftColor="var(--panel-border)"}),t}function Yt(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function H(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function Z(e,i,t,a="start",r="#cbd5e1",s=12,n="normal"){const o=H("text");return o.setAttribute("x",e),o.setAttribute("y",i),o.setAttribute("text-anchor",a),o.setAttribute("fill",r),o.setAttribute("font-size",s),o.setAttribute("font-weight",n),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function ht(e,i,t,a){const r=e.querySelector("defs")||e.appendChild(H("defs")),s=H("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=H("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",t);const o=H("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",a),s.appendChild(n),s.appendChild(o),r.appendChild(s),`url(#${i})`}function Dt(e,i){const t=document.getElementById("ytdGauge");for(;t.firstChild;)t.removeChild(t.firstChild);const a=380,r=150,s=100,n=20,o=i.slice(0,4),h=e.order.filter(v=>v.slice(0,4)===o&&v<=i).map(v=>Math.max(0,(e.months[v].income||0)-N(e,v).aTotal)).reduce((v,T)=>v+T,0),g=e.target||0,y=g>0?Math.min(1,h/g):0,E=ht(t,"gaugeBg","#1e293b","#0f172a"),k=ht(t,"gaugeProgress","#10b981","#059669"),$=H("circle");$.setAttribute("cx",a),$.setAttribute("cy",r),$.setAttribute("r",s+5),$.setAttribute("fill","none"),$.setAttribute("stroke","rgba(16, 185, 129, 0.2)"),$.setAttribute("stroke-width",2),$.setAttribute("opacity","0.6"),t.appendChild($);const S=H("circle");S.setAttribute("cx",a),S.setAttribute("cy",r),S.setAttribute("r",s),S.setAttribute("fill","none"),S.setAttribute("stroke",E),S.setAttribute("stroke-width",n),S.setAttribute("stroke-linecap","round"),S.setAttribute("opacity","0.3"),t.appendChild(S);const C=2*Math.PI*s,d=H("circle");d.setAttribute("cx",a),d.setAttribute("cy",r),d.setAttribute("r",s),d.setAttribute("fill","none"),d.setAttribute("stroke",k),d.setAttribute("stroke-width",n),d.setAttribute("stroke-linecap","round"),d.setAttribute("transform",`rotate(-90 ${a} ${r})`),d.setAttribute("stroke-dasharray",`0 ${C}`),d.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))"),d.style.transition="stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(d),requestAnimationFrame(()=>{setTimeout(()=>{d.setAttribute("stroke-dasharray",`${C*y} ${C*(1-y)}`)},100)});const A=Z(a,r-8,"0%","middle","#f8fafc",28,"700");t.appendChild(A);let f=0;const m=Math.round(y*100),c=m/60;function x(){f<m&&(f+=c,A.textContent=Math.round(Math.min(f,m))+"%",requestAnimationFrame(x))}setTimeout(x,200);const u=Z(a,r+25,`${bt(O(e,h))} / ${bt(O(e,g))} SEK`,"middle","#94a3b8",13,"500");t.appendChild(u);const w=y>=1?"#10b981":y>=.8?"#f59e0b":"#ef4444",l=y>=1?"✓ Target Achieved":y>=.8?"⚡ On Track":"⚠ Behind Target",p=Z(a,r+45,l,"middle",w,11,"600");t.appendChild(p)}function bt(e){return Math.round(e).toLocaleString("sv-SE")}function z(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function gt(e,i,t,a="start",r="#cbd5e1",s=12,n="normal"){const o=z("text");return o.setAttribute("x",e),o.setAttribute("y",i),o.setAttribute("text-anchor",a),o.setAttribute("fill",r),o.setAttribute("font-size",s),o.setAttribute("font-weight",n),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function Q(e,i,t,a){const r=e.querySelector("defs")||e.appendChild(z("defs")),s=z("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","100%"),s.setAttribute("y2","100%");const n=z("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",t);const o=z("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",a),s.appendChild(n),s.appendChild(o),r.appendChild(s),`url(#${i})`}function qt(e,i){const t=document.getElementById("fixedVarMini");for(;t.firstChild;)t.removeChild(t.firstChild);const a=380,r=150,s=100,n=20,o=N(e,i);let b=0,h=0;Object.keys(o.aParents).forEach(I=>{e.tags[I]==="F"?b+=o.aParents[I]||0:h+=o.aParents[I]||0});const g=b+h||1,y=2*Math.PI*s,E=y*(b/g),k=y*(h/g),$=Q(t,"fixedGrad","#8b5cf6","#7c3aed"),S=Q(t,"variableGrad","#06b6d4","#0891b2"),C=Q(t,"donutBg","#1e293b","#0f172a"),d=z("circle");d.setAttribute("cx",a),d.setAttribute("cy",r),d.setAttribute("r",s+5),d.setAttribute("fill","none"),d.setAttribute("stroke","rgba(139, 92, 246, 0.2)"),d.setAttribute("stroke-width",2),d.setAttribute("opacity","0.6"),t.appendChild(d);const A=z("circle");A.setAttribute("cx",a),A.setAttribute("cy",r),A.setAttribute("r",s),A.setAttribute("fill","none"),A.setAttribute("stroke",C),A.setAttribute("stroke-width",n),A.setAttribute("opacity","0.3"),t.appendChild(A);const f=z("circle");f.setAttribute("cx",a),f.setAttribute("cy",r),f.setAttribute("r",s),f.setAttribute("fill","none"),f.setAttribute("stroke",$),f.setAttribute("stroke-width",n),f.setAttribute("stroke-linecap","round"),f.setAttribute("transform",`rotate(-90 ${a} ${r})`),f.setAttribute("stroke-dasharray",`0 ${y}`),f.setAttribute("filter","drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"),f.style.transition="stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(f);const m=z("circle");m.setAttribute("cx",a),m.setAttribute("cy",r),m.setAttribute("r",s),m.setAttribute("fill","none"),m.setAttribute("stroke",S),m.setAttribute("stroke-width",n),m.setAttribute("stroke-linecap","round"),m.setAttribute("transform",`rotate(${-90+b/g*360} ${a} ${r})`),m.setAttribute("stroke-dasharray",`0 ${y}`),m.setAttribute("filter","drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"),m.style.transition="stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(m),requestAnimationFrame(()=>{setTimeout(()=>{f.setAttribute("stroke-dasharray",`${E} ${y-E}`)},200),setTimeout(()=>{m.setAttribute("stroke-dasharray",`${k} ${y-k}`)},400)});const c=Math.round(b/g*100),x=Math.round(h/g*100),u=gt(a,r-8,"0% Fixed","middle","#f8fafc",16,"600"),w=gt(a,r+12,"0% Variable","middle","#94a3b8",14,"500");t.appendChild(u),t.appendChild(w);let l=0,p=0;const v=c/50,T=x/50;function M(){(l<c||p<x)&&(l<c&&(l+=v,u.textContent=Math.round(Math.min(l,c))+"% Fixed"),p<x&&(p+=T,w.textContent=Math.round(Math.min(p,x))+"% Variable"),requestAnimationFrame(M))}setTimeout(M,300),f.style.cursor="pointer",m.style.cursor="pointer",f.addEventListener("mouseenter",()=>{f.setAttribute("stroke-width",n+2),f.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),f.addEventListener("mouseleave",()=>{f.setAttribute("stroke-width",n),f.style.filter="drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"}),m.addEventListener("mouseenter",()=>{m.setAttribute("stroke-width",n+2),m.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),m.addEventListener("mouseleave",()=>{m.setAttribute("stroke-width",n),m.style.filter="drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"})}const it=e=>document.createElementNS("http://www.w3.org/2000/svg",e),ft=(e,i,t,a="start",r="#cbd5e1",s=12)=>{const n=it("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",r),n.setAttribute("font-size",s),n.textContent=t,n};function Ut(e,i){const t=document.getElementById("glidepath");for(;t.firstChild;)t.removeChild(t.firstChild);const a=760,r=320,s=60,n=20,o=20,b=50,h=a-s-n,g=r-o-b,y=i.slice(0,4),E=e.order.filter(p=>p.slice(0,4)===y),k=e.order.indexOf(i),$=e.order.filter(p=>p.slice(0,4)===y&&e.order.indexOf(p)<=k),S=$.map(p=>Math.max(0,(e.months[p].income||0)-N(e,p).aTotal)).reduce((p,v)=>p+v,0),C=12-$.length,d=Math.max(0,(e.target||0)-S),A=C>0?d/C:0,f=(e.target||0)/12,m=[];E.forEach(p=>{e.order.indexOf(p)<=k?m.push({m:p,v:Math.max(0,(e.months[p].income||0)-N(e,p).aTotal),t:"a"}):m.push({m:p,v:A,t:"r"})});const c=Math.max(f,...m.map(p=>p.v),1),x=h/E.length*.65;m.forEach((p,v)=>{const T=p.v/c*g,M=s+v*(h/E.length)+(h/E.length-x)/2,I=o+g-T,P=p.t==="a"?p.v>=f?"#10b981":"#ef4444":"#f59e0b",R=it("rect");R.setAttribute("x",M),R.setAttribute("y",I),R.setAttribute("width",x),R.setAttribute("height",T),R.setAttribute("fill",P),t.appendChild(R),t.appendChild(ft(M+x/2,r-16,p.m.slice(5),"middle","#9aa3b2",12))});const u=o+g-f/c*g,w=it("line");w.setAttribute("x1",s),w.setAttribute("x2",s+h),w.setAttribute("y1",u),w.setAttribute("y2",u),w.setAttribute("stroke","#93c5fd"),w.setAttribute("stroke-dasharray","5,5"),t.appendChild(w),t.appendChild(ft(s+h-6,u-6,"Monthly target "+vt(O(e,f)),"end","#cfe4ff",12));const l=document.getElementById("glidePill");l&&(d<=0?(l.textContent="On track ✔",l.classList.add("ok")):(l.textContent="From now: need "+vt(O(e,A))+" SEK / month",l.classList.remove("ok")))}function vt(e){return Math.round(e).toLocaleString("sv-SE")}const st=e=>document.createElementNS("http://www.w3.org/2000/svg",e),yt=(e,i,t,a="start",r="#cbd5e1",s=12)=>{const n=st("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",r),n.setAttribute("font-size",s),n.textContent=t,n};function Jt(e,i){const t=document.getElementById("barSummary");for(;t.firstChild;)t.removeChild(t.firstChild);const a=760,r=320,s=110,n=20,o=20,b=40,h=a-s-n,g=r-o-b,y=N(e,i),E=e.months[i].income||0,k=[{lab:"Income",val:E,c:"#60a5fa"},{lab:"Budget",val:y.bTotal,c:"#3b82f6"},{lab:"Actual",val:y.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,E-y.aTotal),c:"#34d399"}],$=Math.max(...k.map(d=>d.val),1),S=g/k.length*.55;k.forEach((d,A)=>{const f=o+A*(g/k.length)+(g/k.length-S)/2,m=d.val/$*h,c=st("rect");c.setAttribute("x",s),c.setAttribute("y",f),c.setAttribute("width",m),c.setAttribute("height",S),c.setAttribute("fill",d.c),t.appendChild(c),t.appendChild(yt(s-10,f+S/2+4,d.lab,"end","#cbd5e1",12)),t.appendChild(yt(s+m+6,f+S/2+4,Wt(O(e,d.val)),"start","#cbd5e1",12))});const C=st("line");C.setAttribute("x1",s),C.setAttribute("x2",s),C.setAttribute("y1",o),C.setAttribute("y2",o+g),C.setAttribute("stroke","#243049"),t.appendChild(C)}function Wt(e){return Math.round(e).toLocaleString("sv-SE")}const rt=e=>document.createElementNS("http://www.w3.org/2000/svg",e),xt=(e,i,t,a="start",r="#cbd5e1",s=12)=>{const n=rt("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",r),n.setAttribute("font-size",s),n.textContent=t,n};function _t(e,i){const t=document.getElementById("shareBars");for(;t.firstChild;)t.removeChild(t.firstChild);const a=1200,r=700,s=280,n=40,o=30,b=60,h=a-s-n,g=r-o-b,y=N(e,i),E=Object.keys(L).map(d=>({p:d,v:y.aParents[d]||0})).sort((d,A)=>A.v-d.v),k=E.reduce((d,A)=>d+A.v,0)||1,$=E.length,S=g/$*.75;E.forEach((d,A)=>{const f=o+A*(g/$)+(g/$-S)/2,m=d.v/k*h,c=rt("rect");c.setAttribute("x",s),c.setAttribute("y",f),c.setAttribute("width",m),c.setAttribute("height",S),c.setAttribute("fill","#3b82f6"),t.appendChild(c);const x=(e.icons[d.p]||"")+" "+d.p;t.appendChild(xt(s-16,f+S/2+6,x,"end","#cbd5e1",15)),t.appendChild(xt(s+m+12,f+S/2+6,(d.v/k*100).toFixed(1)+"%  ·  "+Xt(O(e,d.v))+" SEK","start","#cbd5e1",14))});const C=rt("line");C.setAttribute("x1",s),C.setAttribute("x2",s),C.setAttribute("y1",o),C.setAttribute("y2",o+g),C.setAttribute("stroke","#243049"),t.appendChild(C)}function Xt(e){return Math.round(e).toLocaleString("sv-SE")}const U=e=>document.createElementNS("http://www.w3.org/2000/svg",e),At=(e,i,t,a="start",r="#cbd5e1",s=12)=>{const n=U("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",r),n.setAttribute("font-size",s),n.textContent=t,n};function Zt(e,i){const t=document.getElementById("baParents");for(;t.firstChild;)t.removeChild(t.firstChild);const a=1200,r=460,s=260,n=40,o=20,b=60,h=a-s-n,g=r-o-b,y=N(e,i),E=Object.keys(L).map(A=>({p:A,b:y.bParents[A]||0,a:y.aParents[A]||0})).sort((A,f)=>f.a-A.a),k=E.length,$=g/k,S=$*.35,C=Math.max(...E.map(A=>Math.max(A.a,A.b)),1);E.forEach((A,f)=>{const m=o+f*$+$/2,c=A.b/C*h,x=A.a/C*h,u=U("rect");u.setAttribute("x",s),u.setAttribute("y",m-S-3),u.setAttribute("width",c),u.setAttribute("height",S),u.setAttribute("fill","#3b82f6"),t.appendChild(u);const w=U("rect");w.setAttribute("x",s),w.setAttribute("y",m+3),w.setAttribute("width",x),w.setAttribute("height",S),w.setAttribute("fill","#10b981"),t.appendChild(w);const l=(e.icons[A.p]||"")+" "+A.p;t.appendChild(At(s-14,m+4,l,"end","#cbd5e1",14)),t.appendChild(At(s+Math.max(c,x)+10,m+4,"B "+wt(O(e,A.b))+"  A "+wt(O(e,A.a)),"start","#cbd5e1",12))});const d=U("line");d.setAttribute("x1",s),d.setAttribute("x2",s),d.setAttribute("y1",o),d.setAttribute("y2",o+g),d.setAttribute("stroke","#243049"),t.appendChild(d)}function wt(e){return Math.round(e).toLocaleString("sv-SE")}const Lt=e=>document.createElementNS("http://www.w3.org/2000/svg",e),Et=(e,i,t,a="start",r="#cbd5e1",s=12)=>{const n=Lt("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",r),n.setAttribute("font-size",s),n.textContent=t,n};function Qt(e,i){const t=document.getElementById("heatmapVar");for(;t.firstChild;)t.removeChild(t.firstChild);const a=1200,r=440,s=260,n=40,o=20,b=40,h=a-s-n,g=r-o-b,y=i.slice(0,4),E=e.order.filter(x=>x.slice(0,4)===y),k=Object.keys(L),$=E.length,S=[],C=[];k.forEach(x=>{const u=[];E.forEach(w=>{const l=N(e,w),p=l.bParents[x]||0,v=l.aParents[x]||0,T=p?(v-p)/p:0;u.push({p:x,b:p,a:v,v:T,m:w}),C.push(T)}),S.push(u)});const d=Math.min(...C,0),A=Math.max(...C,0),f=h/$,m=g/k.length;function c(x){const u=x<=0?150:0,l=30+30*Math.min(1,Math.abs(x)/(x<=0?-d:A)||0);return`hsl(${u},70%,${l}%)`}S.forEach((x,u)=>{x.forEach((l,p)=>{const v=Lt("rect");v.setAttribute("x",s+p*f),v.setAttribute("y",o+u*m),v.setAttribute("width",f-2),v.setAttribute("height",m-2),v.setAttribute("fill",c(l.v)),v.addEventListener("mouseenter",T=>{const M=document.getElementById("tooltip"),I=l.a-l.b,P=I>=0?"+":"";M.innerHTML=`<div><b>${l.p}</b> · <span class='t'>${l.m}</span></div>
                        <div>Budget: <b>${tt(O(e,l.b))}</b> SEK</div>
                        <div>Actual: <b>${tt(O(e,l.a))}</b> SEK</div>
                        <div>Variance: <b>${P+tt(O(e,I))}</b> (${l.b?(I/l.b*100).toFixed(1):"0.0"}%)</div>`,M.style.left=T.clientX+12+"px",M.style.top=T.clientY+12+"px",M.style.display="block"}),v.addEventListener("mousemove",T=>{const M=document.getElementById("tooltip");M.style.left=T.clientX+12+"px",M.style.top=T.clientY+12+"px"}),v.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),t.appendChild(v)});const w=(e.icons[k[u]]||"")+" "+k[u];t.appendChild(Et(s-14,o+u*m+m/2+4,w,"end","#cbd5e1",14))}),E.forEach((x,u)=>t.appendChild(Et(s+u*f+f/2,r-12,x.slice(5),"middle","#9aa3b2",12)))}function tt(e){return Math.round(e).toLocaleString("sv-SE")}const V=e=>document.createElementNS("http://www.w3.org/2000/svg",e),j=(e,i,t,a="start",r="#cbd5e1",s=12)=>{const n=V("text");return n.setAttribute("x",e),n.setAttribute("y",i),n.setAttribute("text-anchor",a),n.setAttribute("fill",r),n.setAttribute("font-size",s),n.textContent=t,n};function te(e,i){const t=document.getElementById("bridge");for(;t.firstChild;)t.removeChild(t.firstChild);const a=zt(e,i);if(!a){t.appendChild(j(600,210,"No previous month to compare.","middle","#9aa3b2",14));return}const r=1200,s=420,n=80,o=40,b=30,h=60,g=r-n-o,y=s-b-h,E=N(e,i),k=N(e,a),$=k.aTotal,S=E.aTotal,C=Object.keys(L).map(v=>({p:v,icon:e.icons[v]||"",delta:(E.aParents[v]||0)-(k.aParents[v]||0)})).sort((v,T)=>Math.abs(T.delta)-Math.abs(v.delta)),d=C.slice(0,Math.min(10,C.length)),A=C.slice(d.length).reduce((v,T)=>v+T.delta,0);Math.abs(A)>.5&&d.push({p:"Others",icon:"",delta:A});const f=g/(d.length+3),m=b+y;let c=n+f;function x(v){const T=Math.max($,S,Math.max(...d.map(M=>Math.abs(M.delta)))+Math.max($,S));return b+y-v/T*y}const u=V("rect");u.setAttribute("x",c-24),u.setAttribute("y",x($)),u.setAttribute("width",48),u.setAttribute("height",m-x($)),u.setAttribute("fill","#64748b"),t.appendChild(u),t.appendChild(j(c,s-18,"Start","middle","#9aa3b2",12)),t.appendChild(j(c,x($)-6,et(O(e,$)),"middle","#cbd5e1",12));let w=$;c+=f,d.forEach(v=>{const T=v.delta,M=T>=0,I=x(w),P=x(w+T),R=Math.min(I,P),Ot=Math.abs(P-I),G=V("rect");G.setAttribute("x",c-24),G.setAttribute("y",R),G.setAttribute("width",48),G.setAttribute("height",Ot),G.setAttribute("fill",M?"#ef4444":"#10b981"),t.appendChild(G);const X=(v.icon?v.icon+" ":"")+v.p;t.appendChild(j(c,s-18,X.length>14?X.slice(0,14)+"…":X,"middle","#9aa3b2",12));const Pt=(M?"+":"")+et(O(e,T));t.appendChild(j(c,R-6,Pt,"middle","#cbd5e1",12)),w+=T,c+=f});const l=V("rect");l.setAttribute("x",c-24),l.setAttribute("y",x(S)),l.setAttribute("width",48),l.setAttribute("height",m-x(S)),l.setAttribute("fill","#64748b"),t.appendChild(l),t.appendChild(j(c,s-18,"End","middle","#9aa3b2",12)),t.appendChild(j(c,x(S)-6,et(O(e,S)),"middle","#cbd5e1",12));const p=V("line");p.setAttribute("x1",n*.6),p.setAttribute("x2",r-o),p.setAttribute("y1",m),p.setAttribute("y2",m),p.setAttribute("stroke","#243049"),t.appendChild(p)}function et(e){return Math.round(e).toLocaleString("sv-SE")}function F(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function D(e,i,t,a="start",r="#cbd5e1",s=12,n="normal"){const o=F("text");return o.setAttribute("x",e),o.setAttribute("y",i),o.setAttribute("text-anchor",a),o.setAttribute("fill",r),o.setAttribute("font-size",s),o.setAttribute("font-weight",n),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function Ct(e,i,t,a){const r=e.querySelector("defs")||e.appendChild(F("defs")),s=F("linearGradient");s.setAttribute("id",i),s.setAttribute("x1","0%"),s.setAttribute("y1","0%"),s.setAttribute("x2","0%"),s.setAttribute("y2","100%");const n=F("stop");n.setAttribute("offset","0%"),n.setAttribute("stop-color",t);const o=F("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",a),s.appendChild(n),s.appendChild(o),r.appendChild(s),`url(#${i})`}function ee(e,i){const t=document.getElementById("spendingTrends");if(!t)return;for(;t.firstChild;)t.removeChild(t.firstChild);const a=1200,r=400,s={top:40,right:60,bottom:60,left:80},n=a-s.left-s.right,o=r-s.top-s.bottom,b=i.slice(0,4),h=parseInt(i.slice(5,7)),g=[];for(let u=11;u>=0;u--){let w=h-u,l=parseInt(b);w<=0&&(w+=12,l-=1);const p=`${l}-${w.toString().padStart(2,"0")}`;e.months[p]&&g.push({key:p,label:p.slice(5,7),data:N(e,p)})}if(g.length===0)return;const y=Math.max(...g.map(u=>u.data.aTotal)),E=n/(g.length-1),k=o/y,$=Ct(t,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),S=Ct(t,"trendLine","#3b82f6","#1d4ed8"),C=F("rect");C.setAttribute("x",s.left),C.setAttribute("y",s.top),C.setAttribute("width",n),C.setAttribute("height",o),C.setAttribute("fill","rgba(15, 23, 42, 0.5)"),C.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),C.setAttribute("rx",8),t.appendChild(C);for(let u=0;u<=5;u++){const w=s.top+o/5*u,l=F("line");l.setAttribute("x1",s.left),l.setAttribute("y1",w),l.setAttribute("x2",s.left+n),l.setAttribute("y2",w),l.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),l.setAttribute("stroke-width",1),l.setAttribute("stroke-dasharray","2,2"),t.appendChild(l);const p=y-y/5*u,v=D(s.left-10,w+4,q(p),"end","#94a3b8",10);t.appendChild(v)}let d=`M ${s.left} ${s.top+o}`,A="M";g.forEach((u,w)=>{const l=s.left+w*E,p=s.top+o-u.data.aTotal*k;w===0?(A+=` ${l} ${p}`,d+=` L ${l} ${p}`):(A+=` L ${l} ${p}`,d+=` L ${l} ${p}`)}),d+=` L ${s.left+(g.length-1)*E} ${s.top+o} Z`;const f=F("path");f.setAttribute("d",d),f.setAttribute("fill",$),f.setAttribute("opacity","0"),t.appendChild(f);const m=F("path");m.setAttribute("d",A),m.setAttribute("fill","none"),m.setAttribute("stroke",S),m.setAttribute("stroke-width",3),m.setAttribute("stroke-linecap","round"),m.setAttribute("stroke-linejoin","round"),m.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),m.style.strokeDasharray=m.getTotalLength(),m.style.strokeDashoffset=m.getTotalLength(),t.appendChild(m),g.forEach((u,w)=>{const l=s.left+w*E,p=s.top+o-u.data.aTotal*k,v=F("circle");v.setAttribute("cx",l),v.setAttribute("cy",p),v.setAttribute("r",6),v.setAttribute("fill","rgba(15, 23, 42, 0.9)"),v.setAttribute("stroke","#3b82f6"),v.setAttribute("stroke-width",2),v.setAttribute("opacity","0"),t.appendChild(v);const T=F("circle");T.setAttribute("cx",l),T.setAttribute("cy",p),T.setAttribute("r",4),T.setAttribute("fill","#3b82f6"),T.setAttribute("opacity","0"),T.style.cursor="pointer",t.appendChild(T);const M=D(l,s.top+o+20,u.label,"middle","#94a3b8",10);t.appendChild(M),T.addEventListener("mouseenter",()=>{T.setAttribute("r",6),T.setAttribute("fill","#1d4ed8"),v.setAttribute("opacity","1");const I=document.getElementById("tooltip");I&&(I.style.display="block",I.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${u.label}</div>
          <div>Total Spending: ${q(u.data.aTotal)} SEK</div>
          <div>Budget: ${q(u.data.bTotal)} SEK</div>
          <div>Variance: ${q(u.data.aTotal-u.data.bTotal)} SEK</div>
        `)}),T.addEventListener("mouseleave",()=>{T.setAttribute("r",4),T.setAttribute("fill","#3b82f6"),v.setAttribute("opacity","0");const I=document.getElementById("tooltip");I&&(I.style.display="none")}),T.addEventListener("mousemove",I=>{const P=document.getElementById("tooltip");P&&(P.style.left=I.pageX+10+"px",P.style.top=I.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{f.style.transition="opacity 1s ease-out",f.setAttribute("opacity","1")},200),setTimeout(()=>{m.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",m.style.strokeDashoffset="0"},400),setTimeout(()=>{g.forEach((u,w)=>{setTimeout(()=>{const l=t.querySelectorAll("circle"),p=w*2+2;l[p]&&(l[p].style.transition="opacity 0.3s ease-out",l[p].setAttribute("opacity","1")),l[p+1]&&(l[p+1].style.transition="opacity 0.3s ease-out",l[p+1].setAttribute("opacity","1"))},w*100)})},1e3)});const c=D(a/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");t.appendChild(c);const x=D(20,r/2,"Spending (SEK)","middle","#94a3b8",12,"500");x.setAttribute("transform",`rotate(-90, 20, ${r/2})`),t.appendChild(x)}function q(e){return Math.round(e).toLocaleString("sv-SE")}let B=Nt();const ne=document.getElementById("app");ne.innerHTML=`
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
`;jt(B,_);Bt(B,J());Yt();ot();It(B,J());W(B,_);window.state=B;window.drawAll=ot;window.monthTotals=e=>N(B,e);function J(){return B.order[B.order.length-1]}function _(){at(B),Bt(B,J()),ot(),It(B,J()),W(B,_)}function Bt(e,i){const t=document.getElementById("kpiStrip");t.innerHTML="";const a=N(e,i),r=e.months[i].income||0,s=O(e,r-a.aTotal),n=r>0?(r-a.aTotal)/r:0,o=a.bTotal>0?a.aTotal/a.bTotal:0,h=e.order.filter(y=>y.slice(0,4)===i.slice(0,4)&&y<=i).map(y=>(e.months[y].income||0)-N(e,y).aTotal).reduce((y,E)=>y+E,0);[{lab:"Monthly Savings (real SEK)",val:St(s)},{lab:"Savings Rate",val:(n*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(o*100).toFixed(0)+" %"},{lab:"YTD Savings",val:St(O(e,h))+" SEK"}].forEach(y=>{const E=document.createElement("div");E.className="kpi",E.innerHTML=`<div class="lab">${y.lab}</div><div class="val">${y.val}</div>`,t.appendChild(E)})}function ot(){const e=document.getElementById("monthSel").value;Dt(B,e),qt(B,e),Ut(B,e),Jt(B,e),ee(B,e),_t(B,e),Zt(B,e),Qt(B,e),te(B,e),W(B,_)}function St(e){return Math.round(e).toLocaleString("sv-SE")}
