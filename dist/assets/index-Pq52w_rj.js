(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();const st={Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡",Health:"🏥",Investments:"💼",Lifestyle:"🎉"},rt={Housing:"F",Insurance:"F",Investments:"F",Kids:"V",Transport:"V","Groceries & Dining":"V",Health:"V",Lifestyle:"V"},P={Housing:{"Mortgage/Fee":22e3,"Home Insurance":400,Utilities:1200,"Internet/Phone":600},Kids:{Daycare:3500,"Diapers/Baby":800,Clothes:600,Activities:800},Transport:{Fuel:800,Parking:1600,Maintenance:500,Transit:600},"Groceries & Dining":{Groceries:8e3,"Dining Out":2500},Insurance:{"Car Insurance":350,"Life Insurance":300},Health:{Healthcare:600,Dental:200,Meds:200},Investments:{"Index/ETF":4e3,"Pension/ISK":2500,"Education Fund":800},Lifestyle:{"Subscriptions/Streaming":400,Entertainment:600,Travel:2e3,Gifts:400,Misc:1e3}};function at(e){const i=[];for(let t=1;t<=12;t++)i.push(`${e}-${String(t).padStart(2,"0")}`);return i}function Z(e,i){if(e.months[i])Object.keys(P).forEach(t=>{e.months[i].budget[t]||(e.months[i].budget[t]={},e.months[i].actual[t]={}),Object.keys(P[t]).forEach(r=>{e.months[i].budget[t][r]===void 0&&(e.months[i].budget[t][r]=P[t][r]),e.months[i].actual[t][r]===void 0&&(e.months[i].actual[t][r]=P[t][r])})}),e.months[i].income===void 0&&(e.months[i].income=e.defaultIncome||0);else{let t={},r={};Object.keys(P).forEach(a=>{t[a]={},r[a]={},Object.keys(P[a]).forEach(n=>{t[a][n]=P[a][n],r[a][n]=P[a][n]})}),e.months[i]={income:e.defaultIncome||0,budget:t,actual:r}}}const At="rohmee_budget_live",xt=2,wt=108e3;function It(){let e=localStorage.getItem(At);if(e)try{const t=JSON.parse(e);return t.version=t.version||0,St(t),(!t.order||!t.order.length)&&(t.order=at(2025)),t.order.forEach(r=>Z(t,r)),t.icons=t.icons||st,t.tags=t.tags||rt,t}catch{}const i={defaultIncome:wt,target:25e4,cpi:1,order:at(2025),months:{},icons:st,tags:rt,selected:null,version:xt};return i.order.forEach(t=>Z(i,t)),["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07"].forEach(t=>{const r=i.months[t];Object.keys(r.actual).forEach(a=>Object.keys(r.actual[a]).forEach(n=>{const s=r.budget[a][n],o=Math.random()*.2-.05;r.actual[a][n]=Math.max(0,Math.round(s*(1+o)))}))}),nt(i),i}function nt(e){localStorage.setItem(At,JSON.stringify(e))}function Lt(e){const i=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),t=document.createElement("a");t.href=URL.createObjectURL(i),t.download="rohmee_budget.json",t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}function kt(e,i){const t=new FileReader;t.onload=()=>{try{const r=JSON.parse(t.result);St(r),nt(r),i(r)}catch{alert("Invalid JSON file")}},t.readAsText(e)}function St(e){e.version<2&&(e.defaultIncome=e.income||wt,delete e.income,e.order&&e.order.forEach(i=>{const t=e.months[i];t&&t.income===void 0&&(t.income=e.defaultIncome)})),e.version=xt}function O(e,i){Z(e,i);const t=e.months[i],r=ot(t.budget),a=ot(t.actual);let n=0,s=0;return Object.keys(r).forEach(o=>{n+=r[o],s+=a[o]||0}),{bParents:r,aParents:a,bTotal:n,aTotal:s}}function Bt(e,i){const t=e.order.indexOf(i);return t>0?e.order[t-1]:null}function B(e,i){return i/(e.cpi||1)}function Ot(e){let i=0;return Object.keys(e).forEach(t=>i+=+e[t]||0),i}function ot(e){let i={};return Object.keys(e).forEach(t=>i[t]=Ot(e[t])),i}function Pt(e,i){const t=document.getElementById("controls"),r=e.order[e.order.length-1];t.innerHTML=`
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
  `;const a=t.querySelector("#monthSel");e.order.forEach(s=>{const o=document.createElement("option");o.value=s,o.textContent=s,a.appendChild(o)}),a.value=r;const n=t.querySelector("#netIncome");a.addEventListener("change",s=>{n.value=e.months[a.value].income||0,i()}),n.addEventListener("input",s=>{e.months[a.value].income=+s.target.value||0,i()}),t.querySelector("#savTarget").addEventListener("input",s=>{e.target=+s.target.value||0,i()}),t.querySelector("#cpiFactor").addEventListener("input",s=>{e.cpi=+s.target.value||1,i()}),t.querySelector("#saveJSON").addEventListener("click",()=>Lt(e)),t.querySelector("#loadJsonInput").addEventListener("change",s=>{const o=s.target.files[0];o&&kt(o,b=>{Object.assign(e,b),i()})}),t.querySelector("#exportCSV").addEventListener("click",()=>{const s=[["Month","Parent","Sub","Budget","Actual"]];e.order.forEach(f=>{const g=e.months[f];Object.keys(g.budget).forEach(v=>Object.keys(g.budget[v]).forEach(E=>{s.push([f,v,E,g.budget[v][E],g.actual[v][E]])}))});const o=s.map(f=>f.map(g=>`"${String(g).replace('"','""')}"`).join(",")).join(`
`),b=document.createElement("a");b.href=URL.createObjectURL(new Blob([o],{type:"text/csv"})),b.download="budget.csv",b.click(),setTimeout(()=>URL.revokeObjectURL(b.href),1e3)})}class Ft{constructor(i){this.state=i}generateInsights(i){const t=[],r=this.getRecentMonths(i,6);if(r.length<3)return t;const a=this.analyzeTrend(r);a&&t.push(a);const n=this.analyzeBudgetVariance(r);n&&t.push(n);const s=this.analyzeCategorySpending(r);t.push(...s);const o=this.analyzeSavingsRate(r);o&&t.push(o);const b=this.analyzeSeasonalPatterns(i);return b&&t.push(b),t.slice(0,8)}getRecentMonths(i,t){const r=parseInt(i.slice(0,4)),a=parseInt(i.slice(5,7)),n=[];for(let s=0;s<t;s++){let o=a-s,b=r;o<=0&&(o+=12,b-=1);const f=`${b}-${o.toString().padStart(2,"0")}`;this.state.months[f]&&n.unshift({key:f,data:O(this.state,f),income:this.state.months[f].income||0})}return n}analyzeTrend(i){if(i.length<3)return null;const t=this.calculateTrend(i.map(a=>a.data.aTotal)),r=i.reduce((a,n)=>a+n.data.aTotal,0)/i.length;if(Math.abs(t)<r*.02)return{type:"neutral",category:"trend",title:"Stable Spending Pattern",message:"Your spending has been consistent over the past few months.",impact:"low",icon:"📊"};if(t>0){const a=t/r*100;return{type:"warning",category:"trend",title:"Increasing Spending Trend",message:`Your spending has increased by ${a.toFixed(1)}% on average per month. Consider reviewing your budget.`,impact:a>5?"high":"medium",icon:"📈",recommendation:"Review recent expenses and identify areas where you can cut back."}}else return{type:"positive",category:"trend",title:"Decreasing Spending Trend",message:`Great job! Your spending has decreased by ${Math.abs(t/r*100).toFixed(1)}% on average per month.`,impact:"positive",icon:"📉",recommendation:"Keep up the good work! Consider allocating the savings to your emergency fund or investments."}}analyzeBudgetVariance(i){const t=i[i.length-1],r=t.data.aTotal-t.data.bTotal,a=r/t.data.bTotal*100;return Math.abs(a)<5?{type:"positive",category:"budget",title:"On-Track Budget Performance",message:`You're within ${Math.abs(a).toFixed(1)}% of your budget this month.`,impact:"positive",icon:"🎯"}:r>0?{type:"warning",category:"budget",title:"Over Budget",message:`You've exceeded your budget by ${this.fmt(r)} SEK (${a.toFixed(1)}%).`,impact:a>15?"high":"medium",icon:"⚠️",recommendation:"Review your largest expense categories and look for areas to reduce spending."}:{type:"positive",category:"budget",title:"Under Budget",message:`You're under budget by ${this.fmt(Math.abs(r))} SEK (${Math.abs(a).toFixed(1)}%).`,impact:"positive",icon:"💰",recommendation:"Consider moving this surplus to savings or investments."}}analyzeCategorySpending(i){const t=[],r=i[i.length-1];if(i.length>=2){const a=i[i.length-2];Object.keys(r.data.aParents).forEach(n=>{const s=r.data.aParents[n]||0,o=a.data.aParents[n]||0;if(o>0){const b=(s-o)/o*100;if(Math.abs(b)>20&&Math.abs(s-o)>1e3){const f=this.getCategoryIcon(n);b>0?t.push({type:"warning",category:"spending",title:`${n} Spending Increased`,message:`${n} spending increased by ${b.toFixed(1)}% (${this.fmt(s-o)} SEK).`,impact:b>50?"high":"medium",icon:f,recommendation:`Review your ${n.toLowerCase()} expenses and look for ways to optimize.`}):t.push({type:"positive",category:"spending",title:`${n} Spending Decreased`,message:`Great! ${n} spending decreased by ${Math.abs(b).toFixed(1)}% (${this.fmt(Math.abs(s-o))} SEK).`,impact:"positive",icon:f})}}})}return t.slice(0,3)}analyzeSavingsRate(i){const t=i[i.length-1],r=t.income>0?(t.income-t.data.aTotal)/t.income*100:0;return r<10?{type:"warning",category:"savings",title:"Low Savings Rate",message:`Your current savings rate is ${r.toFixed(1)}%. Financial experts recommend saving at least 20%.`,impact:"high",icon:"💸",recommendation:"Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings."}:r>=20?{type:"positive",category:"savings",title:"Excellent Savings Rate",message:`Outstanding! Your savings rate of ${r.toFixed(1)}% exceeds the recommended 20%.`,impact:"positive",icon:"🌟"}:{type:"neutral",category:"savings",title:"Good Savings Rate",message:`Your savings rate of ${r.toFixed(1)}% is on track. Consider aiming for 20% or higher.`,impact:"medium",icon:"💪",recommendation:"Look for small areas to cut expenses and boost your savings rate."}}analyzeSeasonalPatterns(i){const t=parseInt(i.slice(5,7));return t===11||t===12?{type:"info",category:"seasonal",title:"Holiday Season Alert",message:"Holiday spending typically increases in November and December.",impact:"medium",icon:"🎄",recommendation:"Set a holiday budget and track gift expenses to avoid overspending."}:t>=6&&t<=8?{type:"info",category:"seasonal",title:"Summer Season",message:"Summer months often see increased travel and entertainment expenses.",impact:"medium",icon:"☀️",recommendation:"Budget for vacation and summer activities to maintain your savings goals."}:null}calculateTrend(i){const t=i.length,r=t*(t-1)/2,a=i.reduce((o,b)=>o+b,0),n=i.reduce((o,b,f)=>o+f*b,0),s=i.reduce((o,b,f)=>o+f*f,0);return(t*n-r*a)/(t*s-r*r)}getCategoryIcon(i){return{Housing:"🏠",Kids:"🧒",Transport:"🚗","Groceries & Dining":"🛒",Insurance:"🛡️",Health:"🏥",Investments:"💼",Lifestyle:"🎉"}[i]||"📊"}fmt(i){return Math.round(i).toLocaleString("sv-SE")}generateRecommendations(i){const t=[],r=this.getRecentMonths(i,3);if(r.length===0)return t;const a=r[r.length-1],o=r.reduce((f,g)=>f+g.data.aTotal,0)/r.length*6;if(t.push({type:"goal",title:"Emergency Fund Target",message:`Build an emergency fund of ${this.fmt(o)} SEK (6 months of expenses).`,priority:"high",icon:"🛡️"}),(a.income>0?(a.income-a.data.aTotal)/a.income*100:0)>15){const f=(a.income-a.data.aTotal)*.7;t.push({type:"investment",title:"Investment Opportunity",message:`Consider investing ${this.fmt(f)} SEK monthly in index funds or ETFs.`,priority:"medium",icon:"📈"})}return t}}function Et(e,i){const t=document.getElementById("insightsPanel");if(!t)return;const r=new Ft(e),a=r.generateInsights(i),n=r.generateRecommendations(i);if(t.innerHTML="",a.length>0){const s=document.createElement("div");s.className="insights-section",s.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">🧠</span>
        Smart Insights
      </h3>
      <div class="insights-grid" id="insightsGrid"></div>
    `,t.appendChild(s);const o=document.getElementById("insightsGrid");a.forEach((b,f)=>{const g=Rt(b);o.appendChild(g)})}if(n.length>0){const s=document.createElement("div");s.className="insights-section",s.innerHTML=`
      <h3 class="insights-title">
        <span class="insights-icon">💡</span>
        Recommendations
      </h3>
      <div class="recommendations-list" id="recommendationsList"></div>
    `,t.appendChild(s);const o=document.getElementById("recommendationsList");n.forEach((b,f)=>{const g=zt(b);o.appendChild(g)})}requestAnimationFrame(()=>{t.querySelectorAll(".insight-card, .recommendation-card").forEach((o,b)=>{setTimeout(()=>{o.style.opacity="1",o.style.transform="translateY(0)"},b*100)})})}function Rt(e,i){const t=document.createElement("div");t.className=`insight-card insight-${e.type} insight-${e.impact}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const a={high:{text:"High Impact",color:"var(--accent-danger)"},medium:{text:"Medium Impact",color:"var(--accent-warning)"},low:{text:"Low Impact",color:"var(--text-muted)"},positive:{text:"Positive",color:"var(--accent-success)"}}[e.impact]||{text:"",color:"var(--text-muted)"};return t.innerHTML=`
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
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateY(-4px)",t.style.boxShadow="0 12px 24px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.2)"}),t.addEventListener("mouseleave",()=>{t.style.transform="translateY(0)",t.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"}),t}function zt(e,i){const t=document.createElement("div");t.className=`recommendation-card recommendation-${e.priority}`,t.style.opacity="0",t.style.transform="translateY(20px)",t.style.transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";const r={high:"var(--accent-danger)",medium:"var(--accent-warning)",low:"var(--accent-secondary)"};return t.innerHTML=`
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
  `,t.addEventListener("mouseenter",()=>{t.style.transform="translateX(8px)",t.style.borderLeftColor=r[e.priority]}),t.addEventListener("mouseleave",()=>{t.style.transform="translateX(0)",t.style.borderLeftColor="var(--panel-border)"}),t}function Ht(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function N(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function J(e,i,t,r="start",a="#cbd5e1",n=12,s="normal"){const o=N("text");return o.setAttribute("x",e),o.setAttribute("y",i),o.setAttribute("text-anchor",r),o.setAttribute("fill",a),o.setAttribute("font-size",n),o.setAttribute("font-weight",s),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function ct(e,i,t,r){const a=e.querySelector("defs")||e.appendChild(N("defs")),n=N("linearGradient");n.setAttribute("id",i),n.setAttribute("x1","0%"),n.setAttribute("y1","0%"),n.setAttribute("x2","100%"),n.setAttribute("y2","100%");const s=N("stop");s.setAttribute("offset","0%"),s.setAttribute("stop-color",t);const o=N("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",r),n.appendChild(s),n.appendChild(o),a.appendChild(n),`url(#${i})`}function Nt(e,i){const t=document.getElementById("ytdGauge");for(;t.firstChild;)t.removeChild(t.firstChild);const r=380,a=150,n=100,s=20,o=i.slice(0,4),f=e.order.filter(m=>m.slice(0,4)===o&&m<=i).map(m=>Math.max(0,(e.months[m].income||0)-O(e,m).aTotal)).reduce((m,C)=>m+C,0),g=e.target||0,v=g>0?Math.min(1,f/g):0,E=ct(t,"gaugeBg","#1e293b","#0f172a"),M=ct(t,"gaugeProgress","#10b981","#059669"),T=N("circle");T.setAttribute("cx",r),T.setAttribute("cy",a),T.setAttribute("r",n+5),T.setAttribute("fill","none"),T.setAttribute("stroke","rgba(16, 185, 129, 0.2)"),T.setAttribute("stroke-width",2),T.setAttribute("opacity","0.6"),t.appendChild(T);const $=N("circle");$.setAttribute("cx",r),$.setAttribute("cy",a),$.setAttribute("r",n),$.setAttribute("fill","none"),$.setAttribute("stroke",E),$.setAttribute("stroke-width",s),$.setAttribute("stroke-linecap","round"),$.setAttribute("opacity","0.3"),t.appendChild($);const x=2*Math.PI*n,c=N("circle");c.setAttribute("cx",r),c.setAttribute("cy",a),c.setAttribute("r",n),c.setAttribute("fill","none"),c.setAttribute("stroke",M),c.setAttribute("stroke-width",s),c.setAttribute("stroke-linecap","round"),c.setAttribute("transform",`rotate(-90 ${r} ${a})`),c.setAttribute("stroke-dasharray",`0 ${x}`),c.setAttribute("filter","drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))"),c.style.transition="stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.setAttribute("stroke-dasharray",`${x*v} ${x*(1-v)}`)},100)});const y=J(r,a-8,"0%","middle","#f8fafc",28,"700");t.appendChild(y);let p=0;const d=Math.round(v*100),w=d/60;function S(){p<d&&(p+=w,y.textContent=Math.round(Math.min(p,d))+"%",requestAnimationFrame(S))}setTimeout(S,200);const h=J(r,a+25,`${dt(B(e,f))} / ${dt(B(e,g))} SEK`,"middle","#94a3b8",13,"500");t.appendChild(h);const A=v>=1?"#10b981":v>=.8?"#f59e0b":"#ef4444",u=v>=1?"✓ Target Achieved":v>=.8?"⚡ On Track":"⚠ Behind Target",l=J(r,a+45,u,"middle",A,11,"600");t.appendChild(l)}function dt(e){return Math.round(e).toLocaleString("sv-SE")}function H(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function lt(e,i,t,r="start",a="#cbd5e1",n=12,s="normal"){const o=H("text");return o.setAttribute("x",e),o.setAttribute("y",i),o.setAttribute("text-anchor",r),o.setAttribute("fill",a),o.setAttribute("font-size",n),o.setAttribute("font-weight",s),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function W(e,i,t,r){const a=e.querySelector("defs")||e.appendChild(H("defs")),n=H("linearGradient");n.setAttribute("id",i),n.setAttribute("x1","0%"),n.setAttribute("y1","0%"),n.setAttribute("x2","100%"),n.setAttribute("y2","100%");const s=H("stop");s.setAttribute("offset","0%"),s.setAttribute("stop-color",t);const o=H("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",r),n.appendChild(s),n.appendChild(o),a.appendChild(n),`url(#${i})`}function Gt(e,i){const t=document.getElementById("fixedVarMini");for(;t.firstChild;)t.removeChild(t.firstChild);const r=380,a=150,n=100,s=20,o=O(e,i);let b=0,f=0;Object.keys(o.aParents).forEach(I=>{e.tags[I]==="F"?b+=o.aParents[I]||0:f+=o.aParents[I]||0});const g=b+f||1,v=2*Math.PI*n,E=v*(b/g),M=v*(f/g),T=W(t,"fixedGrad","#8b5cf6","#7c3aed"),$=W(t,"variableGrad","#06b6d4","#0891b2"),x=W(t,"donutBg","#1e293b","#0f172a"),c=H("circle");c.setAttribute("cx",r),c.setAttribute("cy",a),c.setAttribute("r",n+5),c.setAttribute("fill","none"),c.setAttribute("stroke","rgba(139, 92, 246, 0.2)"),c.setAttribute("stroke-width",2),c.setAttribute("opacity","0.6"),t.appendChild(c);const y=H("circle");y.setAttribute("cx",r),y.setAttribute("cy",a),y.setAttribute("r",n),y.setAttribute("fill","none"),y.setAttribute("stroke",x),y.setAttribute("stroke-width",s),y.setAttribute("opacity","0.3"),t.appendChild(y);const p=H("circle");p.setAttribute("cx",r),p.setAttribute("cy",a),p.setAttribute("r",n),p.setAttribute("fill","none"),p.setAttribute("stroke",T),p.setAttribute("stroke-width",s),p.setAttribute("stroke-linecap","round"),p.setAttribute("transform",`rotate(-90 ${r} ${a})`),p.setAttribute("stroke-dasharray",`0 ${v}`),p.setAttribute("filter","drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"),p.style.transition="stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(p);const d=H("circle");d.setAttribute("cx",r),d.setAttribute("cy",a),d.setAttribute("r",n),d.setAttribute("fill","none"),d.setAttribute("stroke",$),d.setAttribute("stroke-width",s),d.setAttribute("stroke-linecap","round"),d.setAttribute("transform",`rotate(${-90+b/g*360} ${r} ${a})`),d.setAttribute("stroke-dasharray",`0 ${v}`),d.setAttribute("filter","drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"),d.style.transition="stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1)",t.appendChild(d),requestAnimationFrame(()=>{setTimeout(()=>{p.setAttribute("stroke-dasharray",`${E} ${v-E}`)},200),setTimeout(()=>{d.setAttribute("stroke-dasharray",`${M} ${v-M}`)},400)});const w=Math.round(b/g*100),S=Math.round(f/g*100),h=lt(r,a-8,"0% Fixed","middle","#f8fafc",16,"600"),A=lt(r,a+12,"0% Variable","middle","#94a3b8",14,"500");t.appendChild(h),t.appendChild(A);let u=0,l=0;const m=w/50,C=S/50;function L(){(u<w||l<S)&&(u<w&&(u+=m,h.textContent=Math.round(Math.min(u,w))+"% Fixed"),l<S&&(l+=C,A.textContent=Math.round(Math.min(l,S))+"% Variable"),requestAnimationFrame(L))}setTimeout(L,300),p.style.cursor="pointer",d.style.cursor="pointer",p.addEventListener("mouseenter",()=>{p.setAttribute("stroke-width",s+2),p.style.filter="drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))"}),p.addEventListener("mouseleave",()=>{p.setAttribute("stroke-width",s),p.style.filter="drop-shadow(0 0 6px rgba(139, 92, 246, 0.4))"}),d.addEventListener("mouseenter",()=>{d.setAttribute("stroke-width",s+2),d.style.filter="drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))"}),d.addEventListener("mouseleave",()=>{d.setAttribute("stroke-width",s),d.style.filter="drop-shadow(0 0 6px rgba(6, 182, 212, 0.4))"})}const Q=e=>document.createElementNS("http://www.w3.org/2000/svg",e),ut=(e,i,t,r="start",a="#cbd5e1",n=12)=>{const s=Q("text");return s.setAttribute("x",e),s.setAttribute("y",i),s.setAttribute("text-anchor",r),s.setAttribute("fill",a),s.setAttribute("font-size",n),s.textContent=t,s};function jt(e,i){const t=document.getElementById("glidepath");for(;t.firstChild;)t.removeChild(t.firstChild);const r=760,a=320,n=60,s=20,o=20,b=50,f=r-n-s,g=a-o-b,v=i.slice(0,4),E=e.order.filter(l=>l.slice(0,4)===v),M=e.order.indexOf(i),T=e.order.filter(l=>l.slice(0,4)===v&&e.order.indexOf(l)<=M),$=T.map(l=>Math.max(0,(e.months[l].income||0)-O(e,l).aTotal)).reduce((l,m)=>l+m,0),x=12-T.length,c=Math.max(0,(e.target||0)-$),y=x>0?c/x:0,p=(e.target||0)/12,d=[];E.forEach(l=>{e.order.indexOf(l)<=M?d.push({m:l,v:Math.max(0,(e.months[l].income||0)-O(e,l).aTotal),t:"a"}):d.push({m:l,v:y,t:"r"})});const w=Math.max(p,...d.map(l=>l.v),1),S=f/E.length*.65;d.forEach((l,m)=>{const C=l.v/w*g,L=n+m*(f/E.length)+(f/E.length-S)/2,I=o+g-C,R=l.t==="a"?l.v>=p?"#10b981":"#ef4444":"#f59e0b",z=Q("rect");z.setAttribute("x",L),z.setAttribute("y",I),z.setAttribute("width",S),z.setAttribute("height",C),z.setAttribute("fill",R),t.appendChild(z),t.appendChild(ut(L+S/2,a-16,l.m.slice(5),"middle","#9aa3b2",12))});const h=o+g-p/w*g,A=Q("line");A.setAttribute("x1",n),A.setAttribute("x2",n+f),A.setAttribute("y1",h),A.setAttribute("y2",h),A.setAttribute("stroke","#93c5fd"),A.setAttribute("stroke-dasharray","5,5"),t.appendChild(A),t.appendChild(ut(n+f-6,h-6,"Monthly target "+pt(B(e,p)),"end","#cfe4ff",12));const u=document.getElementById("glidePill");u&&(c<=0?(u.textContent="On track ✔",u.classList.add("ok")):(u.textContent="From now: need "+pt(B(e,y))+" SEK / month",u.classList.remove("ok")))}function pt(e){return Math.round(e).toLocaleString("sv-SE")}const tt=e=>document.createElementNS("http://www.w3.org/2000/svg",e),ht=(e,i,t,r="start",a="#cbd5e1",n=12)=>{const s=tt("text");return s.setAttribute("x",e),s.setAttribute("y",i),s.setAttribute("text-anchor",r),s.setAttribute("fill",a),s.setAttribute("font-size",n),s.textContent=t,s};function Kt(e,i){const t=document.getElementById("barSummary");for(;t.firstChild;)t.removeChild(t.firstChild);const r=760,a=320,n=110,s=20,o=20,b=40,f=r-n-s,g=a-o-b,v=O(e,i),E=e.months[i].income||0,M=[{lab:"Income",val:E,c:"#60a5fa"},{lab:"Budget",val:v.bTotal,c:"#3b82f6"},{lab:"Actual",val:v.aTotal,c:"#10b981"},{lab:"Savings",val:Math.max(0,E-v.aTotal),c:"#34d399"}],T=Math.max(...M.map(c=>c.val),1),$=g/M.length*.55;M.forEach((c,y)=>{const p=o+y*(g/M.length)+(g/M.length-$)/2,d=c.val/T*f,w=tt("rect");w.setAttribute("x",n),w.setAttribute("y",p),w.setAttribute("width",d),w.setAttribute("height",$),w.setAttribute("fill",c.c),t.appendChild(w),t.appendChild(ht(n-10,p+$/2+4,c.lab,"end","#cbd5e1",12)),t.appendChild(ht(n+d+6,p+$/2+4,Vt(B(e,c.val)),"start","#cbd5e1",12))});const x=tt("line");x.setAttribute("x1",n),x.setAttribute("x2",n),x.setAttribute("y1",o),x.setAttribute("y2",o+g),x.setAttribute("stroke","#243049"),t.appendChild(x)}function Vt(e){return Math.round(e).toLocaleString("sv-SE")}const et=e=>document.createElementNS("http://www.w3.org/2000/svg",e),mt=(e,i,t,r="start",a="#cbd5e1",n=12)=>{const s=et("text");return s.setAttribute("x",e),s.setAttribute("y",i),s.setAttribute("text-anchor",r),s.setAttribute("fill",a),s.setAttribute("font-size",n),s.textContent=t,s};function Yt(e,i){const t=document.getElementById("shareBars");for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=700,n=280,s=40,o=30,b=60,f=r-n-s,g=a-o-b,v=O(e,i),E=Object.keys(P).map(c=>({p:c,v:v.aParents[c]||0})).sort((c,y)=>y.v-c.v),M=E.reduce((c,y)=>c+y.v,0)||1,T=E.length,$=g/T*.75;E.forEach((c,y)=>{const p=o+y*(g/T)+(g/T-$)/2,d=c.v/M*f,w=et("rect");w.setAttribute("x",n),w.setAttribute("y",p),w.setAttribute("width",d),w.setAttribute("height",$),w.setAttribute("fill","#3b82f6"),t.appendChild(w);const S=(e.icons[c.p]||"")+" "+c.p;t.appendChild(mt(n-16,p+$/2+6,S,"end","#cbd5e1",15)),t.appendChild(mt(n+d+12,p+$/2+6,(c.v/M*100).toFixed(1)+"%  ·  "+Dt(B(e,c.v))+" SEK","start","#cbd5e1",14))});const x=et("line");x.setAttribute("x1",n),x.setAttribute("x2",n),x.setAttribute("y1",o),x.setAttribute("y2",o+g),x.setAttribute("stroke","#243049"),t.appendChild(x)}function Dt(e){return Math.round(e).toLocaleString("sv-SE")}const D=e=>document.createElementNS("http://www.w3.org/2000/svg",e),bt=(e,i,t,r="start",a="#cbd5e1",n=12)=>{const s=D("text");return s.setAttribute("x",e),s.setAttribute("y",i),s.setAttribute("text-anchor",r),s.setAttribute("fill",a),s.setAttribute("font-size",n),s.textContent=t,s};function qt(e,i){const t=document.getElementById("baParents");for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=460,n=260,s=40,o=20,b=60,f=r-n-s,g=a-o-b,v=O(e,i),E=Object.keys(P).map(y=>({p:y,b:v.bParents[y]||0,a:v.aParents[y]||0})).sort((y,p)=>p.a-y.a),M=E.length,T=g/M,$=T*.35,x=Math.max(...E.map(y=>Math.max(y.a,y.b)),1);E.forEach((y,p)=>{const d=o+p*T+T/2,w=y.b/x*f,S=y.a/x*f,h=D("rect");h.setAttribute("x",n),h.setAttribute("y",d-$-3),h.setAttribute("width",w),h.setAttribute("height",$),h.setAttribute("fill","#3b82f6"),t.appendChild(h);const A=D("rect");A.setAttribute("x",n),A.setAttribute("y",d+3),A.setAttribute("width",S),A.setAttribute("height",$),A.setAttribute("fill","#10b981"),t.appendChild(A);const u=(e.icons[y.p]||"")+" "+y.p;t.appendChild(bt(n-14,d+4,u,"end","#cbd5e1",14)),t.appendChild(bt(n+Math.max(w,S)+10,d+4,"B "+gt(B(e,y.b))+"  A "+gt(B(e,y.a)),"start","#cbd5e1",12))});const c=D("line");c.setAttribute("x1",n),c.setAttribute("x2",n),c.setAttribute("y1",o),c.setAttribute("y2",o+g),c.setAttribute("stroke","#243049"),t.appendChild(c)}function gt(e){return Math.round(e).toLocaleString("sv-SE")}const Ct=e=>document.createElementNS("http://www.w3.org/2000/svg",e),ft=(e,i,t,r="start",a="#cbd5e1",n=12)=>{const s=Ct("text");return s.setAttribute("x",e),s.setAttribute("y",i),s.setAttribute("text-anchor",r),s.setAttribute("fill",a),s.setAttribute("font-size",n),s.textContent=t,s};function Ut(e,i){const t=document.getElementById("heatmapVar");for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=440,n=260,s=40,o=20,b=40,f=r-n-s,g=a-o-b,v=i.slice(0,4),E=e.order.filter(S=>S.slice(0,4)===v),M=Object.keys(P),T=E.length,$=[],x=[];M.forEach(S=>{const h=[];E.forEach(A=>{const u=O(e,A),l=u.bParents[S]||0,m=u.aParents[S]||0,C=l?(m-l)/l:0;h.push({p:S,b:l,a:m,v:C,m:A}),x.push(C)}),$.push(h)});const c=Math.min(...x,0),y=Math.max(...x,0),p=f/T,d=g/M.length;function w(S){const h=S<=0?150:0,u=30+30*Math.min(1,Math.abs(S)/(S<=0?-c:y)||0);return`hsl(${h},70%,${u}%)`}$.forEach((S,h)=>{S.forEach((u,l)=>{const m=Ct("rect");m.setAttribute("x",n+l*p),m.setAttribute("y",o+h*d),m.setAttribute("width",p-2),m.setAttribute("height",d-2),m.setAttribute("fill",w(u.v)),m.addEventListener("mouseenter",C=>{const L=document.getElementById("tooltip"),I=u.a-u.b,R=I>=0?"+":"";L.innerHTML=`<div><b>${u.p}</b> · <span class='t'>${u.m}</span></div>
                        <div>Budget: <b>${_(B(e,u.b))}</b> SEK</div>
                        <div>Actual: <b>${_(B(e,u.a))}</b> SEK</div>
                        <div>Variance: <b>${R+_(B(e,I))}</b> (${u.b?(I/u.b*100).toFixed(1):"0.0"}%)</div>`,L.style.left=C.clientX+12+"px",L.style.top=C.clientY+12+"px",L.style.display="block"}),m.addEventListener("mousemove",C=>{const L=document.getElementById("tooltip");L.style.left=C.clientX+12+"px",L.style.top=C.clientY+12+"px"}),m.addEventListener("mouseleave",()=>{document.getElementById("tooltip").style.display="none"}),t.appendChild(m)});const A=(e.icons[M[h]]||"")+" "+M[h];t.appendChild(ft(n-14,o+h*d+d/2+4,A,"end","#cbd5e1",14))}),E.forEach((S,h)=>t.appendChild(ft(n+h*p+p/2,a-12,S.slice(5),"middle","#9aa3b2",12)))}function _(e){return Math.round(e).toLocaleString("sv-SE")}const K=e=>document.createElementNS("http://www.w3.org/2000/svg",e),G=(e,i,t,r="start",a="#cbd5e1",n=12)=>{const s=K("text");return s.setAttribute("x",e),s.setAttribute("y",i),s.setAttribute("text-anchor",r),s.setAttribute("fill",a),s.setAttribute("font-size",n),s.textContent=t,s};function Jt(e,i){const t=document.getElementById("bridge");for(;t.firstChild;)t.removeChild(t.firstChild);const r=Bt(e,i);if(!r){t.appendChild(G(600,210,"No previous month to compare.","middle","#9aa3b2",14));return}const a=1200,n=420,s=80,o=40,b=30,f=60,g=a-s-o,v=n-b-f,E=O(e,i),M=O(e,r),T=M.aTotal,$=E.aTotal,x=Object.keys(P).map(m=>({p:m,icon:e.icons[m]||"",delta:(E.aParents[m]||0)-(M.aParents[m]||0)})).sort((m,C)=>Math.abs(C.delta)-Math.abs(m.delta)),c=x.slice(0,Math.min(10,x.length)),y=x.slice(c.length).reduce((m,C)=>m+C.delta,0);Math.abs(y)>.5&&c.push({p:"Others",icon:"",delta:y});const p=g/(c.length+3),d=b+v;let w=s+p;function S(m){const C=Math.max(T,$,Math.max(...c.map(L=>Math.abs(L.delta)))+Math.max(T,$));return b+v-m/C*v}const h=K("rect");h.setAttribute("x",w-24),h.setAttribute("y",S(T)),h.setAttribute("width",48),h.setAttribute("height",d-S(T)),h.setAttribute("fill","#64748b"),t.appendChild(h),t.appendChild(G(w,n-18,"Start","middle","#9aa3b2",12)),t.appendChild(G(w,S(T)-6,X(B(e,T)),"middle","#cbd5e1",12));let A=T;w+=p,c.forEach(m=>{const C=m.delta,L=C>=0,I=S(A),R=S(A+C),z=Math.min(I,R),Tt=Math.abs(R-I),j=K("rect");j.setAttribute("x",w-24),j.setAttribute("y",z),j.setAttribute("width",48),j.setAttribute("height",Tt),j.setAttribute("fill",L?"#ef4444":"#10b981"),t.appendChild(j);const U=(m.icon?m.icon+" ":"")+m.p;t.appendChild(G(w,n-18,U.length>14?U.slice(0,14)+"…":U,"middle","#9aa3b2",12));const Mt=(L?"+":"")+X(B(e,C));t.appendChild(G(w,z-6,Mt,"middle","#cbd5e1",12)),A+=C,w+=p});const u=K("rect");u.setAttribute("x",w-24),u.setAttribute("y",S($)),u.setAttribute("width",48),u.setAttribute("height",d-S($)),u.setAttribute("fill","#64748b"),t.appendChild(u),t.appendChild(G(w,n-18,"End","middle","#9aa3b2",12)),t.appendChild(G(w,S($)-6,X(B(e,$)),"middle","#cbd5e1",12));const l=K("line");l.setAttribute("x1",s*.6),l.setAttribute("x2",a-o),l.setAttribute("y1",d),l.setAttribute("y2",d),l.setAttribute("stroke","#243049"),t.appendChild(l)}function X(e){return Math.round(e).toLocaleString("sv-SE")}function F(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function V(e,i,t,r="start",a="#cbd5e1",n=12,s="normal"){const o=F("text");return o.setAttribute("x",e),o.setAttribute("y",i),o.setAttribute("text-anchor",r),o.setAttribute("fill",a),o.setAttribute("font-size",n),o.setAttribute("font-weight",s),o.setAttribute("font-family","Inter, system-ui, sans-serif"),o.textContent=t,o}function vt(e,i,t,r){const a=e.querySelector("defs")||e.appendChild(F("defs")),n=F("linearGradient");n.setAttribute("id",i),n.setAttribute("x1","0%"),n.setAttribute("y1","0%"),n.setAttribute("x2","0%"),n.setAttribute("y2","100%");const s=F("stop");s.setAttribute("offset","0%"),s.setAttribute("stop-color",t);const o=F("stop");return o.setAttribute("offset","100%"),o.setAttribute("stop-color",r),n.appendChild(s),n.appendChild(o),a.appendChild(n),`url(#${i})`}function Wt(e,i){const t=document.getElementById("spendingTrends");if(!t)return;for(;t.firstChild;)t.removeChild(t.firstChild);const r=1200,a=400,n={top:40,right:60,bottom:60,left:80},s=r-n.left-n.right,o=a-n.top-n.bottom,b=i.slice(0,4),f=parseInt(i.slice(5,7)),g=[];for(let h=11;h>=0;h--){let A=f-h,u=parseInt(b);A<=0&&(A+=12,u-=1);const l=`${u}-${A.toString().padStart(2,"0")}`;e.months[l]&&g.push({key:l,label:l.slice(5,7),data:O(e,l)})}if(g.length===0)return;const v=Math.max(...g.map(h=>h.data.aTotal)),E=s/(g.length-1),M=o/v,T=vt(t,"trendArea","rgba(59, 130, 246, 0.3)","rgba(59, 130, 246, 0.05)"),$=vt(t,"trendLine","#3b82f6","#1d4ed8"),x=F("rect");x.setAttribute("x",n.left),x.setAttribute("y",n.top),x.setAttribute("width",s),x.setAttribute("height",o),x.setAttribute("fill","rgba(15, 23, 42, 0.5)"),x.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),x.setAttribute("rx",8),t.appendChild(x);for(let h=0;h<=5;h++){const A=n.top+o/5*h,u=F("line");u.setAttribute("x1",n.left),u.setAttribute("y1",A),u.setAttribute("x2",n.left+s),u.setAttribute("y2",A),u.setAttribute("stroke","rgba(45, 55, 72, 0.3)"),u.setAttribute("stroke-width",1),u.setAttribute("stroke-dasharray","2,2"),t.appendChild(u);const l=v-v/5*h,m=V(n.left-10,A+4,Y(l),"end","#94a3b8",10);t.appendChild(m)}let c=`M ${n.left} ${n.top+o}`,y="M";g.forEach((h,A)=>{const u=n.left+A*E,l=n.top+o-h.data.aTotal*M;A===0?(y+=` ${u} ${l}`,c+=` L ${u} ${l}`):(y+=` L ${u} ${l}`,c+=` L ${u} ${l}`)}),c+=` L ${n.left+(g.length-1)*E} ${n.top+o} Z`;const p=F("path");p.setAttribute("d",c),p.setAttribute("fill",T),p.setAttribute("opacity","0"),t.appendChild(p);const d=F("path");d.setAttribute("d",y),d.setAttribute("fill","none"),d.setAttribute("stroke",$),d.setAttribute("stroke-width",3),d.setAttribute("stroke-linecap","round"),d.setAttribute("stroke-linejoin","round"),d.setAttribute("filter","drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"),d.style.strokeDasharray=d.getTotalLength(),d.style.strokeDashoffset=d.getTotalLength(),t.appendChild(d),g.forEach((h,A)=>{const u=n.left+A*E,l=n.top+o-h.data.aTotal*M,m=F("circle");m.setAttribute("cx",u),m.setAttribute("cy",l),m.setAttribute("r",6),m.setAttribute("fill","rgba(15, 23, 42, 0.9)"),m.setAttribute("stroke","#3b82f6"),m.setAttribute("stroke-width",2),m.setAttribute("opacity","0"),t.appendChild(m);const C=F("circle");C.setAttribute("cx",u),C.setAttribute("cy",l),C.setAttribute("r",4),C.setAttribute("fill","#3b82f6"),C.setAttribute("opacity","0"),C.style.cursor="pointer",t.appendChild(C);const L=V(u,n.top+o+20,h.label,"middle","#94a3b8",10);t.appendChild(L),C.addEventListener("mouseenter",()=>{C.setAttribute("r",6),C.setAttribute("fill","#1d4ed8"),m.setAttribute("opacity","1");const I=document.getElementById("tooltip");I&&(I.style.display="block",I.innerHTML=`
          <div style="font-weight: 600; margin-bottom: 4px;">Month ${h.label}</div>
          <div>Total Spending: ${Y(h.data.aTotal)} SEK</div>
          <div>Budget: ${Y(h.data.bTotal)} SEK</div>
          <div>Variance: ${Y(h.data.aTotal-h.data.bTotal)} SEK</div>
        `)}),C.addEventListener("mouseleave",()=>{C.setAttribute("r",4),C.setAttribute("fill","#3b82f6"),m.setAttribute("opacity","0");const I=document.getElementById("tooltip");I&&(I.style.display="none")}),C.addEventListener("mousemove",I=>{const R=document.getElementById("tooltip");R&&(R.style.left=I.pageX+10+"px",R.style.top=I.pageY-10+"px")})}),requestAnimationFrame(()=>{setTimeout(()=>{p.style.transition="opacity 1s ease-out",p.setAttribute("opacity","1")},200),setTimeout(()=>{d.style.transition="stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)",d.style.strokeDashoffset="0"},400),setTimeout(()=>{g.forEach((h,A)=>{setTimeout(()=>{const u=t.querySelectorAll("circle"),l=A*2+2;u[l]&&(u[l].style.transition="opacity 0.3s ease-out",u[l].setAttribute("opacity","1")),u[l+1]&&(u[l+1].style.transition="opacity 0.3s ease-out",u[l+1].setAttribute("opacity","1"))},A*100)})},1e3)});const w=V(r/2,25,"Monthly Spending Trends (Last 12 Months)","middle","#f8fafc",16,"600");t.appendChild(w);const S=V(20,a/2,"Spending (SEK)","middle","#94a3b8",12,"500");S.setAttribute("transform",`rotate(-90, 20, ${a/2})`),t.appendChild(S)}function Y(e){return Math.round(e).toLocaleString("sv-SE")}let k=It();const _t=document.getElementById("app");_t.innerHTML=`
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
`;Pt(k,Xt);$t(k,q());Ht();it();Et(k,q());window.state=k;window.drawAll=it;window.monthTotals=e=>O(k,e);function q(){return k.order[k.order.length-1]}function Xt(){nt(k),$t(k,q()),it(),Et(k,q())}function $t(e,i){const t=document.getElementById("kpiStrip");t.innerHTML="";const r=O(e,i),a=e.months[i].income||0,n=B(e,a-r.aTotal),s=a>0?(a-r.aTotal)/a:0,o=r.bTotal>0?r.aTotal/r.bTotal:0,f=e.order.filter(v=>v.slice(0,4)===i.slice(0,4)&&v<=i).map(v=>(e.months[v].income||0)-O(e,v).aTotal).reduce((v,E)=>v+E,0);[{lab:"Monthly Savings (real SEK)",val:yt(n)},{lab:"Savings Rate",val:(s*100).toFixed(1)+" %"},{lab:"% of Budget Used",val:(o*100).toFixed(0)+" %"},{lab:"YTD Savings",val:yt(B(e,f))+" SEK"}].forEach(v=>{const E=document.createElement("div");E.className="kpi",E.innerHTML=`<div class="lab">${v.lab}</div><div class="val">${v.val}</div>`,t.appendChild(E)})}function it(){const e=document.getElementById("monthSel").value;Nt(k,e),Gt(k,e),jt(k,e),Kt(k,e),Wt(k,e),Yt(k,e),qt(k,e),Ut(k,e),Jt(k,e)}function yt(e){return Math.round(e).toLocaleString("sv-SE")}
